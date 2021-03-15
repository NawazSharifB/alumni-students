import { TokenInterceptorService } from './services/interceptors/token-interceptor.service';
import { NgMaterialModule } from './modules/ng-material/ng-material.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './modules/app-routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';

import { AppComponent } from './app.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { FullInfoComponent } from './components/full-info/full-info.component';
import { EditInfoComponent } from './components/edit-info/edit-info.component';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { MainComponent } from './components/main-component/main.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { ServerErrorComponent } from './components/server-error/server-error.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MainLogComponent } from './tables/main-log/main-log.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { SideBlockComponent } from './components/side-block/side-block.component';
import { NavbarComponent } from './components/navbar/navbar.component';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    FullInfoComponent,
    EditInfoComponent,
    LoginFormComponent,
    MainComponent,
    NotFoundComponent,
    ServerErrorComponent,
    MainLogComponent,
    SideBlockComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    NgMaterialModule,
    ReactiveFormsModule,
    FormsModule,
    FlexLayoutModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: TokenInterceptorService, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
