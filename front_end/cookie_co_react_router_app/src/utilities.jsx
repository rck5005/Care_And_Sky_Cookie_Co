import axios from 'axios';

export const api = axios.create({
    baseURL:"http://127.0.0.1:8000/api/v1/"
})

export const signUp = async(email, password, display_name) => {
    let response = await api.post("users/signup/", {
        'email':email,
        'password':password,
        'display_name':display_name,
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
