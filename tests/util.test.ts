import {findState, setState} from "../src/core/util";


const state = {
    isLogin: 'success',
    profile: `{
        "first_name": "Luck",
        "second_name": "Skywolker",
        "display_name": "Jedi",
        "login": "Yoda",
        "email": "user@mail.rmb",
        "phone": "+7 888 655 21 21"
    }`,
    chats: {
        'messages': {
            text: 'cool',
            counter: '12'
        }
    },
    avatar: {
        image: ''
    }
}

test('Find in state to equal "success"', () => {

    expect( findState(state, 'isLogin') ).toBe('success');
});

test('Find in state to equal "cool"', () => {
    expect( findState(state, 'chats.messages.text') ).toBe('cool');
});

test('Add in state to equal "cool"', () => {
    setState(state, 'chats.messages.type', '44')
    console.log(state)
    expect( findState(state, 'chats.messages.type') ).toBe('44');
});

test('Add new object in state', () => {
    setState(state, 'todo', {title:'Todo', status:'load'})
    console.log(state)
    expect( findState(state, 'todo.status') ).toBe('load');
});



