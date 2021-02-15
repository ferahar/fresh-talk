import {HTTP} from "../HTTP"
import {mockFetch} from "./fetch.mock"


describe("HTTP DELETE:", () => {

    const http = new HTTP()
    const data = {
        id: "42",
        name: "fresh talk",
    }

    initHandler("Return status 200", 200, http.delete, data)
    initHandler("Bad request", 500, http.delete, data)

})

function initHandler(title: string, code: number, handler: Function, data?: {}) {
    test(title, async () => {
        mockFetch(code, data)
        try {
            if (data) {
                await handler('/path', data)
            } else {
                await handler('/path')
            }

        } catch (e) {
            expect(e.status).toBe(code)
        }
    })
}


