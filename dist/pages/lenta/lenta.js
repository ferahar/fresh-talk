import { Lenta } from "../../componets/lenta/lenta.js";
export function chats() {
    const chat = {
        image: "https://images.unsplash.com/photo-1575779977884-f1069c45cbf4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
        name: 'Bruce',
        title: "Анна",
        author: 'Bruce',
        online: "online"
    };
    const msgs = [
        {
            message: "Hi",
            date: "12:00",
            status: {
                done_all: true
            }
        },
        {
            system: true,
            title: "11 февраля 2020",
        },
        {
            message: "Привет! Смотри, тут всплыл интересный кусок лунной космической истории — НАСА в какой-то момент попросила Хассельблад адаптировать модель SWC для полетов на Луну. Сейчас мы все знаем что астронавты летали с моделью 500 EL — и к слову говоря, все тушки этих камер все еще находятся на поверхности Луны, так как астронавты с собой забрали только кассеты с пленкой.",
            date: "12:00",
            status: {
                done: true
            }
        },
        {
            tome: true,
            message: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Rerum, iste.",
            date: "12:00",
        },
        {
            image: "https://images.unsplash.com/photo-1602029232568-f760a7ba9687?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
            date: "12:00",
        },
        {
            tome: true,
            message: "ням ням",
            date: "12:00",
        },
    ];
    const chats = new Lenta({
        msgs: msgs,
        chat: chat
    });
    const root = document.getElementById('root');
    root.appendChild(chats.element.nativeElement);
}
chats();
//# sourceMappingURL=lenta.js.map