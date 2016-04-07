import {Injectable} from "angular2/core";
import {Observable} from "rxjs/Observable";
import 'rxjs/Rx';
import {IAuctionData, IProductData, IBidData, IUserData} from "../models/auction.model";
import {CategoriesService} from "./categories.service";

export interface IAuctionsService {
    getAuctions():Observable<IAuctionData>;
    getAuction(id:string):Observable<IAuctionData>;
    deleteAuction(id:string):Observable<void>;
    createAuction(product:IProductData):Observable<void>;
    addBid(auctionId:string, bid:IBidData):Observable<void>;
}

@Injectable()
export class AuctionService implements IAuctionsService {
    private auctions:IAuctionData[];
    private user:IUserData;

    constructor(private categoryService:CategoriesService) {
        this.createFakeAuctions();
    }

    public getAuctions():Observable<IAuctionData> {
        return (<any>Observable).from(this.auctions);
    }

    public getAuction(id:string):Observable<IAuctionData> {
        return (<any>Observable).from(this.auctions).filter((auction:IAuctionData)=> auction.Id === id).take(1);
    }

    public deleteAuction(id:string):Observable<void> {
        return Observable.create((observer)=> {
            var auction:IAuctionData = this.auctions.find((auction:IAuctionData)=> auction.Id === id);
            var index:number = this.auctions.indexOf(auction);
            if (index >= 0) {
                this.auctions.splice(index, 1);
                observer.onNext(42);
                observer.onCompleted();
            }
            else {
                observer.onError()
            }
        });
    }

    public createAuction(product:IProductData):Observable<void> {
        return Observable.create((observer)=> {
            var auction:IAuctionData = <any>product;

            auction.Id = Math.random().toString();
            auction.IsItemNew = product.IsItemConditionNew === '1';
            auction.User = this.user;
            auction.HighestBid = null;
            auction.BidCount = 0;
            auction.Category = this.categoryService.categories[product.CategoryId];
            this.auctions.push(auction);

            observer.onCompleted();
        });
    }

    public addBid(auctionId:string, bid:IBidData):Observable<void> {
        return Observable.create((observer)=> {
            this.getAuction(auctionId).subscribe((auction:IAuctionData)=> {
                auction.HighestBid = bid;
                auction.BidCount++;
                observer.onCompleted();
            }, (err)=> observer.onError())
        });
    }

    private createFakeAuctions() {
        this.user = {
            Id: 1,
            Name: 'Igor S',
            Email: 'igors@codevalue.net',
            LastLoginTime: moment().toDate(),
            CreatedOn: moment().toDate(),
        };


        this.auctions = [{
            Title: '',
            Description: '',
            StartTime: moment().toDate(),
            EndTime: moment().toDate(),
            StartBid: 1,
            Picture1: 'http://placehold.it/120x120&text=image1',
            Picture2: 'http://placehold.it/120x120&text=image2',
            Picture3: 'http://placehold.it/120x120&text=image3',
            Picture4: 'http://placehold.it/120x120&text=image4',
            Id: '1',
            IsItemNew: false,
            User: {
                Id: 1,
                Name: 'Igor S',
                Email: 'igors@codevalue.net',
                LastLoginTime: moment().toDate(),
                CreatedOn: moment().toDate(),
            },
            Category: this.categoryService.categories[0],
            HighestBid: {
                Bid: 3234,
                BidTime: moment().toDate(),
            },
            BidCount: 2
        }, {
            Title: '',
            Description: '',
            StartTime: moment().toDate(),
            EndTime: moment().toDate(),
            StartBid: 1,
            Picture1: 'http://placehold.it/120x120&text=image1',
            Picture2: 'http://placehold.it/120x120&text=image2',
            Picture3: 'http://placehold.it/120x120&text=image3',
            Picture4: 'http://placehold.it/120x120&text=image4',
            Id: '2',
            IsItemNew: false,
            User: {
                Id: 1,
                Name: 'Igor S',
                Email: 'igors@codevalue.net',
                LastLoginTime: moment().toDate(),
                CreatedOn: moment().toDate(),
            },
            Category: this.categoryService.categories[0],
            HighestBid: {
                Bid: 3234,
                BidTime: moment().toDate(),
            },
            BidCount: 2
        },]
    }
}