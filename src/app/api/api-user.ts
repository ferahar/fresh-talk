import { userAPIInstance } from './api-base';

class ApiUser {
    saveProfil(data={}) {
        return userAPIInstance.put('/profile', {
            data: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json"
            }
        });
    }
    saveAvatar(data={}) {
        return userAPIInstance.put('/profile/avatar', {
            data,
        });
    }
    findUser(data={}) {
        return userAPIInstance.post('/search', {
            data: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json"
            }
        })
    }
}

export const apiUser = new ApiUser;