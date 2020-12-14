import {chatAPIInstance} from './api-base'

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

    users(id:number) {
        return chatAPIInstance.get(`/${id}/users`)
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