import { Module } from "../core/module"
import { Router } from "../core/router";
import { Component } from "../core/component";

import { router } from './app-routes'
import { appComponent } from './app-component'
import { header } from "./components/header/header"



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