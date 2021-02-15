import {Component} from '../../../core/'

const template = require('./title.html')


export class Title extends Component {
  constructor(title: string, style: string) {
    super({
      tagName: style,
      template,
      props: {
        title
      },
      style
    })
  }
}

