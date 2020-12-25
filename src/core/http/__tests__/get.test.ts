import {HTTP} from "../HTTP"
import {mockFetch} from "./fetch.mock"


describe("HTTP GET:", () => {

    const http = new HTTP()
    const data = {
        id: "42",
        name: "fresh talk",
    }

    test("return expect data", async () => {

        mockFetch(200, data)

        let request = await http.get('/path')
        let result = JSON.parse((request as XMLHttpRequest).response)
        expect(result).toEqual(data)

    })

    test("Reject function 'errorRequest' an error", async () => {
        mockFetch(500, data)

        try {
            await http.get('/path')
        } catch (e) {
            expect(e.status).toBe(500)
        }
    })

    test("return expect array", async () => {
        const chats = [
            {
                title: 'cool',
                id: 2
            },
            {
                title: 'Ahsoka',
                id: 12
            },
            {
                title: 'fresh talk',
                id: 2
            }

        ]
        mockFetch(200, chats)
        let request = await http.get('/path')
        let result = JSON.parse((request as XMLHttpRequest).response)
        expect(result).toEqual(chats)
        expect(result.length).toBe(3)

    })

})


