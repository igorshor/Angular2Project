import {Component, OnInit} from "angular2/core";
import {PubSubService, PubsubEvents, IEventArgs} from "../../services/pubsub.service";
import {CategoriesService} from "../../services/categories.service";
import {AuctionComponent} from "../auction/auction.component";
import {IAuctionData} from "../../models/auction.model";
import {AuctionService} from "../../services/auction.service";
import {TimeService} from "../../services/time.service";
import {BidModalComponent} from "../bid-modal/bid-modal.component";

export interface IContentViewModel {
    category:string;
}

export interface IAuctionsViewModel {
    auctions:IAuctionData[];
    auctionsToShow:IAuctionData[];
    selectedCategory:number;
}


@Component({
    selector: 'auctions',
    templateUrl: 'app/components/auctions/auctions.component.html',
    styleUrls: ['app/components/auctions/auctions.component.css'],
    directives: [AuctionComponent, BidModalComponent],
    providers: [TimeService]
})

export class AuctionsComponent implements IAuctionsViewModel {
    public vm:IAuctionsViewModel;

    public auctions:IAuctionData[];
    public auctionsToShow:IAuctionData[];
    public selectedCategory:number;

    constructor(private pubsubService:PubSubService,
                private auctionService:AuctionService,
                private categoriesService:CategoriesService) {
        this.vm = this;
        this.loadAuctions();

        var updateInterval = setInterval(()=> this.loadAuctions(), 1000 * 60);

        var listeners:Function[] = [];
        this.pubsubService.subscribe(PubsubEvents.CategorySelection, (event:IEventArgs)=> this.auctionsFilterByCategory(event.data));
        this.pubsubService.subscribe(PubsubEvents.AuctionsChanged, ()=> this.loadAuctions());
        this.pubsubService.subscribe(PubsubEvents.RemoveAuction, (event:IEventArgs)=> this.removeAuction(event.data));
    }

    private loadAuctions() {
        this.auctionService.getAuctions()
            .subscribe(
                auctions => this.auctions = auctions,
                error => console.log('error in getAuctions :< ' + error),
                ()=> this.setSelectedCategory());
    }

    private auctionsFilterByCategory(categoryId:string) {
        var id:number = parseInt(categoryId);
        if (id === 0 || !this.categoriesService.categories[categoryId] || !this.auctions) {
            this.vm.auctionsToShow = this.auctions;
            return;
        }

        this.vm.auctionsToShow = this.auctions.filter((auction:IAuctionData)=> auction.Category.Id === id);
    }

    private removeAuction(auctionId:string):void {
        var auction:IAuctionData[] = $.grep(this.auctionsToShow,
            (auction:IAuctionData)=> auction.Id === auctionId);

        if (auction.length === 1) {
            this.removeElementFromArray<IAuctionData>(this.auctions, auction[0]);
            this.removeElementFromArray<IAuctionData>(this.auctionsToShow, auction[0]);
        }
    }

    private removeElementFromArray<T>(array:T[], element:T) {
        var index = array.indexOf(element);

        if (index > -1) {
            array.splice(index, 1);
        }
    }

    private setSelectedCategory():void {
        //var queryVariables = this.$location.search();
        //this.selectedCategory = (queryVariables["categoryId"] ? parseInt(queryVariables["categoryId"]) : 0);
        var selectedCategoryId:string = '0';//this.selectedCategory.toString();
        this.pubsubService.publish(PubsubEvents.CategoryChanged, {data: selectedCategoryId});
    }
}