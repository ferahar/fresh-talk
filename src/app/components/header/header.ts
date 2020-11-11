import { Component, Config } from "../../../core/component.js"
import { button } from "../../components/button/button.js"

class Header extends Component {

    static TEMPLATE = '../app/components/header/header.html'
    
    constructor(config: Config) {
        config.template = Header.TEMPLATE;
        super( config );
    }

}

export const header = new Header({
    selector: 'app-header',
    props: {
        title: 'Главная'
    },
    components: [
        button
    ]
})




  