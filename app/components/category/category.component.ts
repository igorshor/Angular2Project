import {Component, Input} from 'angular2/core'
import {NgClass} from 'angular2/common'


interface ICategoryViewModel {
    categoryId:string;
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
    styleUrls: ['app/components/category/category.component.css']
})

export class CategoryComponent implements ICategoryViewModel {
    @Input() public vm:ICategoryViewModel;
    public categoryId:string;
    public categoryName:string;
    public categoryNameUpperCase:string;
    public categoryNameLowerCase:string;
    public categoryHaveImage:boolean;
    public categorySelected:boolean;

    constructor() {
        this.vm = this;

    }

    onCategoryClick():void {
    }

}