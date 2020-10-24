type fun<T> = (...rest: T[])=>void 

interface List<T> {
    [key:string]: Array<fun<T>>;
}


export class EventBus<T> {
    private listeners: List<T> = {}

    on(event:keyof List<T>, callback: fun<T>) {
        if (!this.listeners[event]) {
            this.listeners[event]=[];
        }
    this.listeners[event].push(callback);
    }

    off(event:keyof List<T>, callback:object) {
        if (!this.listeners[event]) {
            throw new Error(`Нет события: ${event}`);
        }

        this.listeners[event] = this.listeners[event].filter(
            listener => listener !== callback
        );
    }

    emit(event:keyof List<T>, ...data:Array<T>) {
        if (!this.listeners[event]) {
            throw new Error(`Нет события: ${event}`);
        }
        
        this.listeners[event].forEach( listener  => {
            listener(...data);
        });
    }
}
