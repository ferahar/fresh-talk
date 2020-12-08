import { chatAPIInstance } from './api-base'

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