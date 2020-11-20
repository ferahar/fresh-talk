import { Component } from "../../../core/component/component"
import { buttonLogin, buttonLogout } from "../../components/button/index"
import { titleHeader } from "../../components/title/index"

type Indexed = {
    [key in string]: unknown
}

class Header extends Component {

    static TEMPLATE = '../app/components/header/header.html'
    
    constructor(config: Indexed = {}) {
        config.template = Header.TEMPLATE;
        config.tagName = 'header'
        super( config );
        this.element!.setClass('header header_themeDark')
    }

}

export const header = new Header()
header.append(
    [
        buttonLogin,
        buttonLogout,
    ],
    'app-headerButton'
)

header.append(
    [
        titleHeader
    ],
    'app-headerTitle'
)


export const headerLogin = new Header()
header.append(
    [
        titleHeader
    ],
    'app-headerTitle'
)



  