import {Injectable, Inject} from "angular2/core";
import {BaseRequestOptions} from "angular2/http";
import {Base64Service} from "./base64.service";
import {UserService} from "./user.service";

@Injectable()
export class AuthRequestOptions extends BaseRequestOptions {
    constructor(@Inject(Base64Service) base64Service:Base64Service, userService:UserService) {
        super();
        var encoded:string = base64Service.encode(userService.userLoginName + ':' + userService.userLoginPassword);
        var token:string = 'Basic ' + encoded;
        this.headers.append('Authorization', token)
    }
}