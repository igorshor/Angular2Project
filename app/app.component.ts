import {Component} from 'angular2/core';
import {HeaderComponent} from './header/header.component';
import {NavComponent} from './nav/nev.component';

@Component({
    selector: 'ng-auction',
    templateUrl: 'app/app.component.html',
    directives: [HeaderComponent, NavComponent]
})

export class AppComponent {

}