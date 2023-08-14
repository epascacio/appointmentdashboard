import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppointmentListComponent } from '../appointment-list/appointment-list.component';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

const routes: Routes = [
  {
    path: '',
    component: AppointmentListComponent, // Placing the component here
    data: {
      title: 'Appointment List'
    }
  }
];

@NgModule({
  declarations: [
    AppointmentListComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule.forChild(routes)
  ]
})
export class AppointmentsModule { }
