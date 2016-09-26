import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'lodash';
declare var _: any;
import 'rxjs/add/observable/combineLatest';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/do';

interface IColorRGB {
    r: number,
    g: number,
    b: number
}
interface IColor{
    r: number,
    g: number,
    b: number,
    a: number
}
interface IColors{
    main: IColor,
    bg: IColor
}

const DEF_SIZE: number = 500; //default size of canvas
const DEF_MOD: number = 300; //default modulo
const DEF_MULTI: number = 2; //default multiplication
const DEF_COLOR: IColor = {
    r: 171,
    g: 71,
    b: 188,
    a: 1
}; //default line color
const DEF_BG: IColor = {
    r: 0,
    g: 0,
    b: 0,
    a: 1
}; //default background color

const MODE_COLOR_EVEN: number = 0;
const MODE_POINTS_EVEN: number = 1;
const MODE_POINTS_STEP: number = 2;
const MODE_PERCENT_STEP: number = 3;

function isIColor(color: any): color is IColor {
    return (<IColor>color).a !== undefined;
}

function isString(color: any): color is string {
    return typeof color === 'string';
}

function getRGB(color: string | IColorRGB | IColor): IColorRGB {
    let c: IColorRGB;

    if(isString(color)){
        let m = color.substr(0, 1) === '#' ? color.substr(1, 6) : color;
        c = {
            r: parseInt(m.substr(0, 2),16),
            g: parseInt(m.substr(2, 2),16),
            b: parseInt(m.substr(4, 2),16)
        };
    } else if (isIColor(color)){
        c = {
            r: color.r,
            g: color.g,
            b: color.b
        };
    } else {
        c = Object.assign({}, color);
    }

    return c;
}



@Injectable()
export class ttcService{

    _size$: BehaviorSubject<number> = new BehaviorSubject(DEF_SIZE);
    _mod$: BehaviorSubject<number> = new BehaviorSubject(DEF_MOD);
    _multi$: BehaviorSubject<number> = new BehaviorSubject(DEF_MULTI);
    _color$: BehaviorSubject<IColors> = new BehaviorSubject({
        main: DEF_COLOR,
        bg: DEF_BG
    });
    _setup$: BehaviorSubject<{
        points: Array<{x: number, y: number}>,
        size: number,
        mod: number
    }> = new BehaviorSubject({points: [], size: DEF_SIZE, mod: DEF_MOD});

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
    private getColor(c: IColor){
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

    private showTableStepper(c: CanvasRenderingContext2D, val: any) {
        let [setup, multi, color] = val;
        let [points, size, mod] = [setup.points, setup.size, setup.mod];

        let mode = 0;
        let diff = {
            r: 255,
            g: 255,
            b: 255,
            a: 1
        };

        let step: IColor = this.getStep(color.main, diff, mod, mode);
        this.setBg(c, size, color);

        for( let i = 0; i < mod; i++ ){
            c.strokeStyle = this.getColor({
                r: Math.round((color.main.r - step.r * i) % 256),
                g: Math.round((color.main.g - step.g * i) % 256),
                b: Math.round((color.main.b - step.b * i) % 256),
                a: ((color.main.a - step.a * i) * 100 % 101) / 100
            });
            c.beginPath();
            this.setPath(c, points[i], points[Math.round(i * multi) % mod]);
            c.stroke();
        }

    }

    initTTC(c: CanvasRenderingContext2D){
        Observable
            .combineLatest(
                this._setup$,
                this._multi$,
                this._color$
            )
            .subscribe((val: any) => {
                //this.showTable(c, val);
                this.showTableStepper(c, val);
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

    get color$(): Observable<IColors>{
        return new Observable<IColors>((fn: any) => this._color$.subscribe(fn));
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

    set color(c: any){
        console.log(c);
        this._color$
            .take(1)
            .map((color: IColors) => _.merge(color, { main: getRGB(c) }))
            .subscribe(e => {
                console.log(e);
                this._color$.next(e);
            });
    }

    private getStep(start, diff, modulo, mode): IColor {
        let step: IColor = {
            r: 0,
            g: 0,
            b: 0,
            a: 0
        };

        switch(mode){
            case MODE_COLOR_EVEN: //color stepper even
                step = {
                    r: (start.r - diff.r) / modulo,
                    g: (start.g - diff.g) / modulo,
                    b: (start.b - diff.b) / modulo,
                    a: (start.a - diff.a) / modulo
                };
                break;
            case MODE_POINTS_EVEN: //points even (need modulo in case of points even bigger than x + step > 255)
                step = {
                    r: diff.r / modulo,
                    g: diff.g / modulo,
                    b: diff.b / modulo,
                    a: diff.a / modulo
                };
                break;
            case MODE_POINTS_STEP: //points step (need modulo)
                step = {
                    r: diff.r,
                    g: diff.g,
                    b: diff.b,
                    a: diff.a
                };
                break;
            case MODE_PERCENT_STEP: //percent step (need modulo)
                step = {
                    r: start.r * diff.r,
                    g: start.g * diff.g,
                    b: start.b * diff.b,
                    a: start.a * diff.a
                };
        }

        return step;
    }








}