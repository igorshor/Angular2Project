import {Component, ElementRef, Input, OnChanges, SimpleChange} from "angular2/core";

interface IPicturesCarouselViewModel {
    mainPicture:string;
    pictures:string[];
    otherPictures:string[];
}

@Component({
    selector:'pictures-carousel',
    templateUrl: 'app/components/pictures-carousel/pictures-carousel.component.html',
    styleUrls:['app/components/pictures-carousel/pictures-carousel.component.css']
})

export class PicturesCarouselComponent implements IPicturesCarouselViewModel, OnChanges {
    private vm:IPicturesCarouselViewModel;
    public mainPicture:string;
    @Input() public pictures:string[];
    public otherPictures:string[];

    constructor(private elementRef:ElementRef) {
        this.vm = this;
    }

    public ngOnChanges(changes:{[propertyName: string]: SimpleChange}):any {
        if(changes['pictures']){
            var newVal:string[] = changes['pictures'].currentValue;
            if (this.otherPictures)
                this.otherPictures.length = 0;

            if (newVal && newVal.length > 0) {
                this.mainPicture = newVal[0];

                if (newVal.length === 1) {
                    this.vm.otherPictures.push(newVal[0])
                }
                else {
                    this.vm.otherPictures = newVal.slice(1, newVal.length)
                }
            }
            else {
                this.vm.mainPicture = '';
                this.vm.otherPictures = [];
            }

            (<any>$(this.elementRef)).carousel(0);
        }
    }
}