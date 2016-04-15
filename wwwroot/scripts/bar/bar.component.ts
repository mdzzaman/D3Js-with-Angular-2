import { Component, OnInit }       from 'angular2/core';
import { BarDirective } from './bar.directive';
import { DataService } from './data.service'

@Component({
    selector: 'bar-chart-component',
    templateUrl: 'app/bar/view/bar.component.html',
    styleUrls: ['app/bar/style/style.css'],
    directives: [BarDirective],
    providers: [DataService]
})

export class BarComponent implements OnInit {
    title = 'Bar Chart';
    private bar1: any;
    private bar2: any;

    constructor(private _dataService: DataService) {

    }

    ngOnInit() {
        this.chartOne();
        this.chartTwo();
    }

    chartOne() {
        this.bar1 = {
            numberOfLayers: 4,
            numberOfSamples: 15,
            data: this._dataService.getData(4, 15),
            margin: { top: 40, right: 10, bottom: 20, left: 10 },
            width: 960,
            height: 200
        };
    }

    chartTwo() {
        this.bar2 = {
            numberOfLayers: 4,
            numberOfSamples: 20,
            data: this._dataService.getData(4, 20),
            margin: { top: 40, right: 10, bottom: 20, left: 10 },
            width: 960,
            height: 200
        };
    }

    chartChange(value: string) {
        change(value, this.bar1.chartObj);
    }
    chartChange2(value: string) {
        change(value, this.bar2.chartObj);
    }
}

function change(value: string, barChart) {
    clearTimeout(barChart.timeout);
    if (value === "grouped") transitionGrouped(barChart);
    else transitionStacked(barChart);
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
