import { authAPIInstance } from './api-base.js'

export class apiAuth {

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
        return authAPIInstance.get('/logout')
    }

}