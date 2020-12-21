export function escape(str: string) {
    const htmlEscapes: {[index: string]: string} = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#39;'
    }

    return str.replace(/[&<>"']/g, (match) => {
        return htmlEscapes[match];
    })
}
