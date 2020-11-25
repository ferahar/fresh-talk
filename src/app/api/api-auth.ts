import { authAPIInstance } from './api-base'

class ApiAuth {

    signUp(data:{}) {
        return authAPIInstance.post('/signup', {
            data: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json"
            }
        })
    }

    signIn(data:{}) {
        return authAPIInstance.post('/signin', {
            data: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json"
            }
        })
    }

    user() {
        return authAPIInstance.get('/user')
    }

    logout() {
        return authAPIInstance.post('/logout')
    }

}

export const apiAuth = new ApiAuth