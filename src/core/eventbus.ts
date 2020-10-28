type fun = (...rest: any[])=>void 

type List = {
    [key:string]: Array<fun>;
}


export class EventBus {
    private listeners: List = {}

    on(event:keyof List, callback: fun) {
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

    emit(event:keyof List, ...data: any[]) {
        if (!this.listeners[event]) {
            throw new Error(`Нет события: ${event}`);
        }
        
        this.listeners[event].forEach( listener  => {
            listener(...data);
        });
    }
}
