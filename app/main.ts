import {AppComponent} from './app.component'
import {bootstrap} from 'angular2/platform/browser'
import {NetService} from "./services/net.service";
import {UserService} from "./services/user.service";

bootstrap(AppComponent, [NetService, UserService]);