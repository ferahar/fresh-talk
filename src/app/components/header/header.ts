import { Component, Config } from "../../../core/component"
import { button, buttonLogout } from "../../components/button/index"

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
        button,
        buttonLogout
    ]
})




  