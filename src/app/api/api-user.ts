import {userAPIInstance} from './api-base'
import {errorRequest} from '../../core/util/error'

class ApiUser {
  saveProfil(data={}) {
    return userAPIInstance.put('/profile', {
      data: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      }
    })
        .then(data => JSON.parse((data as XMLHttpRequest).response), errorRequest);
  }

  saveAvatar(data={}) {
    return userAPIInstance.put('/profile/avatar', {
      data,
    });
  }

  savePsw(data={}) {
    return userAPIInstance.put('/password', {
      data: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      }
    })
        .then(data => JSON.parse((data as XMLHttpRequest).response), errorRequest);
  }

  findUser(data={}) {
    return userAPIInstance.post('/search', {
      data: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      }
    })
  }
}

export const apiUser = new ApiUser
