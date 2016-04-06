import {Injectable} from 'angular2/core'
import {ICategoryData} from "../models/auction.model";

export interface ICategoriesService {
    categoriesNames:string[];
    defaultCategory:string;
    categories:ICategoryData[]
    getCategoryId(name:string):number;
    getCategoryName(id:number):string;
}

@Injectable()
export class CategoriesService implements ICategoriesService{
    public categoriesNames:string[] = ['Electronics', 'Fashion', 'Home', 'Books', 'Children', 'Misc.'];
    public defaultCategory = 'All Auctions';
    public categories:ICategoryData[] = [
        {Id: 0, Name: this.defaultCategory},
        {Id: 1, Name: this.categoriesNames[0]},
        {Id: 2, Name: this.categoriesNames[1]},
        {Id: 3, Name: this.categoriesNames[2]},
        {Id: 4, Name: this.categoriesNames[3]},
        {Id: 5, Name: this.categoriesNames[4]},
        {Id: 6, Name: this.categoriesNames[5]}];

    public getCategoryId(name:string):number {
        return this.categoriesNames.indexOf(name) + 1;
    }

    public getCategoryName(id:number):string {
        return this.categoriesNames[id - 1];
    }
}