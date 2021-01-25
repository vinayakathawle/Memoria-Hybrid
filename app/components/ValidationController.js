export const validateEmail = (email) => {
    let emailRegEx = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    if(email && emailRegEx.test(email)){
        return true
    }else{
        return false
    }
}

export const validatePassword = (password) => {
    let passwordRegEx = /^(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{4,}$/
    if(password && passwordRegEx.test(password)){
        return true
    }else{
        return false
    }
}
