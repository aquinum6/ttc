import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/observable/combineLatest';
import 'rxjs/add/operator/map';

interface IOColor{
    r: number,
    g: number,
    b: number,
    a: number
}

interface IOColors{
    main: IOColor,
    bg: IOColor
}

@Injectable()
export class ttcService{

    _size$: BehaviorSubject<number> = new BehaviorSubject(500);
    _mod$: BehaviorSubject<number> = new BehaviorSubject(300);
    _multi$: BehaviorSubject<number> = new BehaviorSubject(2);
    _color$: BehaviorSubject<IOColors> = new BehaviorSubject({
        main: {
            r: 171,
            g: 71,
            b: 188,
            a: 1
        },
        bg: {
            r: 0,
            g: 0,
            b: 0,
            a: 1
        }
    });
    _setup$: BehaviorSubject<{
        points: Array<{x: number, y: number}>,
        size: number,
        mod: number
    }> = new BehaviorSubject({points: [], size: 500, mod: 300});

    constructor(){
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

                return {
                    points: points,
                    size: size,
                    mod: mod
                };
            })
            .subscribe(setup => this._setup$.next(setup));
    }

    //noinspection JSMethodCanBeStatic
    private getColor(c: IOColor){
        return 'rgba('+ c.r + ',' + c.g + ',' + c.b + ',' + c.a + ')';
    }

    private setBg(c: CanvasRenderingContext2D, size: any, color: any){
        c.fillStyle = this.getColor(color.bg);
        c.fillRect(0,0, size, size);
        c.strokeStyle = this.getColor(color.main);
        c.lineWidth = 1;
    }

    //noinspection JSMethodCanBeStatic
    private setPath(c: CanvasRenderingContext2D, start: {x: number, y: number}, end: {x: number, y:number}){
        c.moveTo(
            start.x,
            start.y
        );

        c.lineTo(
            end.x,
            end.y
        );
    }

    private showTable(c: CanvasRenderingContext2D, val: any){
        let [setup, multi, color] = val;
        let [points, size, mod] = [setup.points, setup.size, setup.mod];
        this.setBg(c, size, color);
        c.beginPath();
        for( let i = 0; i < mod; i++ ){
            this.setPath(c, points[i], points[Math.round(i * multi) % mod]);
        }
        c.stroke();
    }

    initTTC(c: CanvasRenderingContext2D){
        Observable
            .combineLatest(
                this._setup$,
                this._multi$,
                this._color$
            )
            .subscribe((val: any) => {
                console.log(val);
                //let [setup, multi, color] = val;
                this.showTable(c, val);
            })

    }

    get size$(): Observable<number>{
        return new Observable<number>((fn: any) => this._size$.subscribe(fn));
    }

    get mod$(): Observable<number>{
        return new Observable<number>((fn: any) => this._mod$.subscribe(fn));
    }

    get multi$(): Observable<number>{
        return new Observable<number>((fn: any) => this._multi$.subscribe(fn));
    }

    set size(size: number){
        this._size$.next(size);
    }

    set mod(mod: number){
        this._mod$.next(mod);
    }

    set multi(multi: number){
        this._multi$.next(multi);
    }

}