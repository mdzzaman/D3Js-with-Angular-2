///<reference path="../node_modules/angular2/typings/browser.d.ts"/>
import {bootstrap}         from 'angular2/platform/browser';
import {provide}           from 'angular2/core';
import {ROUTER_PROVIDERS, LocationStrategy, HashLocationStrategy}  from 'angular2/router';
import {AppComponent}      from './chart/app.component';

bootstrap(AppComponent, [
    ROUTER_PROVIDERS,
    provide(LocationStrategy,{ useClass: HashLocationStrategy })
]);