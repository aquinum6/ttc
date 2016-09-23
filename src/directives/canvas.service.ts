import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/observable/from';
import 'rxjs/add/observable/merge';
import 'rxjs/add/observable/map';
import 'rxjs/add/observable/combineLatest';
import 'rxjs/add/operator/combineLatest';
import 'rxjs/add/operator/mergeAll';

interface IOColor{
    r: number,
    g: number,
    b: number,
    a: number
}

@Injectable()
export class ttcService{

    _size$: BehaviorSubject<number> = new BehaviorSubject(500);
    _mod$: BehaviorSubject<number> = new BehaviorSubject(200);
    _multi$: BehaviorSubject<number> = new BehaviorSubject(2);
    _color$: BehaviorSubject<IOColor> = new BehaviorSubject({
        r: 171,
        g: 71,
        b: 188,
        a: 1
    });
    _bgColor$: BehaviorSubject<IOColor> = new BehaviorSubject({
        r: 0,
        g: 0,
        b: 0,
        a: 1
    });

    _points$: BehaviorSubject<Array<{x: number, y: number}>> =
        Observable.combineLatest(
            this._size$,
            this._mod$)
            .map((val: any) => {
                let [size, mod] = val;
                let theta = Math.PI * 2 / mod;
                let r = size / 2;
                let points: Array<{x: number, y: number}> = [];

                for( let i = 0; i < mod; i++ ){
                    let radius = theta * i + Math.PI;
                    points[i] = {
                        x: r * ( Math.cos(radius) + 1 ),
                        y: r * ( Math.sin(radius) + 1 )
                    }
                }

                return points;

            });

    constructor(){}

    private setBg(c: CanvasRenderingContext2D){

    }

    private showTable(c: CanvasRenderingContext2D){
        this.setBg(c);
    }

    private showTableStepper(c: CanvasRenderingContext2D){

    }

    get size$(): Observable<number>{
        return new Observable<number>(fn => this._size$.subscribe(fn));
    }



    initTTC(c: CanvasRenderingContext2D){
        Observable.from([
            this._size$,
            this._mod$,
            this._multi$,
            this._color$,
            this._bgColor$])
            .mergeAll();
    }



}