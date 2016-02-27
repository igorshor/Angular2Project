import {Component} from 'angular2/core';
import {HeaderComponent} from './components/header/header.component';
import {NavComponent} from './components/nav/nev.component';
import {HTTP_PROVIDERS} from "angular2/http";
import {UserService} from "./services/user.service";
import {NetService} from "./services/net.service";

@Component({
    selector: 'ng-auction',
    templateUrl: 'app/app.component.html',
    directives: [HeaderComponent, NavComponent],
    providers: [NetService, UserService, HTTP_PROVIDERS]
})

export class AppComponent {
}