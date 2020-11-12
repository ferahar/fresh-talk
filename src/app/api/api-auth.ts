import { authAPIInstance } from './api-base'

class ApiAuth {

    signUp(data:{}) {
        return authAPIInstance.post('/signup', {
            data: data
        })
    }

    signIn(data:{}) {
        return authAPIInstance.post('/signin', {
            data: data
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