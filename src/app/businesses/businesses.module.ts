import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { BusinessListComponent } from '../business-list/business-list.component';
import { HttpClientModule } from '@angular/common/http';

const routes: Routes = [
  {
    path: '',
    component: BusinessListComponent, // Placing the component here
    data: {
      title: 'Business List'
    }
  }
];

@NgModule({
  declarations: [
    BusinessListComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule.forChild(routes)
  ]
})
export class BusinessesModule { }
