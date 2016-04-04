import {Component} from 'angular2/Core'
import {CategoriesService} from "../../services/categories.service";
import {PubSubService, PubsubEvents} from "../../services/pubsub.service";
import {IAuctionData} from "../../models/auction.model";

export interface IAuctionsViewModel{
    auctions:IAuctionData[];
    auctionsToShow:IAuctionData[];
    selectedCategory:number;
}

@Component({
    selector:'auctions',
    templateUrl:'app/components/auctions/auctions.component.html'
})

export class AuctionsComponent implements IAuctionsViewModel{
    public vm:IAuctionsViewModel;

    public auctions:IAuctionData[];
    public auctionsToShow:IAuctionData[];
    public selectedCategory:number;
    
    constructor(private pubsubService:PubSubService,
                private netService:INetService,
                private categoriesService:CategoriesService){
        this.vm = this;
    }

    private loadAuctions() {
        this.netService.getAuctions().then((response)=> {
            this.auctions = response.data;
            this.setSelectedCategory();
            this.pubsubService.publish(PubsubEvents.AuctionsLoaded)
        });
    }

    private auctionsFilterByCategory(categoryId:string) {
        var id:number = parseInt(categoryId);
        if (id === 0 || !this.categoriesService.categories[categoryId] || !this.auctions) {
            this.vm.auctionsToShow = this.auctions;
            return;
        }

        this.vm.auctionsToShow = this.filter(this.auctions, {Category: {Id: categoryId}});
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
        this.selectedCategory = (queryVariables["categoryId"] ? parseInt(queryVariables["categoryId"]) : 0);
        var selectedCategoryId:string = this.selectedCategory.toString();
        this.pubsubService.publish(PubsubEvents.CategoryChanged, {data:selectedCategoryId});
    }
}