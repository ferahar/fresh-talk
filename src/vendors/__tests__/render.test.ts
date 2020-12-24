import {renderString} from "nunjucks"


describe('Template tools:', ()=> {

    test('Create title', ()=>{
        const tmpl = `<h1>{{title}}</h1>`
        const result = renderString(tmpl,{title:'fresh talk'})
        expect(result).toBe('<h1>fresh talk</h1>')
    })
})
