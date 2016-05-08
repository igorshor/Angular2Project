import {Injectable} from 'angular2/core'
import {Http, Response} from 'angular2/http'
import {Observable} from 'rxjs/Observable'
import {IAuctionData, IProductData, IBidData} from "../models/auction.model";

export interface INetService {
    getAuctions():Observable<IAuctionData[]>;
    getAuction(id:string):Observable<IAuctionData>;
    deleteAuction(id:string):Observable<void>;
    createAuction(product:IProductData):Observable<void>;
    addBid(auctionId:string, bid:IBidData):Observable<void>;
}

@Injectable()
export class NetService implements INetService {
    private baseUrl:string;

    constructor(private httpService:Http) {
        this.baseUrl = '//auctions-igorshor.c9users.io/';
    }

    public getAuctions():Observable<IAuctionData[]> {
        return this.httpService.get(`${this.baseUrl}api/auctions`)
            .map(res => <IAuctionData[]> res.json())
            .catch(this.handleError);
    }

    public getAuction(id:string):Observable<IAuctionData> {
        return this.httpService.get(`${this.baseUrl}api/auctions/${id}`)
            .map(res => <IAuctionData> res.json())
            .catch(this.handleError);
    }

    public deleteAuction(id:string):Observable<void> {
        return this.httpService.delete(`${this.baseUrl}api/auctions/${id}`)
            .map(res => <void> res.json())
            .catch(this.handleError);
    }

    public createAuction(product:IProductData):Observable<void> {
        return this.httpService.post(`${this.baseUrl}api/auctions`, JSON.stringify(product))
            .map(res => <void> res.json())
            .catch(this.handleError);
    }

    public addBid(auctionId:string, bid:IBidData):Observable<void> {
        return this.httpService.post(`${this.baseUrl}api/bids/${auctionId}`, JSON.stringify(bid))
            .map(res => <void> res.json())
            .catch(this.handleError);
    }

    private handleError(error:Response) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }
}