System.register(['../bar/bar.component'], function(exports_1) {
    var bar_component_1;
    var RouteDefinitions;
    return {
        setters:[
            function (bar_component_1_1) {
                bar_component_1 = bar_component_1_1;
            }],
        execute: function() {
            exports_1("RouteDefinitions", RouteDefinitions = [
                {
                    path: '/bar',
                    name: 'Bar',
                    component: bar_component_1.BarComponent,
                    useAsDefault: true
                }
            ]);
        }
    }
});
//# sourceMappingURL=route-definitions.js.map