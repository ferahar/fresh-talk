import {checkField} from "../index";
import "nunjucks"
import {renderString} from "nunjucks";


const tmpl = `
<input type="{{ type }}" value="{{ value }}" name="{{ name }}" >
`

describe("Validation of input values", ()=>{
    const positive = [
        {type: 'email', value:'frash@talk.com'},
        {type: 'tel', value:'+74441113355'},
        {type: 'text', value:'frash-talk'}
    ]
    const negative = [
        {type: 'email', value:'frash-talk.com'},
        {type: 'tel', value:'+z444@1113355'},
        {type: 'text', value:''}
    ]
    const inputWrap = document.createElement('label')

    examin(positive, false)
    examin(negative, true)

    function examin(arr:Indexed[], check: boolean) {
        arr.forEach(props => {
            it(`Verification for "${props.type}" should be "${check}"`, () => {
                inputWrap.innerHTML = renderString(tmpl, props)
                const input = inputWrap.querySelector('input')
                const res = checkField(input!)
                expect(res.test).toEqual(check)
            })
        })
    }
})