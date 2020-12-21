import {apiChats} from "../index";

describe("XHR API", () => {
    describe("fetchAllRepositories()", () => {
        const data = {
            id: "1234",
            name: "My Repository",
        };

        it("return expect data", async () => {

            mockFetch(200, [data])
            const res = await apiChats.chats()

            expect(res).toEqual([data])
        });

        it("throw an error", async () => {
            mockFetch(500, [data])

            try {
                await apiChats.chats()
            } catch (e) {
                console.log(e)
                expect(e.message).toBe("Server is not available")
            }
        })

    });
});

function mockFetch(status: number, data?: { [key: string]: string }[]) {
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