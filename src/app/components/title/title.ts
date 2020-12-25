import { Component } from "../../../core/index"

export class Title extends Component {

    static TEMPLATE = '../app/components/title/title.html'

    constructor(title: string, style: string) {

        super({
            tagName: style,
            template: Title.TEMPLATE,
            props: {
                title
            },
            style
        })
    }

}

