import {Component, Input} from 'angular2/core'

interface INavViewModel{
    testVar:string;
}

@Component({
    selector: 'nav',
    templateUrl: 'app/components/nav/nav.component.html'
})

export class NavComponent implements INavViewModel{
    @Input() public vm:INavViewModel;
    public testVar:string;

    constructor(){
        this.vm = this;

        this.testVar = 'testVar';
        var fdfsf:moment.Moment = moment(new Date());
    }
}