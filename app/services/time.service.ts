import {Injectable} from "angular2/core";

export interface ITimeService {
    getFormattedCountDown(endTime:Date):string;
}

@Injectable()
export class TimeService implements ITimeService {
    public getFormattedCountDown(endTime:Date):string {
        var diffTime:number = moment.utc(endTime).diff(moment());
        var duration:moment.Duration = moment.duration(diffTime);
        return `${Math.floor(duration.asHours())}h ${Math.floor(duration.asMinutes()) % 60}m `
    }
}