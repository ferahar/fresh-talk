import {findState, setState, } from "../index"
import {util} from "../../index"


describe('Utility functions:', ()=> {

    let state: {[key in string]:any} = {}

    beforeEach(()=> {
        state = {
            isLogin: 'success',
            profile: {
                first_name: "Luck",
                second_name: "Skywolker",
                display_name: "Jedi",
                login: "Yoda",
                email: "user@mail.rmb",
                phone: "+78886552121"
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
                    avatar: "https://images.unsplash.com/photo-1575779977884.png"
                },
                {
                    id: 2,
                    title: "BoomBastic",
                    avatar: "https://images.unsplash.com/photo-1605812053642.png"
                }
            ],
            avatar: {
                image: ''
            }
        }

    })

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

    test('FindState: Find in state to equal "success"', () => {
        expect( findState(state, 'isLogin') ).toBe('success')
    });


    test('SetState: Add new object in state', () => {
        setState(state, 'todo', {title:'Todo', status:'load'})
        expect( findState(state, 'todo.status') ).toBe('load')
    });

    test('Add new object in state', () => {
        setState(state, 'profile', prop)
        expect( findState(state, 'profile.first_name') ).toBe('Dimon')
    })

    test('is empty TRUE', () => {
        expect( util.isEmpty('profile.first_name')).toBeTruthy()
    })

    test('add array elements', () => {
        setState(state, 'chats', newChats)
        const first = state.chats[0].title
        expect(first).toBe('Cool')
    })

    test('One element in array', () => {
        expect(state.chats.length).toBe(3)
    })
})





