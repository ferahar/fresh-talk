import { header } from './components/header/header'
import { appPage } from './app-page'
import { router } from './app-routes'


export const start = () => {
    header.renderDom('app-root')
    appPage.renderDom('app-root')
    router.start()
}