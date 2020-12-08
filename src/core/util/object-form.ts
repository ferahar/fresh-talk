export function objectForm(data: FormData) {

    const object: Record<string, unknown> = {}

    for (let [name, value] of data) {
        object[name] = value
    }

    return object
}