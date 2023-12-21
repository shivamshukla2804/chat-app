import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ACCOUNT, LAYOUT } from './constant/routes';
import { AuthGuard } from './services/authGuard/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: ACCOUNT.path, pathMatch: 'full' },
  {
    path: ACCOUNT.path,
    loadChildren: () =>
      import('./modules/account/account.module').then((m) => m.AccountModule),
  },
  {
    path: LAYOUT.path,
    loadChildren: () =>
      import('./modules/layout/layout.module').then((m) => m.LayoutModule),
      // canActivate:[AuthGuard]
  },
  { path: '**', redirectTo: ACCOUNT.path },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
