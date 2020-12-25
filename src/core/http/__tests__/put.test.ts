import {HTTP} from "../HTTP"
import {mockFetch} from "./fetch.mock"


describe("HTTP PUT:", () => {

    const http = new HTTP()
    const data = {
        id: "42",
        name: "fresh talk",
    }

    test("Return status 200", async () => {

        mockFetch(200, data)

        let request = await http.put('/path')
        let result = JSON.parse((request as XMLHttpRequest).response)
        expect(result).toEqual(data)

    })

    test("Bad request", async () => {
        mockFetch(400, data)

        try {
            await http.put('/path')
        } catch (e) {
            expect(e.status).toBe(400)
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
        let request = await http.put('/path')
        let result = JSON.parse((request as XMLHttpRequest).response)
        expect(result).toEqual(chats)
        expect(result.length).toBe(3)

    })

})


