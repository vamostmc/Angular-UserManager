import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormComponent } from './form/form.component';
import { UserComponent } from './user/user.component';
import { SuccessComponent } from './success/success.component';
import { FavoriteComponent } from './favorite/favorite.component';

const routes: Routes = [
  { path : 'home', component: FormComponent },
  { path : 'add', component: UserComponent },
  { path : 'edit', component: UserComponent },
  { path : 'edit/:id', component: UserComponent },
  { path : 'success', component: SuccessComponent },
  { path : 'favorite',component: FavoriteComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
