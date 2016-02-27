import {Provider, Injectable} from 'angular2/core'
import {Http, Response} from 'angular2/http'
import {Observable} from 'rxjs/Observable'

export interface IProductBasicData {
    Title:string;
    Description:string;
    StartTime:Date;
    EndTime:Date;
    StartBid:number;
    Picture1:string;
    Picture2:string;
    Picture3:string;
    Picture4:string;
}

export interface IAuctionData extends IProductBasicData {
    Id:string;
    IsItemNew:boolean;
    User:IUserData;
    Category:ICategoryData;
    HighestBid:IBidData;
    BidCount:number
}

export interface IProductData extends IProductBasicData {
    IsItemConditionNew:string;
    CategoryId:number;
}

export interface IUserData {
    Id:number;
    Name:string;
    Email:string;
    LastLoginTime:Date;
    CreatedOn:Date;
}

export interface ICategoryData {
    Id:number;
    Name:string;
}

export interface IBidData {
    Bid:number;
    BidTime:Date;
}

export interface INetService {
    getAuctions():Observable<IAuctionData[]>;
    getAuction(id:string):Observable<IAuctionData>;
    deleteAuction(id:string):Observable<boolean>;
    createAuction(product:IProductData):Observable<boolean>;
    addBid(auctionId:string, bid:IBidData):Observable<boolean>;

}

@Injectable()
export class NetService implements INetService{
    private baseUrl:string;

    constructor(private httpService:Http) {
        this.baseUrl = 'http://ngauctions.azurewebsites.net/';
    }

    public getAuctions():Observable<IAuctionData[]> {
        return this.httpService.get(`${this.baseUrl}api/auctions`)
            .map(res => <IAuctionData[]> res.json().data)
            .catch(this.handleError);
    }

    private handleError (error: Response) {
        // in a real world app, we may send the error to some remote logging infrastructure
        // instead of just logging it to the console
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');}

    public getAuction(id:string):Observable<IAuctionData> {
        return this.httpService.get(`${this.baseUrl}api/auctions/${id}`)
            .map(res => <IAuctionData> res.json().data)
            .catch(this.handleError);
    }

    public deleteAuction(id:string):Observable<boolean> {
        return this.httpService.delete(`${this.baseUrl}api/auctions/${id}`)
            .map(res => <boolean> res.json().data)
            .catch(this.handleError);
    }

    public createAuction(product:IProductData):Observable<boolean> {
        return this.httpService.post(`${this.baseUrl}api/auctions`, JSON.stringify(product))
            .map(res => <boolean> res.json().data)
            .catch(this.handleError);
    }

    public addBid(auctionId:string, bid:IBidData):Observable<boolean> {
        return this.httpService.post(`${this.baseUrl}api/bids/${auctionId}`, JSON.stringify(bid))
            .map(res => <boolean> res.json().data)
            .catch(this.handleError);
    }
}