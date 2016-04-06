import {Component, OnInit} from "angular2/core";
import {SellModalComponent} from "../sell-modal/sell-modal.component";
import {AuctionsComponent} from "../auctions/auctions.component";
import {PubSubService, PubsubEvents, IEventArgs} from "../../services/pubsub.service";
import {CategoriesService} from "../../services/categories.service";

export interface IContentViewModel {
    category:string;
}

@Component({
    selector: 'content',
    templateUrl: 'app/components/content/content.component.html',
    styleUrls: ['app/components/content/content.component.css'],
    directives: [SellModalComponent, AuctionsComponent]
})

export class ContentComponent implements IContentViewModel {
    public vm:IContentViewModel;
    public category:string;

    constructor(private pubsubService:PubSubService,
                private categoriesService:CategoriesService) {
        this.vm = this;
        this.pubsubService.subscribe(PubsubEvents.CategorySelection, (args:IEventArgs)=> {
            this.vm.category = categoriesService.categories[args.data].Name;
        })
    }
}