import {Component, Input, OnInit} from 'angular2/core'
import {PubSubService, IEventArgs} from "../../services/pubsub.service";
import {PubsubEvents} from "../../services/pubsub.service";


interface ICategoryViewModel {
    categoryId:string | number;
    categoryName:string;
    categoryNameUpperCase:string;
    categoryNameLowerCase:string;
    categoryHaveImage:boolean;
    categorySelected:boolean;
    onCategoryClick():void;
}

@Component({
    selector: 'category',
    templateUrl: 'app/components/category/category.component.html',
})

export class CategoryComponent implements ICategoryViewModel, OnInit {
    public vm:ICategoryViewModel;
    @Input() public categoryId:string | number;
    @Input() public categoryName:string;
    public categoryNameUpperCase:string;
    public categoryNameLowerCase:string;
    public categoryHaveImage:boolean;
    public categorySelected:boolean;

    constructor(private pubsubService:PubSubService) {
        this.vm = this;
        pubsubService.subscribe(PubsubEvents.CategoryChanged,(args:IEventArgs)=> {
            this.categorySelected = args.data === this.categoryId;
        });
    }

    ngOnInit():any {
        this.initCategory();
    }

    private initCategory() {
        this.vm.categoryNameUpperCase = this.categoryName.toUpperCase();
        this.vm.categoryNameLowerCase = this.categoryName.toLowerCase().replace(' ', '-').replace('.', '');
        this.vm.categoryHaveImage = this.categoryId > 0;
        this.vm.categorySelected = false;
    }

    public onCategoryClick():void {
        //this.$location.search({'categoryId': this.categoryId !== '0' ? this.categoryId : null});
        this.pubsubService.publish(PubsubEvents.CategoryChanged, {data:this.categoryId});
    }

}