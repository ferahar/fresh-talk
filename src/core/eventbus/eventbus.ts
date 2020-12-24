
type List = {
    [key:string]: Array<Function>;
}


export class EventBus {
    private listeners: List = {}

    on(event:keyof List, callback: Function) {
        if (!this.listeners[event]) {
            this.listeners[event]=[];
        }
    this.listeners[event].push(callback);
    }

    off(event:keyof List, callback:object) {
        if (!this.listeners[event]) {
            throw new Error(`Нет события: ${event}`);
        }

        this.listeners[event] = this.listeners[event].filter(
            listener => listener !== callback
        );
    }

    emit(event:keyof List, ...data: unknown[]) {
        if (!this.listeners[event]) return
        this.listeners[event].forEach( listener  => {
            listener(...data);
        });
    }
}
