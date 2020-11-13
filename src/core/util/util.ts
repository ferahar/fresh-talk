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
        if (value.length && (value.length === 0)) {
            return false
        }
        return true
    },

    trim(data: string, prefix?: string): string | boolean {
        if (typeof data !== 'string') return false
        if (!prefix) {
            return data.trim()
        }
        prefix = prefix.split('').join('|')
        const re = new RegExp(`^[${prefix}]+|[${prefix}]+$`, 'g')
        const result = data.replace(re, '');
        return result
    }
}

