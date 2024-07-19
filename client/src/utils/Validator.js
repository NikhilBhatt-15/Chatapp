export const usernameValidator = (username)=>{

    return {
        isValid:false,
        errorMessage:"username is too short"
    }
}

export const passwordValidator = (passwordValidator)=>{
    return {
        isValid:false,
        errorMessage:"password is weak"
    }
}
export const nameValidator = (passwordValidator)=>{
    return {
        isValid:false,
        errorMessage:"password is weak"
    }
}
