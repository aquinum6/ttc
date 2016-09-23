import { Component, ViewChild, AfterViewInit } from '@angular/core';

@Component({
    moduleId: module.id,
    selector: 'ttc',
    templateUrl: 'canvas.comp.html',

})
export class ttcComponent implements AfterViewInit{


    @ViewChild("cnvs") _canvas;

    _c: any;
    _size: number = 800;

    _mod: number = 200;
    _multi: number = 34;

    _points: Array<{x: number, y: number}> = [];

    constructor(){}

    ngAfterViewInit(): void {
        let canvas = this._canvas.nativeElement;
        this._c = canvas.getContext('2d');

        console.log(this._c);

        this.calculatePoints();
        this.showTable();
    }

    calculatePoints(){
        let theta = Math.PI * 2 / this._mod;
        let r = this._size / 2;
        this._points = [];

        for( let i = 0; i < this._mod; i++ ){
            this._points[i] = {
                x: r * Math.cos(theta * i + Math.PI) + r,
                y: r * Math.sin(theta * i + Math.PI) + r
            };
        }
    }

    showTable(){
        this._c.fillStyle = '#000';
        this._c.fillRect(0,0, this._size, this._size);
        this._c.strokeStyle = 'rgba(255,0,0,.6)';
        let r = Math.round(255 / this._mod);
        this._c.lineWidth = 1;

        for( let i = 1; i < this._mod; i++ ){
            let n = Math.round(i * this._multi) % this._mod;
            this._c.beginPath();
            this._c.strokeStyle = 'rgba('+ ((r * i) % 256) +',0,0,1)';

            this._c.moveTo(
                this._points[i].x,
                this._points[i].y
            );

            this._c.lineTo(
                this._points[n].x,
                this._points[n].y
            );
            this._c.stroke();
        }

    }


}