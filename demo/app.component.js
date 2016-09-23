import { Component } from '@angular/core';
import 'rxjs/add/operator/take';
import { ttcService } from '../src';
export var AppComponent = (function () {
    function AppComponent(_ttcs) {
        this._ttcs = _ttcs;
    }
    AppComponent.prototype.setMulti = function (e) {
        this._ttcs.multi = e;
    };
    AppComponent.prototype.setModulo = function (e) {
        this._ttcs.mod = e;
    };
    AppComponent.decorators = [
        { type: Component, args: [{
                    moduleId: module.id,
                    selector: 'my-app',
                    templateUrl: './app.component.html'
                },] },
    ];
    /** @nocollapse */
    AppComponent.ctorParameters = [
        { type: ttcService, },
    ];
    return AppComponent;
}());
//# sourceMappingURL=app.component.js.map