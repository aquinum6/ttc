import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { ttcService } from './canvas.service';
import { Observable } from 'rxjs/Observable';

@Component({
    moduleId: module.id,
    selector: 'ttc',
    templateUrl: 'canvas.comp.html',

})
export class ttcComponent implements AfterViewInit{

    @ViewChild("cnvs") _canvas: any;

    _size$: Observable<number>;

    constructor(private _ttcService: ttcService){
        this._size$ = _ttcService.size$;
    }

    ngAfterViewInit(): void {
        let canvas = this._canvas.nativeElement;
        this._ttcService.initTTC(canvas.getContext('2d'));
    }
}