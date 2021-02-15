import {Component} from '../../../core/'
import {chatnavigate} from '../../components/chatnavigate/'
import {chatcurrent} from '../../components/chatcurrent/'
import {ListComponents} from '../../../core/type'

class ChatPage extends Component {
  constructor(components: ListComponents = {}) {
    super({
      tagName: 'div',
      components
    })
    this.element.setClass('container')
  }
}

export const chatPage = new ChatPage({
  components: [
    chatnavigate,
    chatcurrent
  ]
})

