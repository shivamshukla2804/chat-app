import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout.component';
import { DASHBOARD, CHAT } from '../../constant/routes';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', redirectTo: CHAT.path, pathMatch: 'full' },
      {
        path: CHAT.path,
        loadChildren: () =>
          import('./chat/chat.module').then((m) => m.ChatModule),
      },
    ],
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LayoutRoutingModule {}
