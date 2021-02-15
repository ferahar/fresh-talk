import {HTTP} from "../HTTP"
import {mockFetch} from "./fetch.mock"


describe("HTTP POST:", () => {

    const http = new HTTP()
    const data = {
        id: "42",
        name: "fresh talk",
    }

    test('OK status 200:', async () => {
        mockFetch(200, data)
        const request = await http.post('/path', data)
        const result = request as XMLHttpRequest
        expect(result.status).toEqual(200)
    })

    test('Bad request:', async () => {
        mockFetch(500, data)
        try {
            await http.post('/path', data)
        } catch (e) {
            expect(e.status).toBe(500)
        }
    })

})


