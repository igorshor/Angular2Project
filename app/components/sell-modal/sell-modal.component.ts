import {Component, OnChanges, SimpleChange} from 'angular2/core'
import {NetService, ICategoryData, IProductData} from "../../services/net.service";
import {CategoriesService} from "../../services/categories.service";

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
    styleUrls: ['app/components/sell-modal/sell-modal.component.less'],
})

export class SellModalComponent implements ISellModalViewModel, OnChanges {
    public vm:ISellModalViewModel;
    public product:IProductData;
    public futureDates:IFutureDate[];
    public categories:ICategoryData[];

    constructor(private categoriesService:CategoriesService, private  netService:NetService) {
        this.vm = this;
        this.initData();

        //$element.on('show.bs.modal', ()=> {
        //    $scope.$apply(()=> {
        //        this.resetForm();
        //        $scope.sellForm.$setPristine();
        //    })
        //})

    }

    ngOnChanges(changes:{[key: string]: SimpleChange}):any {
        for (var key in changes) {
            if (changes.hasOwnProperty(key)) {
                var change:SimpleChange = changes[key];

                if (key === 'vm.selectedCategory') {
                    if (change.isFirstChange()) {
                        this.product.CategoryId = change.currentValue.id;
                    }
                }

                if (key === 'vm.selectedFutureDate') {
                    if (change.isFirstChange()) {
                        this.product.EndTime = change.currentValue;
                    }
                }
            }
        }
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
    }

    private resetForm() {
        var date:Date = moment().toDate();
        var futureDate = this.selectedFutureDate ? this.selectedFutureDate.futureDate : date;

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

        this.selectedCategory = this.categories[1];
        this.selectedFutureDate = this.futureDates[6];
    }

    addAndSaveBtn():void {
        //this.netService.createAuction(this.product).then(()=> {
        //    this.$rootScope.$emit('onAuctionsChanged')
        //});
    }

}