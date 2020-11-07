import { Module } from "../core/module.js"
import { Router } from "../core/router.js";
import { Component } from "../core/component.js";

import { router } from './app-routes.js'
import { appComponent } from './app-component.js'
import { header } from "./components/header/header.js"



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
    main: appComponent,
    router: router
    //routes: appRoutes
})