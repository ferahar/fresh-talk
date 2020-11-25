import { queryStringify, StringIndexed } from './queryStringify'

export interface Headers {
    [index: string]: string
}

const METHODS = {
    GET: 'GET',
    POST: 'POST',
    PUT: 'PUT',
    DELETE: 'DELETE'
};

export class HTTP {

    private baseUrl: string | null = ''
    
    constructor(url?: string) {
        if (url !== undefined) {
            this.baseUrl = url
        }
    }
    
    get = (url: string, options: StringIndexed = {}) => {
            return this.request(url, {...options, method: METHODS.GET}, options.timeout as number);
    }

    post = (url: string, options: StringIndexed = {}) => {
        return this.request(url, {...options, method: METHODS.POST}, options.timeout as number);
    }

    put = (url: string, options: StringIndexed = {}) => {
        return this.request(url, {...options, method: METHODS.PUT}, options.timeout as number);
    }

    delete = (url: string, options: StringIndexed = {}) => {
        return this.request(url, {...options, method: METHODS.DELETE}, options.timeout as number);
    }

    request = (url: string, options: StringIndexed = {}, timeout = 5000) => {
        const method: string = options.method as string
        const data: StringIndexed = options.data as StringIndexed
        const headers: Headers = options.headers as Headers
        if (url !== null) {
            url = this.baseUrl + url
        }
        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest()
            
            if (method === METHODS.GET && data) {
                url = url + queryStringify(data)
            }

            xhr.open(method, url)
            xhr.withCredentials = true

            if (headers) {
                Object.keys(headers).forEach(key => {
                    xhr.setRequestHeader(key, headers[key])
                })
            }

            xhr.onload = () => {
                if (xhr.status !== 200) {
                    reject(xhr)
                } else {
                    resolve(xhr)
                }
            }

            xhr.timeout = timeout

            xhr.onerror = reject
            xhr.onabort = reject
            xhr.ontimeout = reject

            if (method === METHODS.GET) {
                xhr.send()
            } else {
                xhr.send( data as any)
            }
        })
    };
}