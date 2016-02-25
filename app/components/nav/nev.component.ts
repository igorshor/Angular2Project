import {Component, Input} from 'angular2/core'

interface INavigationViewModel {
    categories:ICategoryData[]
}

@Component({
    selector: 'nav',
    templateUrl: 'app/components/nav/nav.component.html',
    styleUrls: ['app/components/nav/nav.component.css']
})

export class NavComponent implements INavigationViewModel {
    @Input() public vm:INavigationViewModel;

    categories:ICategoryData[];

    constructor() {
        this.vm = this;
    }
}