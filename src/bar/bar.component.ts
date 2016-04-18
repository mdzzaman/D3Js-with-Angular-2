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
// working for server data
export class BarComponent implements OnInit {
    title = 'Bar Chart';
    private bar1: any;
    private bar2: any;

    constructor(private _dataService: DataService) {

    }

    ngOnInit() {
        this.bar1 = {
            numberOfLayers: 4,
            numberOfSamples: 38,
            margin: { top: 40, right: 10, bottom: 20, left: 10 },
            width: 960,
            height: 200
        };
        this._dataService.getServerData(4, 39).then(dataList => {
            this.chartOne(dataList);
        }
        );

        this.bar2 = {
            numberOfLayers: 4,
            numberOfSamples: 20,
            margin: { top: 40, right: 10, bottom: 20, left: 10 },
            width: 960,
            height: 200
        };

        this._dataService.getServerData(4, 20).then(dataList => {
            this.chartTwo(dataList)
        }
        );
        
       
    }

    chartOne(dataList:any[]) {
        this.bar1.dataBind(dataList, this.bar1);
    }

    chartTwo(dataList: any[]) {
        this.bar2.dataBind(dataList, this.bar2);
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
