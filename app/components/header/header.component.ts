import {Component, Input} from 'angular2/core'
import {UserService} from "../../services/user.service";

interface IHeaderViewModel {
    user:string;
}

@Component({
    selector: 'header',
    templateUrl: 'app/components/header/header.component.html',
    styleUrls:['app/components/header/header.component.css']
})

export class HeaderComponent implements IHeaderViewModel{
    public vm:IHeaderViewModel;
    public user:string;

    constructor(userService:UserService){
        this.vm = this;
        this.vm.user = userService.userName;
    }

}