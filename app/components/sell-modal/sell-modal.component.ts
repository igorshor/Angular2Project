import {Component, ElementRef} from 'angular2/core'
import {ICategoryData, IProductData} from "../../models/auction.model";
import {CategoriesService} from "../../services/categories.service";
import {FORM_DIRECTIVES} from "angular2/common";
import {PubsubEvents, PubSubService} from "../../services/pubsub.service";
import {AuctionService} from "../../services/auction.service";

interface ISellModalViewModel {
    product:IProductData;
    futureDates:IFutureDate[];
    categories:ICategoryData[]
    addAndSaveBtn():void;
}

interface IFutureDate {
    futureDateString:string;
    futureDate:Date;
}

@Component({
    selector: 'sell-modal',
    templateUrl: 'app/components/sell-modal/sell-modal.component.html',
    styleUrls: ['app/components/sell-modal/sell-modal.component.css'],
    providers: [CategoriesService],
    directives: [FORM_DIRECTIVES]
})

export class SellModalComponent implements ISellModalViewModel {
    public vm:ISellModalViewModel;
    public product:IProductData;
    public futureDates:IFutureDate[];
    public categories:ICategoryData[];
    public title:string;
    public active:boolean;

    private formElement:JQuery;

    constructor(private categoriesService:CategoriesService,
                private auctionService:AuctionService,
                private pubsubService:PubSubService,
                private elementRef:ElementRef) {
        this.vm = this;
        this.active = true;
        this.initData();
        this.formElement = $(elementRef);

        this.formElement.on('show.bs.modal', ()=> {
            this.active = false;
            setTimeout(()=>this.active = true, 0);
        })
    }

    private initData() {
        this.vm.categories = this.categoriesService.categories;

        this.vm.futureDates = [
            {futureDateString: '1 Day', futureDate: moment().add(1, 'days').toDate()},
            {futureDateString: '2 Days', futureDate: moment().add(2, 'days').toDate()},
            {futureDateString: '3 Days', futureDate: moment().add(3, 'days').toDate()},
            {futureDateString: '4 Days', futureDate: moment().add(4, 'days').toDate()},
            {futureDateString: '5 Days', futureDate: moment().add(5, 'days').toDate()},
            {futureDateString: '6 Days', futureDate: moment().add(5, 'days').toDate()},
            {futureDateString: '1 Week', futureDate: moment().add(1, 'weeks').toDate()},
            {futureDateString: '2 Weeks', futureDate: moment().add(2, 'weeks').toDate()},
            {futureDateString: '3 Weeks', futureDate: moment().add(3, 'weeks').toDate()},
            {futureDateString: '1 Month', futureDate: moment().add(1, 'months').toDate()},
            {futureDateString: '2 Months', futureDate: moment().add(2, 'months').toDate()},
            {futureDateString: '3 Months', futureDate: moment().add(3, 'months').toDate()},
            {futureDateString: '4 Months', futureDate: moment().add(4, 'months').toDate()}];

        this.resetForm();
    }

    private resetForm() {
        var date:Date = moment().toDate();
        var futureDate = this.product && this.product.EndTime ? this.product.EndTime : date;

        this.product = {
            Title: '',
            Description: '',
            StartTime: date,
            EndTime: futureDate,
            StartBid: 0.01,
            Picture1: '',
            Picture2: '',
            Picture3: '',
            Picture4: '',
            IsItemConditionNew: '1',
            CategoryId: 1,
        };

        this.product.CategoryId = this.categories[1].Id;
        this.product.EndTime = this.futureDates[6].futureDate;
    }

    addAndSaveBtn():void {
        this.auctionService.createAuction(this.product).subscribe(()=> {
            this.pubsubService.publish(PubsubEvents.CategoryChanged);
        });
    }

}