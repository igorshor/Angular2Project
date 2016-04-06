import {Injectable, EventEmitter} from 'angular2/core'

export enum PubsubEvents {
    CategoryChanged,
    AuctionsLoaded,
    CategorySelection,
    AuctionClick,
    RemoveAuction,
    AuctionsChanged
}

export interface IPubSubService {
    publish(eventType:PubsubEvents, args?:any):void;
    subscribe(eventType:PubsubEvents, eventHandler:Function):void;
    unsubscribe(eventType:PubsubEvents):void;
}

export interface IEventArgs {
    data:any;
}

@Injectable()
export class PubSubService implements IPubSubService {
    private events:{[event:string]:EventEmitter<any> };

    publish(eventType:PubsubEvents, args?:IEventArgs):void {
        this.menageEvents(eventType);
        this.events[PubsubEvents[eventType]].emit(args)
    }

    subscribe(eventType:PubsubEvents, eventHandler:Function):void {
        this.menageEvents(eventType);
        this.events[PubsubEvents[eventType]].subscribe(eventHandler)
    }

    public unsubscribe(eventType:PubsubEvents):void {
        if (this.events[PubsubEvents[eventType]]) {
            this.events[PubsubEvents[eventType]].unsubscribe();
        }
    }

    private menageEvents(eventType:PubsubEvents):void {
        if (!this.events[PubsubEvents[eventType]]) {
            this.events[PubsubEvents[eventType]] = new EventEmitter();
        }
    }

    constructor() {
        this.events = {}
    }
}