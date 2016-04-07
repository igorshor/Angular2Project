import {Component, ElementRef, OnInit} from "angular2/core";
import {IAuctionData, IBidData} from "../../models/auction.model";
import {AuctionService} from "../../services/auction.service";
import {TimeService} from "../../services/time.service";
import {PubsubEvents, IEventArgs, PubSubService} from "../../services/pubsub.service";
import {NumberLimitPipe} from "../pipes/number-limit.pipe";
import {PicturesCarouselComponent} from "../pictures-carousel/pictures-carousel.component";

export interface IBidModalViewModel {
    auction:IAuctionData;
    pictures:string[];
    highestBid:number;
    minBidValue:number;
    timeLeft:string;
    bidWasMade:boolean;
    mailTo:string;
    placeBidClick():void;
}

@Component({
    selector: 'bid-modal',
    templateUrl: 'app/components/bid-modal/bid-modal.component.html',
    styleUrls: ['app/components/bid-modal/bid-modal.component.css'],
    directives: [PicturesCarouselComponent],
    pipes: [NumberLimitPipe],
})
export class BidModalComponent implements IBidModalViewModel, OnInit {
    public vm:IBidModalViewModel;
    public auction:IAuctionData;
    public pictures:string[];
    public highestBid:number;
    public minBidValue:number;
    public timeLeft:string;
    public bidWasMade:boolean;
    public mailTo:string;

    constructor(private pubsubService:PubSubService,
                private auctionService:AuctionService,
                private timeService:TimeService,
                private elementRef:ElementRef) {
        this.vm = this;

        this.pubsubService.subscribe(PubsubEvents.AuctionsLoaded, ()=> {
            if (this.auction) {
                this.vm.timeLeft = this.timeService.getFormattedCountDown(this.auction.EndTime);
            }
        });

        this.pubsubService.subscribe(PubsubEvents.AuctionClick, (args:IEventArgs)=> {
            this.auctionService.getAuction(args.data).subscribe(
                (auction:IAuctionData)=> {
                    this.auction = auction
                },
                error => {
                    console.log('error in getAuction :< ' + error)
                },
                ()=> {
                    this.initBidModal()
                })
        });

        $(elementRef).on('hidden.bs.modal', ()=> this.resetForum());
    }

    public ngOnInit():any {
        this.auction = <any>{User: <any>{}}
    }

    private resetForum():void {
        this.vm.pictures = null;
        this.vm.auction = null;
        this.vm.highestBid = null;
        this.bidWasMade = false;
    }

    private initBidModal() {
        this.vm.minBidValue = (this.auction.HighestBid ?
                this.auction.HighestBid.Bid : this.auction.StartBid) + 0.01;
        this.vm.highestBid = parseFloat((this.minBidValue).toFixed(2));
        this.vm.timeLeft = this.timeService.getFormattedCountDown(this.auction.EndTime);
        this.vm.mailTo = "mailto:" + this.vm.auction.User.Email + "?Subject=SELL";

        this.vm.pictures = [];

        for (var i = 1; i <= 4; i++) {
            var picUrl:string = this.auction['Picture' + i];
            if (picUrl !== "") {
                this.vm.pictures.push(picUrl);
            }
        }
    }

    public placeBidClick():void {
        var newBid:IBidData = {
            Bid: this.highestBid,
            BidTime: moment().toDate()
        };

        this.auctionService.addBid(this.auction.Id, newBid).subscribe(
            ()=> {
                this.pubsubService.publish(PubsubEvents.AuctionsChanged);
                this.bidWasMade = true;
            },
            ()=> this.vm.highestBid = this.auction.HighestBid.Bid);
    }
}