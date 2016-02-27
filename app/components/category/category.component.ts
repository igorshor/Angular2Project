import {Component, Input, OnInit} from 'angular2/core'
import {NgClass} from 'angular2/common'


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

    constructor() {
        this.vm = this;
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
        //this.$rootScope.$emit('onCategorySelection', this.categoryId);
    }

}