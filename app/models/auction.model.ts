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