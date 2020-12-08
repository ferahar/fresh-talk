import {findState, setState, } from "../src/core/util";
import {util} from "../src/core/index";

const state = {
    isLogin: 'success',
    profile: {
        first_name: "Luck",
        second_name: "Skywolker",
        display_name: "Jedi",
        login: "Yoda",
        email: "user@mail.rmb",
        phone: "+7 888 655 21 21"
    },
    chats: [
        {
            id: 0,
            title: "DemoChat",
            avatar: ""
        },
        {
            id: 1,
            title: "Secrets Cod",
            avatar: "https://images.unsplash.com/photo-1575779977884-f1069c45cbf4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
        },
        {
            id: 2,
            title: "BoomBastic",
            avatar: "https://images.unsplash.com/photo-1605812053642-804bf4dcdb28?ixid=MXwxMjA3fDB8MHx0b3BpYy1mZWVkfDY3fGhtZW52UWhVbXhNfHxlbnwwfHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=250&q=30"
        }
    ],
    avatar: {
        image: ''
    }
}

const prop = {
    avatar: null,
    display_name: null,
    email: "algot@algot.xxx",
    first_name: "Dimon",
    id: 1177,
    login: "algot",
    phone: "+79378884465",
    second_name: "Sky"
}

const newChats = [
    {
        id: 0,
        title: "Cool",
        avatar: ""
    }
]

test('Find in state to equal "success"', () => {

    expect( findState(state, 'isLogin') ).toBe('success');
});


test('Add new object in state', () => {
    setState(state, 'todo', {title:'Todo', status:'load'})
    expect( findState(state, 'todo.status') ).toBe('load');
});

test('Add new object in state', () => {
    setState(state, 'profile', prop)
    expect( findState(state, 'profile.first_name') ).toBe('Dimon');
});

test('is empty TRUE', () => {
    expect( util.isEmpty('profile.first_name') ).toBe(true)
});

test('add array elements', () => {
    setState(state, 'chats', newChats)
    const first = state.chats[0].title
    expect(first).toBe('Cool')
});

test('One element in array', () => {
    expect(state.chats.length).toBe(1)
});



