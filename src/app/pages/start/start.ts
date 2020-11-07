import { Component, Config } from "../../../core/component.js"
import { header } from '../../components/header/header.js'

class StartPage extends Component {
    
    static TEMPLATE = '../app/pages/start/start.html'

    constructor(config: Config) {
        config.template = StartPage.TEMPLATE;
        super( config );
    }

    componentDidMount() {
        header.setProps( {
            title: 'Главная'
        } )
    }
}

export const startPage = new StartPage({
    selector: 'app-start',
    props: {
        title: 'Test link'
    }
})




  