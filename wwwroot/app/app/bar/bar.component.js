System.register(['angular2/core', './bar.directive', './data.service'], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, bar_directive_1, data_service_1;
    var BarComponent;
    function change(value, barChart) {
        clearTimeout(barChart.timeout);
        if (value === "grouped")
            transitionGrouped(barChart);
        else
            transitionStacked(barChart);
    }
    function transitionGrouped(barChart) {
        barChart.y.domain([0, barChart.yGroupMax]);
        barChart.rect.transition()
            .duration(500)
            .delay(function (d, i) { return i * 10; })
            .attr("x", function (d, i, j) { return barChart.x(d.x) + barChart.x.rangeBand() / barChart.n * j; })
            .attr("width", barChart.x.rangeBand() / barChart.n)
            .transition()
            .attr("y", function (d) { return barChart.y(d.y); })
            .attr("height", function (d) { return barChart.height - barChart.y(d.y); });
    }
    function transitionStacked(barChart) {
        barChart.y.domain([0, barChart.yStackMax]);
        barChart.rect.transition()
            .duration(500)
            .delay(function (d, i) { return i * 10; })
            .attr("y", function (d) { return barChart.y(d.y0 + d.y); })
            .attr("height", function (d) { return barChart.y(d.y0) - barChart.y(d.y0 + d.y); })
            .transition()
            .attr("x", function (d) { return barChart.x(d.x); })
            .attr("width", barChart.x.rangeBand());
    }
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (bar_directive_1_1) {
                bar_directive_1 = bar_directive_1_1;
            },
            function (data_service_1_1) {
                data_service_1 = data_service_1_1;
            }],
        execute: function() {
            BarComponent = (function () {
                function BarComponent(_dataService) {
                    this._dataService = _dataService;
                    this.title = 'Bar Chart';
                }
                BarComponent.prototype.ngOnInit = function () {
                    this.chartOne();
                    this.chartTwo();
                };
                BarComponent.prototype.chartOne = function () {
                    this.bar1 = {
                        numberOfLayers: 4,
                        numberOfSamples: 15,
                        data: this._dataService.getData(4, 15),
                        margin: { top: 40, right: 10, bottom: 20, left: 10 },
                        width: 960,
                        height: 200
                    };
                };
                BarComponent.prototype.chartTwo = function () {
                    this.bar2 = {
                        numberOfLayers: 4,
                        numberOfSamples: 20,
                        data: this._dataService.getData(4, 20),
                        margin: { top: 40, right: 10, bottom: 20, left: 10 },
                        width: 960,
                        height: 200
                    };
                };
                BarComponent.prototype.chartChange = function (value) {
                    change(value, this.bar1.chartObj);
                };
                BarComponent.prototype.chartChange2 = function (value) {
                    change(value, this.bar2.chartObj);
                };
                BarComponent = __decorate([
                    core_1.Component({
                        selector: 'bar-chart-component',
                        templateUrl: 'app/bar/view/bar.component.html',
                        styleUrls: ['app/bar/style/style.css'],
                        directives: [bar_directive_1.BarDirective],
                        providers: [data_service_1.DataService]
                    }), 
                    __metadata('design:paramtypes', [data_service_1.DataService])
                ], BarComponent);
                return BarComponent;
            })();
            exports_1("BarComponent", BarComponent);
        }
    }
});
//# sourceMappingURL=bar.component.js.map