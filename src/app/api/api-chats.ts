import {chatAPIInstance} from './api-base'

type Indexed = {
    [key in string]: unknown
}

class ApiChats {

    chats() {
        return chatAPIInstance.get('/')
    }

    create(data:{}) {
        return chatAPIInstance.post('/', {
            data: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json"
            }
        })
    }

    uploadAvatar(data={}) {
        return chatAPIInstance.put('/avatar', {
            data: data,
        })
    }

    users(data:Indexed={}) {

        return chatAPIInstance.get(`/${data.id}/users`)
    }

    addUsers(data={}) {
        return chatAPIInstance.put('/users', {
            data: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json"
            }
        })
    }

    removeUsers(data:{}) {
        return chatAPIInstance.delete('/users', {
            data: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json"
            }
        })
    }

    remove(data:{}) {
        return chatAPIInstance.delete('/', {
            data: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json"
            }
        })
    }


}

export const apiChats = new ApiChats