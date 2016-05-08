import {Injectable} from "angular2/core";
import {Observable} from "rxjs/Observable";
import 'rxjs/Rx';
import {IAuctionData, IProductData, IBidData, IUserData} from "../models/auction.model";
import {CategoriesService} from "./categories.service";
import {NetService} from "./net.service";

export interface IAuctionsService {
    getAuctions():Observable<IAuctionData[]>;
    getAuction(id:string):Observable<IAuctionData>;
    deleteAuction(id:string):Observable<void>;
    createAuction(product:IProductData):Observable<void>;
    addBid(auctionId:string, bid:IBidData):Observable<void>;
}

@Injectable()
export class AuctionService implements IAuctionsService {
    private auctions:IAuctionData[];

    constructor(private netService:NetService) {
    }

    public getAuctions():Observable<IAuctionData[]> {
        return this.netService.getAuctions();
    }

    public getAuction(id:string):Observable<IAuctionData> {
        return this.netService.getAuction(id);
    }

    public deleteAuction(id:string):Observable<void> {
        return this.netService.deleteAuction(id);
    }

    public createAuction(product:IProductData):Observable<void> {
        return this.netService.createAuction(product);
    }

    public addBid(auctionId:string, bid:IBidData):Observable<void> {
        return this.netService.addBid(auctionId, bid)
    }
}