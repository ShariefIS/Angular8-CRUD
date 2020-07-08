import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { DataTablesModule } from 'angular-datatables'
import { HttpClientModule } from '@angular/common/http'
import { AppComponent } from './app.component';
import { CrudComponent } from './crud/crud.component';
import { CrudDetailComponent } from './crud/crud-detail/crud-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    CrudComponent,
    CrudDetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DataTablesModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
