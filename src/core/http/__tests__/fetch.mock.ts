export function mockFetch(status: number, data?: {}) {
    const xhrMockObj = {
        open: jest.fn(),
        send: jest.fn(),
        setRequestHeader: jest.fn(),
        readyState: 4,
        status,
        response: JSON.stringify(data)
    }

    const xhrMockClass = () => xhrMockObj

    // @ts-ignore
    window.XMLHttpRequest = jest.fn().mockImplementation(xhrMockClass)

    setTimeout(() => {
        // @ts-ignore
        xhrMockObj["onreadystatechange"]()
    }, 0)
}