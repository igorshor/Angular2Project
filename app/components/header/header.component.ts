import {Component, Input} from 'angular2/core'

interface IHeaderViewModel {
    user:string;
}

@Component({
    selector: 'header',
    templateUrl: 'app/components/header/header.component.html',
    styleUrls:['app/components/header/header.component.css']
})

export class HeaderComponent implements IHeaderViewModel{
    @Input() public vm:IHeaderViewModel;
    public user:string;

    constructor(){
        this.vm = this;
    }

}