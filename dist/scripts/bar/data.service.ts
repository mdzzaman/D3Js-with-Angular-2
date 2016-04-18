import {Injectable} from 'angular2/core';
declare var d3: any;

@Injectable()
export class DataService {
    private stack: any;
    constructor() {
        this.stack = d3.layout.stack();
    }
    getData(numberOfLayer: number, numberOfSamples: number) {
        var bumpLayer = this.bumpLayer;
        var data = this.stack(d3.range(numberOfLayer).map(function () { return bumpLayer(numberOfSamples, .1); }));
        return data;
    }
    getServerData(numberOfLayer: number, numberOfSamples: number) {
        var bumpLayer = this.bumpLayer;
        var data = this.stack(d3.range(numberOfLayer).map(function () { return bumpLayer(numberOfSamples, .1); }));
        return Promise.resolve(data);
    }

    bumpLayer(n, o) {
        function bump(a) {
            var x = 1 / (.1 + Math.random()),
                y = 2 * Math.random() - .5,
                z = 10 / (.1 + Math.random());
            for (var i = 0; i < n; i++) {
                var w = (i / n - y) * z;
                a[i] += x * Math.exp(-w * w);
            }
        }

        var a = [], i;
        for (i = 0; i < n; ++i) a[i] = o + o * Math.random();
        for (i = 0; i < 5; ++i) bump(a);
        return a.map(function (d, i) { return { x: i, y: Math.max(0, d) }; });
    }
}

