import { Module } from "../core/module.js"
import { Component } from "../core/component.js";
import { Router } from "../core/router.js";
import { startPoint } from './app-component.js'
import { header } from "./components/header/header.js"
import { router } from './app-routes.js'


type Config = {
    [key in string]: Component[] | Component | Router;
};

class AppModule extends Module {
    constructor(config: Config) {
        super(config)
    }
}

export const appModule = new AppModule({
    components: [
        header
    ],
    main: startPoint,
    router: router
    //routes: appRoutes
})