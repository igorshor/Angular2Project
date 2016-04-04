import {Component} from 'angular2/Core'

export interface IAuctionViewModel {

}

@Component({
    selector: 'auction',
    templateUrl: 'app/components/auction/auction.component.html'
})

export class AuctionsComponent implements IAuctionViewModel {
    public vm:IAuctionViewModel;
    constructor(){
        this.vm = this;
    }
}