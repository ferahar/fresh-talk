import {apiChats} from "../index";

describe("API:", () => {
    describe("fetchAllRepositories()", () => {
        const data = {
            id: "42",
            name: "frash talk",
        }

        test("return expect data", async () => {

            mockFetch(200, data)
            const res = await apiChats.chats()

            expect(res).toEqual(data)
        });

        test("throw an error", async () => {
            mockFetch(500, data)

            try {
                await apiChats.chats()
            } catch (e) {
                expect(e.message).toBe("Server is not available")
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
                    title: 'frash talk',
                    id: 2
                }

            ]
            mockFetch(200, chats)
            const res = await apiChats.chats()
            expect(res).toEqual(chats)
            expect(res.length).toBe(3)
        })

    });
});

function mockFetch(status: number, data?: {}) {
    const xhrMockObj = {
        open: jest.fn(),
        send: jest.fn(),
        setRequestHeader: jest.fn(),
        readyState: 4,
        status,
        response: JSON.stringify(data)
    };

    const xhrMockClass = () => xhrMockObj;

    // @ts-ignore
    window.XMLHttpRequest = jest.fn().mockImplementation(xhrMockClass);

    setTimeout(() => {
        // @ts-ignore
        xhrMockObj["onreadystatechange"]();
    }, 0);
}