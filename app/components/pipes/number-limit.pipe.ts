import {Pipe, PipeTransform} from "angular2/core";
@Pipe({
    name:'numberLimit'
})

export class NumberLimitPipe implements PipeTransform{
    constructor(){
        
    }
    
    public transform(value:number, args:any[]):any {
        return value;
    }
    
}