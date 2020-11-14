import { Component, Config } from "../../../core/component"
import { buttonLogin, buttonLogout } from "../../components/button/index"
import { titleHeader } from "../../components/title/index"

class Header extends Component {

    static TEMPLATE = '../app/components/header/header.html'
    
    constructor(config: Config = {}) {
        config.template = Header.TEMPLATE;
        config.tagName = 'header'
        super( config );
        this.element!.setClass('header header_themeDark')
    }

}

export const header = new Header()
header.append2(
    [
        buttonLogin,
        buttonLogout,
    ],
    'app-headerButton'
)

header.append2(
    [
        titleHeader
    ],
    'app-headerTitle'
)


export const headerLogin = new Header()
header.append2(
    [
        titleHeader
    ],
    'app-headerTitle'
)



  