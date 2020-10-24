interface isLengt {
    length: number
}

export const util = {
    
    isUndefind<T>(value: T):boolean {
        return typeof(value) === 'undefined'
    },

    isString<T>(value: T): boolean {
        return typeof(value) === 'string'
    },

    isEmpty<T extends isLengt>(value: T): boolean {
        return (value.length)? true: (value.length === 0)? true : false
    }
}

