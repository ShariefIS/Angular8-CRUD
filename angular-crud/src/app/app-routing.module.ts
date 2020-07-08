import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CrudComponent } from './crud/crud.component';
import { CrudDetailComponent } from './crud/crud-detail/crud-detail.component';


const routes: Routes = [
  { path: 'crud', component: CrudComponent },
  { path: 'crud/:id', component: CrudDetailComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
