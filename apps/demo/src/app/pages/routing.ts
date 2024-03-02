import {Routes} from '@angular/router';

const Routing: Routes = [
  {
    path: 'dashboard',
    loadChildren: () =>
      import('./dashboard/dashboard.module').then((m) => m.DashboardModule),
  },
  {
    path: 'widget-types',
    loadChildren: () =>
      import('../features/widget-types/widget-types.module').then((m) => m.WidgetTypesModule),
  },
  {
    path: 'builder',
    loadChildren: () =>
      import('./builder/builder.module').then((m) => m.BuilderModule),
  },
  {
    path: 'crafted/pages/wizards',
    loadChildren: () =>
      import('../features/wizards/wizards.module').then((m) => m.WizardsModule),
  },
  {
    path: 'crafted/pages/profile',
    loadChildren: () =>
      import('../features/profile/profile.module').then((m) => m.ProfileModule),
  },

  {
    path: 'crafted/pages/wizards',
    loadChildren: () =>
      import('../features/wizards/wizards.module').then((m) => m.WizardsModule),
  },
  {
    path: 'crafted/widgets',
    loadChildren: () =>
      import('../features/widgets-examples/widgets-examples.module').then(
        (m) => m.WidgetsExamplesModule
      ),
  },
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: 'error/404',
  },

];

export { Routing };
