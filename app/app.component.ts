import {Component} from 'angular2/core';
import {HeaderComponent} from './components/header/header.component';
import {NavComponent} from './components/nav/nev.component';
import {UserService} from "./services/user.service";
import {PubSubService} from "./services/pubsub.service";
import {AuctionService} from "./services/auction.service";
import {ContentComponent} from "./components/content/content.component";

@Component({
    selector: 'ng-auction',
    templateUrl: 'app/app.component.html',
    directives: [HeaderComponent, NavComponent, ContentComponent],
    providers: [AuctionService, UserService, PubSubService]
})

export class AppComponent {
}