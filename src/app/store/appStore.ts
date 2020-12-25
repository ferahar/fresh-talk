import {Store} from "../../core/index"
import {reducer} from "./reducer"
import {state} from "./state"

export const appStore = new Store(reducer, state)