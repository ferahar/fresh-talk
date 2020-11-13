import { Title } from "./title"

export const titleHeader = new Title({
    props: {
        title: 'ferahar'
    },
    tagName: 'h3'
})

export const titleFormError = new Title({
    props: {
        title: 'ferahar'
    },
    tagName: 'span'
})
titleFormError.element!.setClass( "form-textErorr" )