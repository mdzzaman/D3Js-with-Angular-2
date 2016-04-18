System.register(['angular2/core', './chart.obj.service'], function(exports_1, context_1) {
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
    var core_1, chart_obj_service_1;
    var BarDirective;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (chart_obj_service_1_1) {
                chart_obj_service_1 = chart_obj_service_1_1;
            }],
        execute: function() {
            BarDirective = (function () {
                function BarDirective(el) {
                    this._el = el.nativeElement;
                }
                BarDirective.prototype.ngOnInit = function () {
                    this.barChartOption.dataBind = this.dataBind;
                    this.barChartOption._el = this._el;
                };
                BarDirective.prototype.dataBind = function (data, chartObj) {
                    this.barChart = new chart_obj_service_1.ChartObjService().getObj();
                    var barChart = this.barChart;
                    chartObj.chartObj = barChart;
                    var numberOfSamples = chartObj.numberOfSamples, layers = data, margin = chartObj.margin, width = chartObj.width - margin.left - margin.right;
                    barChart.numberOfLayers = chartObj.numberOfLayers;
                    barChart.height = chartObj.height - margin.top - margin.bottom;
                    barChart.yStackMax = d3.max(layers, function (layer) { return d3.max(layer, function (d) { return d.y0 + d.y; }); });
                    barChart.yGroupMax = d3.max(layers, function (layer) { return d3.max(layer, function (d) { return d.y; }); });
                    barChart.x = d3.scale.ordinal()
                        .domain(d3.range(numberOfSamples))
                        .rangeRoundBands([0, width], .08);
                    barChart.y = d3.scale.linear()
                        .domain([0, barChart.yStackMax])
                        .range([barChart.height, 0]);
                    var color = d3.scale.linear()
                        .domain([0, barChart.numberOfLayers - 1])
                        .range(["#aad", "#556"]);
                    var xAxis = d3.svg.axis()
                        .scale(barChart.x)
                        .tickSize(0)
                        .tickPadding(6)
                        .orient("bottom");
                    var svg = d3.select(chartObj._el).append("svg")
                        .attr("width", width + margin.left + margin.right)
                        .attr("height", barChart.height + margin.top + margin.bottom)
                        .append("g")
                        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
                    var layer = svg.selectAll(".layer")
                        .data(layers)
                        .enter().append("g")
                        .attr("class", "layer")
                        .style("fill", function (d, i) { return color(i); });
                    barChart.rect = layer.selectAll("rect")
                        .data(function (d) { return d; })
                        .enter().append("rect")
                        .attr("x", function (d) { return barChart.x(d.x); })
                        .attr("y", barChart.height)
                        .attr("width", barChart.x.rangeBand())
                        .attr("height", 0);
                    barChart.rect.transition()
                        .delay(function (d, i) { return i * 10; })
                        .attr("y", function (d) { return barChart.y(d.y0 + d.y); })
                        .attr("height", function (d) { return barChart.y(d.y0) - barChart.y(d.y0 + d.y); });
                    svg.append("g")
                        .attr("class", "x axis")
                        .attr("transform", "translate(0," + barChart.height + ")")
                        .call(xAxis);
                };
                __decorate([
                    core_1.Input('chartBar'), 
                    __metadata('design:type', Object)
                ], BarDirective.prototype, "barChartOption", void 0);
                BarDirective = __decorate([
                    core_1.Directive({
                        selector: '[chartBar]'
                    }), 
                    __metadata('design:paramtypes', [core_1.ElementRef])
                ], BarDirective);
                return BarDirective;
            }());
            exports_1("BarDirective", BarDirective);
        }
    }
});
//# sourceMappingURL=bar.directive.js.map