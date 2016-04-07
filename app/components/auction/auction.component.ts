import {Component, OnInit, Input} from "angular2/core";
import {IAuctionData} from "../../models/auction.model";
import {PubSubService, PubsubEvents} from "../../services/pubsub.service";
import {AuctionService} from "../../services/auction.service";
import {UserService} from "../../services/user.service";
import {TimeService} from "../../services/time.service";
import {NumberPipe} from "angular2/common";
import {NumberLimitPipe} from "../pipes/number-limit.pipe";
import {BidModalComponent} from "../bid-modal/bid-modal.component";

export interface IAuctionViewModel {
    auction:IAuctionData;
    highestBid:number;
    bidCount:string;
    timeLeft:string;
    isUserAuction:boolean;
    category:string;
    mailTo:string;
    openBidModal():void;
    deleteAuctionBtn():void;
}
@Component({
    selector: 'auction',
    templateUrl: 'app/components/auction/auction.component.html',
    pipes:[NumberLimitPipe],
})

export class AuctionComponent implements IAuctionViewModel,OnInit {
    public vm:IAuctionViewModel;
    @Input() public auction:IAuctionData;
    public highestBid:number;
    public bidCount:string;
    public timeLeft:string;
    public isUserAuction:boolean;
    public category:string;
    public mailTo:string;

    constructor(private pubsubService:PubSubService,
                private auctionService:AuctionService,
                private userService:UserService, private timeService:TimeService) {
        this.vm = this;
    }

    private initAuction() {
        this.vm.highestBid = this.auction.HighestBid ? this.auction.HighestBid.Bid : this.auction.StartBid;
        this.vm.bidCount = this.auction.BidCount > 0 ? (this.auction.BidCount + ' bids') : 'Be the first bidder';
        this.vm.timeLeft = this.timeService.getFormattedCountDown(this.auction.EndTime);
        this.vm.isUserAuction = this.auction.User.Name === this.userService.userName;
        this.vm.category = this.auction.Category.Name.toLowerCase().replace(' ', '-').replace('.', '');
        this.vm.mailTo = "mailto:" + this.vm.auction.User.Email + "?Subject=SELL";
    }

    public ngOnInit():void {
        this.initAuction();
    }

    public openBidModal():void {
        this.pubsubService.publish(PubsubEvents.AuctionClick, {data: this.auction.Id});
    }

    public deleteAuctionBtn():void {
        this.auctionService.deleteAuction(this.auction.Id)
            .subscribe(()=> {
                this.pubsubService.publish(PubsubEvents.RemoveAuction, {data: this.auction.Id})
            },()=>{},()=>{
                this.pubsubService.publish(PubsubEvents.RemoveAuction, {data: this.auction.Id})
            });
    }
}