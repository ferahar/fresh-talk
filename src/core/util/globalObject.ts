const fallbackGlobalObject = {};

export function getGlobalObject<T>(): T {
    return (isNodeEnv()
        ? global
        : typeof window !== "undefined"
            ? window
            : typeof self !== "undefined"
                ? self
                : fallbackGlobalObject) as T;
}


export function isNodeEnv(): boolean {
    return (
        Object.prototype.toString.call(
            typeof process !== "undefined" ? process : 0
        ) === "[object process]"
    );
}