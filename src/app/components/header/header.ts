import {Component} from '../../../core/'

import './header.scss'
const template = require('./header.html')


export class Header extends Component {
    static TEMPLATE = '../app/components/header/header.html'

    constructor(title:string = '', components:{[key in string]: Component[]} = {}) {
      super({
        template,
        tagName: 'header',
        props: {title: title},
        components
      })
      this.element.setClass('header header_themeDark')
    }
}
