import {chatAPIInstance} from './api-base'
import {errorRequest} from '../../core/util/error'


class ApiChats {
  chats() {
    return chatAPIInstance.get('/')
        .then(data => JSON.parse((data as XMLHttpRequest).response), errorRequest)
  }

  create(data:{}) {
    return chatAPIInstance.post('/', {
      data: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
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
        .then(data => JSON.parse((data as XMLHttpRequest).response), errorRequest)
  }

  addUsers(data={}) {
    return chatAPIInstance.put('/users', {
      data: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      }
    })
  }

  removeUsers(data:{}) {
    return chatAPIInstance.delete('/users', {
      data: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      }
    })
  }

  remove(data:{}) {
    return chatAPIInstance.delete('/', {
      data: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      }
    })
  }

  token(data:Indexed={}) {
    return chatAPIInstance.post(`/token/${data.id}`)
        .then(data => {
          const response = JSON.parse((data as XMLHttpRequest).response) as Indexed
          return response.token
        }, errorRequest)
  }
}

export const apiChats = new ApiChats
