import {Store} from '../../core/'
import {reducer} from './reducer'
import {state} from './state'

export const appStore = new Store(reducer, state)
