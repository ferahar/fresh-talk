import {Btn} from './btn'


describe('Components:', () => {

    test('Button title', () => {
        const btn = new Btn('Click me!')
        document.body.appendChild(btn.element.nativeElement as HTMLButtonElement)
        const result = document.querySelector('button')
        result!.addEventListener('click', ()=>{

        })
        result!.click()
        const text = btn.element.nativeElement!.innerHTML
        console.log(
            btn.element.nativeElement,
            result!.tagName
        )
        // btn.element.nativeElement!.innerHTML = 'cool'
        expect(text).toEqual('Click me!')
    })

    test('Button click', ()=>{
        const btnClick = new Btn('Click me!')
        const onClick = jest.fn()
        btnClick.element.on('click', onClick)
        btnClick.element.nativeElement!.click()
        expect(onClick).toBeCalledTimes(1)
        btnClick.element.nativeElement!.click()
        expect(onClick).toBeCalledTimes(2)
    })

    test('Button set props and render components', ()=>{
        const btnProps = new Btn('Props')
        btnProps.element.on('click', ()=>{
            btnProps.setProps({title:'NewProps'})
        })
        btnProps.element.nativeElement!.click()
        const title = btnProps.element.getHtml()
        expect(title).toEqual('NewProps')
    })
})

