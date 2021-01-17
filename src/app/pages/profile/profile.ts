import {Component, Router, DomElement} from '../../../core/'
import {headerProfile} from '../../components/header/'
import {formsProfile2, formsAvatar, formsPswChange} from '../../components/forms2/'
import {ListComponents} from '../../../core/type'

const template = require('./profile.html')

class ProfilePage extends Component {
  constructor(components: ListComponents = {}) {
    super({
      tagName: 'section',
      template,
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

