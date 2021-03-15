import { LoggedInUser } from './../guards/logged-in-user';
import { GetEditInfoService } from './../route-resolver/get-edit-info.service';
import { EditInfoComponent } from './../components/edit-info/edit-info.component';
import { ServerErrorComponent } from '../components/server-error/server-error.component';
import { NotFoundComponent } from '../components/not-found/not-found.component';
import { MainComponent } from '../components/main-component/main.component';
import { FullInfoComponent } from '../components/full-info/full-info.component';
import { LoginComponent } from '../components/login/login.component';
import { RegisterComponent } from '../components/register/register.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {path: 'register', component: RegisterComponent},
  {path: 'login', component: LoginComponent},
  {path: 'edit-info/:id', component: EditInfoComponent, canActivate: [LoggedInUser], resolve: {info: GetEditInfoService}},
  {path: 'full-info/:id', component: FullInfoComponent, canActivate: [LoggedInUser]},
  {path: 'log', component: MainComponent},
  {path: 'server-error', component: ServerErrorComponent},
  {path: '', redirectTo: 'log', pathMatch: 'full'},
  {path: '**', component: NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    scrollPositionRestoration: 'enabled'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
