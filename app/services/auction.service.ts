import {Injectable} from "angular2/core";
import {Observable} from "rxjs/Observable";
import {IAuctionData, IProductData, IBidData} from "../models/auction.model";

export interface IAuctionsService{
    getAuctions():Observable<IAuctionData[]>;
    getAuction(id:string):Observable<IAuctionData>;
    deleteAuction(id:string):Observable<boolean>;
    createAuction(product:IProductData):Observable<boolean>;
    addBid(auctionId:string, bid:IBidData):Observable<boolean>;
}

@Injectable()
export class AuctionService {
    
}