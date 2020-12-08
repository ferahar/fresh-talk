import { Component, Router, DomElement } from "../../../core/index";
import {headerProfile} from '../../components/header/index'
import {formsProfile2, formsAvatar, formsPswChange} from "../../components/forms2/index";


type Indexed = {
    [key in string]: unknown
}

class ProfilePage extends Component {

    static TEMPLATE = '../app/pages/profile/profile.html'

    constructor(components: Indexed = {}) {
        super({
            tagName: 'section',
            template: ProfilePage.TEMPLATE,
            components
        })
        this.element!.setClass('container container_isColumn container_stretch')
    }

}

export const profilePage = new ProfilePage({
        header: [headerProfile],
        formProfile: [formsProfile2],
        formAvatar: [formsAvatar],
        formPsw: [formsPswChange]
    }
)


new Router().initLink( profilePage.element as DomElement )




