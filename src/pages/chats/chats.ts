import {Chatlist} from "../../componets/chatllist/chatlist.js"

export function chats(): void {

    const posts = [
        {
            image: "https://images.unsplash.com/photo-1575779977884-f1069c45cbf4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
            name: 'Bruce',
            title: "Анна",
            author: 'Bruce',
            message: "Hi",
            time: "12:00",
            counter: "7"
        },
        {
            name: 'Мультпоиск',
            title: "Мультпоиск",
            author: 'Вы',
            message: "Sticker",
            time: "11:56",
            counter: "12"
        },
        {
            title: "Nicko La",
            author: "иВад",
            message: "Suspendisse dapibus venenatis quam non imperdiet. Fusce pelle...",
            time: "09:00",
        },
        {
            image: "https://images.unsplash.com/photo-1531259683007-016a7b628fc3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
            title: "Batman",
            author: "Вы",
            message: "Suspendisse dapibus venenatis quam non imperdiet. Fusce pelle...",
            time: "СБ",
        },
        {
            title: "Freeman",
            author: "Декобраз",
            message: "Cool!",
            time: "СБ",
        }
    ]
    
    const chats = new Chatlist({
        posts: posts
    });
    
    const root = document.getElementById('root')
    root!.appendChild(chats.element!.nativeElement as Node)
}


chats()