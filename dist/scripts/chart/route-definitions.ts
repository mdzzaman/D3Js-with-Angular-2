import { RouteDefinition } from 'angular2/router';
import { BarComponent} from '../bar/bar.component';

export const RouteDefinitions: RouteDefinition[] = [
    {
        path: '/bar',
        name: 'Bar',
        component: BarComponent,
        useAsDefault: true
    }
];