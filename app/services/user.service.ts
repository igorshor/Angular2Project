import {Injectable} from 'angular2/core'

export interface IUserService {
    userLoginName:string;
    userLoginPassword:string;
    userName:string;
}

@Injectable()

export class UserService implements IUserService {
    public userLoginName:string = 'igors';
    public userLoginPassword:string = 'CB989279-AAEC-4EAA-8027-3BF67E05C3A3';
    public userName:string = 'Igor Shor';
}

