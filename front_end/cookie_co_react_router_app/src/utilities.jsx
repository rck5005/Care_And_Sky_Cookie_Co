import axios from 'axios';

export const api = axios.create({
    baseURL:"http://127.0.0.1:8000/api/v1/"
})

export const signUp = async(email, first_name, last_name, password, display_name, address) => {

    // Build the request body dynamically
    const requestBody = {
        email,
        first_name,
        last_name,
        password
    };

    // Conditionally add properties to the request body
    if (display_name) {
        requestBody.display_name = display_name;
    }
    if (address) {
        requestBody.address = address;
    }

    let response = await api.post("users/signup/", requestBody)

    if (response.status === 201){
        let {user, token} = response.data
        localStorage.setItem('token', token)
        api.defaults.headers.common["Authorization"] = `Token ${token}`
        return user
    }
    alert("credentials failed")
    return null
}

export const signIn = async(email, password) => {
    let response = await api.post("users/login/", {
        'email':email,
        'password':password,
    })

    if (response.status === 200){
        let {user, token} = response.data
        localStorage.setItem('token', token)
        api.defaults.headers.common["Authorization"] = `Token ${token}`
        return user
    }
    alert("credentials failed")
    return null
}

export const logOut = async() => {
    let response = await api.post("users/logout/")
    if(response.status === 204){
        localStorage.removeItem("token")
        localStorage.removeItem("YourCreation")
        delete api.defaults.headers.common["Authorization"]
        return null
    }
    alert("Something went wrong during log out")

}

export const confirmUser = async() => {
    let token = localStorage.getItem('token')
    if (token){
        api.defaults.headers.common["Authorization"] = `Token ${token}`
        let response = await api.get("users/info/")
        return response.data.user
    }
    return null
}

export const deleteUser = async() => {
    let response = await api.delete("users/delete/")
    if(response.status === 204){
        localStorage.removeItem("token")
        delete api.defaults.headers.common["Authorization"]
        return null
    }
    alert("Something went wrong during deletion")

}

export const getInfo = async() => {
    let response = await api.get("users/info/")
    if(response.status === 200){

        return response.data
    }
    alert("Something went wrong while trying to retrieve info")
}

export const updateNameAndAddress = async(user, address) => {
    // console.log("inside utilities: ", user, address)
    let response = await api.put("users/info/", {
        'display_name':user,
        'address':address,
    })
    if(response.status === 200){

        return response.data
    }
    alert("Something went wrong while trying to retrieve info")
}

export const updatePassword = async(password, new_password) => {
    // console.log("inside utilities: ", user, address)
    let response = await api.put("users/info/", {
        'password':password,
        'new_password':new_password,
    })
    if(response.status === 200){

        return response.data
    }
    alert("Something went wrong while trying to retrieve info")
}

export const createCreation = async (creationData) => {

    console.log("creationdata:", creationData)
    try {
        // Make the POST request to the API
        const response = await api.post("cookiecreations/create/", {
            name: creationData.name,
            flavor: creationData.flavor,
            description: creationData.description,
            cookie_cutter: creationData.cookie_cutter,
            topping: creationData.topping,
            decoration: creationData.decoration,
            prev_purchased: creationData.prev_purchased,
            image: creationData.image
        });

        // Check if the response status is 201 (Created)
        if (response.status === 201) {
            // Return the response data on success
            return response.data;
        } else {
            // Handle unexpected status codes
            alert("Failed to create creation. Status code: " + response.status);
        }
    } catch (error) {
        // Handle errors
        console.error("Error creating creation:", error);
        alert("Something went wrong while trying to create the creation.");
    }
};

export const generateAIResponse = async (prompt) => {
    try {
        let response = await api.post("openai/", { prompt });
        if (response.status === 200) {
            return response.data;
        } else {
            throw new Error("Failed to generate response");
        }
    } catch (error) {
        console.error("Error generating AI response:", error);
        alert("Something went wrong while generating the response.");
    }
};

export const addCreationToUser = async (cookieCreationId) => {
    try {
        // Make the POST request to the API to add/remove the creation
        const response = await api.post(`mycookies/addremove/${cookieCreationId}/`, {});

        // Check if the response status indicates success
        if (response.status === 200 || response.status === 201) {
            // Return the response data on success
            return response.data;
        } else {
            // Handle unexpected status codes
            alert("Failed to add/remove creation. Status code: " + response.status);
        }
    } catch (error) {
        // Handle errors
        console.error("Error adding/removing creation:", error);
        alert("Something went wrong while trying to add/remove the creation.");
    }
};

export const deleteCreationFromUser = async (cookieCreationId) => {
    try {
        // Make the DELETE request to the API to remove the creation
        const response = await api.delete(`mycookies/addremove/${cookieCreationId}/`);

        // Check if the response status indicates success
        if (response.status === 204) {
            // Return a success message or handle accordingly
            return "Creation successfully removed.";
        } else {
            // Handle unexpected status codes
            alert("Failed to remove creation. Status code: " + response.status);
        }
    } catch (error) {
        // Handle errors
        console.error("Error removing creation:", error);
        alert("Something went wrong while trying to remove the creation.");
    }
};

export const zeroizeYourCreationValue = () => {
    localStorage.setItem('YourCreation', JSON.stringify({
        "flavor": null,
        "flavorName": "",
        "topping": null,
        "toppingName": "",
        "cookieCutter": null,
        "cookieCutterName": "",
        "decoration": null,
        "decorationName": ""
    }));
};


export const subscribeToMailChimp = async (email, first_name, last_name) => {
    try {
        // Prepare the payload for the API call
        const payload = {
            email,
            first_name,
            last_name
        };

        // Make the POST request to the MailChimp API endpoint
        const response = await api.post('mailchimp/subscribe/', payload);

        // Check for a successful response
        if (response.status === 201) {
            // console.log('Subscription successful');
            return response.data; // Return the response data if needed
        } else {
            console.error('Failed to subscribe:', response.status);
            throw new Error('Subscription failed with status: ' + response.status);
        }
    } catch (error) {
        // Handle any errors that occur during the API call
        console.error('Error subscribing to MailChimp:', error);
        throw error; // Re-throw the error to be handled by the calling code
    }
};

export const unsubscribeFromMailChimp = async (email) => {
    try {
        console.log("unsubscribe: email", email)
        // Make the PUT request to the MailChimp API endpoint
        const response = await api.put('mailchimp/unsubscribe/', {'email':email });

        // Check for a successful response
        if (response.status === 200) {
            // console.log('Unsubscription successful');
            return response.data; // Return the response data if needed
        } else {
            console.error('Failed to unsubscribe:', response.status);
            throw new Error('Unsubscription failed with status: ' + response.status);
        }
    } catch (error) {
        // Handle any errors that occur during the API call
        console.error('Error unsubscribing from MailChimp:', error);
        throw error; // Re-throw the error to be handled by the calling code
    }
};


export const deleteMailChimpAccount = async (email) => {
    try {
        // Send DELETE request to MailChimp endpoint with email
        const response = await api.delete('mailchimp/deletemember/', {
            data: { email }, // Include the email in the request body
        });
        
        if (response.status === 204) {
            // Handle successful deletion
            console.log('MailChimp account deleted successfully');
            return true; // Return true to indicate success
        } else {
            // Handle unsuccessful deletion
            console.error('Failed to delete MailChimp account', response);
            return false; // Return false to indicate failure
        }
    } catch (error) {
        // Handle any errors that occurred during the request
        console.error('Error deleting MailChimp account:', error);
        return false; // Return false to indicate failure
    }
};