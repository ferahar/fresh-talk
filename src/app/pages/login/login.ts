import {Component} from '../../../core/'
import {headerLogin} from '../../components/header/'
import {formsLogin2} from '../../components/forms2/'
import {ListComponents} from '../../../core/type'


class LoginPage extends Component {
  constructor(components: ListComponents = {}) {
    super( {
      tagName: 'section',
      components
    } )
        this.element!.setClass('container container_isColumn container_center')
  }
}

export const loginPage = new LoginPage({
  components: [headerLogin, formsLogin2]
})
