import { HTTP } from '../../core/index.js'

export const apiInstance = new HTTP('ya-praktikum.tech/api/v2');
export const authAPIInstance = new HTTP('ya-praktikum.tech/api/v2/auth');
export const userAPIInstance = new HTTP('ya-praktikum.tech/api/v2/user');
export const chatAPIInstance = new HTTP('ya-praktikum.tech/api/v2/chats');

export class APIBase {
    create() {}

    request() {}
  
    update() {}
  
    delete() {}
}