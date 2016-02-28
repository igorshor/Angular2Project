import {Component, Input, OnInit} from 'angular2/core'
import {NgClass} from 'angular2/common'
import {PubSubService} from "../../services/pubsub.service";
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
        pubsubService.subscribe(PubsubEvents.balbal,(event, id)=> {
            this.categorySelected = id === this.categoryId
            console.log('balbal')
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
        this.pubsubService.publish(PubsubEvents.balbal, this.categoryId);
        //this.$rootScope.$emit('onCategorySelection', this.categoryId);
    }

}