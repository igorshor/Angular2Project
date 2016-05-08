import {AppComponent} from './app.component'
import {bootstrap} from 'angular2/platform/browser'
import {ROUTER_PROVIDERS} from "angular2/router";
import {CategoriesService} from "./services/categories.service";
import {HTTP_PROVIDERS, RequestOptions} from "angular2/http";
import {provide} from "angular2/core";
import {AuthRequestOptions} from "./services/auth-request-options.service";
import {Base64Service} from "./services/base64.service";
import {UserService} from "./services/user.service";

bootstrap(AppComponent,
    [
        ROUTER_PROVIDERS,
        HTTP_PROVIDERS,
        Base64Service,
        UserService,
        provide(RequestOptions, {useClass: AuthRequestOptions}),
        CategoriesService
    ]);