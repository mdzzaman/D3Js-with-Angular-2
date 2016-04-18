System.register(['angular2/core'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1;
    var DataService;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            DataService = (function () {
                function DataService() {
                    this.stack = d3.layout.stack();
                }
                DataService.prototype.getData = function (numberOfLayer, numberOfSamples) {
                    var bumpLayer = this.bumpLayer;
                    var data = this.stack(d3.range(numberOfLayer).map(function () { return bumpLayer(numberOfSamples, .1); }));
                    return data;
                };
                DataService.prototype.getServerData = function (numberOfLayer, numberOfSamples) {
                    var bumpLayer = this.bumpLayer;
                    var data = this.stack(d3.range(numberOfLayer).map(function () { return bumpLayer(numberOfSamples, .1); }));
                    return Promise.resolve(data);
                };
                DataService.prototype.bumpLayer = function (n, o) {
                    function bump(a) {
                        var x = 1 / (.1 + Math.random()), y = 2 * Math.random() - .5, z = 10 / (.1 + Math.random());
                        for (var i = 0; i < n; i++) {
                            var w = (i / n - y) * z;
                            a[i] += x * Math.exp(-w * w);
                        }
                    }
                    var a = [], i;
                    for (i = 0; i < n; ++i)
                        a[i] = o + o * Math.random();
                    for (i = 0; i < 5; ++i)
                        bump(a);
                    return a.map(function (d, i) { return { x: i, y: Math.max(0, d) }; });
                };
                DataService = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [])
                ], DataService);
                return DataService;
            }());
            exports_1("DataService", DataService);
        }
    }
});
//# sourceMappingURL=data.service.js.map