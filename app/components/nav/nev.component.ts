import {Component, Input} from 'angular2/core'
import {ICategoryData} from "../../models/auction.model";
import {CategoriesService} from "../../services/categories.service";
import {CategoryComponent} from "../category/category.component";

interface INavigationViewModel {
    categories:ICategoryData[]
    category:ICategoryData;
}

@Component({
    selector: 'nav',
    templateUrl: 'app/components/nav/nav.component.html',
    styleUrls: ['app/components/nav/nav.component.css'],
    directives: [CategoryComponent],
    providers: [CategoriesService]
})

export class NavComponent implements INavigationViewModel {
    public vm:INavigationViewModel;
    public categories:ICategoryData[];
    category:ICategoryData;
    constructor(categoriesService:CategoriesService) {
        this.vm = this;
        this.categories = categoriesService.categories;
        this.category = this.categories[0];
    }
}