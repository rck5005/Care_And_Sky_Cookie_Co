import axios from 'axios';

export const api = axios.create({
    baseURL:"http://127.0.0.1:8000/api/v1/"
})

export const signUp = async(email, first_name, last_name, password, display_name, address) => {
    let response = await api.post("users/signup/", {
        'email':email,
        'first_name':first_name,
        'last_name':last_name,
        'password':password,
        'display_name':display_name,
        'address':address
    })

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
