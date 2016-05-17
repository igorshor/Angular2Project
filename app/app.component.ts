import {Component} from 'angular2/core';
import {HeaderComponent} from './components/header/header.component';
import {NavComponent} from './components/nav/nev.component';
import {UserService} from "./services/user.service";
import {PubSubService} from "./services/pubsub.service";
import {AuctionService} from "./services/auction.service";
import {ContentComponent} from "./components/content/content.component";
import {NetService} from "./services/net.service";
import {Base64Service} from "./services/base64.service";
import {LocationService} from "./services/location.service";

@Component({
    selector: 'ng-auction',
    templateUrl: 'app/app.component.html',
    directives: [HeaderComponent, NavComponent, ContentComponent],
    providers: [AuctionService, PubSubService, NetService, LocationService]
})

export class AppComponent {
}