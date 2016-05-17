import {Injectable, OnInit} from "angular2/core";
import {PubSubService, PubsubEvents} from "./pubsub.service";

export interface ILocationService {
    add(key:string, value:string, trigger:boolean):void
    clear(trigger:boolean):void;
    remove(key:string, trigger:boolean):void;
}
@Injectable()
export class LocationService implements ILocationService, OnInit {

    constructor(private pubsubService:PubSubService) {
    }

    ngOnInit() {
        $(window).on('popstate', ()=> {
            var query:{[param:string]:string} = this.parseQuery(document.location.search);
            this.pubsubService.publish(PubsubEvents.LocationPopped, {data: query});
        });

        var query:{[param:string]:string} = this.parseQuery(document.location.search);
        this.pubsubService.publish(PubsubEvents.LocationChanged, {data: query});
    }

    public clear(trigger:boolean):void {
        var query:{[param:string]:string} = this.parseQuery(document.location.search);
        if (query && Object.keys(query).length !== 0 && JSON.stringify(query) !== JSON.stringify({})) {
            history.pushState({}, "", window.location.pathname);
            if (trigger) {
                this.pubsubService.publish(PubsubEvents.LocationChanged);
            }
        }
    }

    public remove(key:string, trigger:boolean):void {
        var query:{[param:string]:string} = this.parseQuery(document.location.search);

        if (query[key]) {
            delete query[key];
            var queryStr:string = Object.keys(query).length > 0 ? $.param(query) : '';
            history.pushState({}, "", window.location.pathname + queryStr);

            if (trigger) {
                this.pubsubService.publish(PubsubEvents.LocationChanged);
            }
        }
    }

    public add(key:string, value:string, trigger:boolean) {
        if (!key || !value) {
            return;
        }

        var query:{[param:string]:string} = this.parseQuery(document.location.search) || {};

        var beforeValue:string = query[key];
        query[key] = value;
        history.pushState(query, "", window.location.pathname + '?' + $.param(query));

        if (beforeValue !== value) {
            if (trigger) {
                this.pubsubService.publish(PubsubEvents.LocationChanged);
            }
        }
    }

    private parseQuery(qstr:string):{[param:string]:string} {
        if (!qstr) {
            return;
        }

        var query:{[param:string]:string} = {};
        var a = qstr.substr(1).split('&');
        for (var i = 0; i < a.length; i++) {
            var b = a[i].split('=');
            query[decodeURIComponent(b[0])] = decodeURIComponent(b[1] || '');
        }
        return Object.keys(query).length > 0 ? query : undefined;
    }

}