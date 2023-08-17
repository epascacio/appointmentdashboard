import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { BusinessListComponent } from '../business-list/business-list.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

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
    FormsModule, 
    ReactiveFormsModule,
    CommonModule,
    HttpClientModule,
    RouterModule.forChild(routes)
  ]
})
export class BusinessesModule { }
