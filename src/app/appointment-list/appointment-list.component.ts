import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'app-appointment-list',
  templateUrl: './appointment-list.component.html',
  styleUrls: ['./appointment-list.component.scss']
})
export class AppointmentListComponent implements OnInit {
  appointments: any[] = [];
  displayedColumns: string[] = ['dateTime', 'service', 'customer'];

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.fetchAppointments();
  }

  fetchAppointments(): void {
    const apiUrl = 'http://localhost:3000/appointment/appointments';

    this.http.get(apiUrl)
      .pipe(
        catchError((error) => {
          console.error('Error fetching appointments:', error);
          return [];
        })
      )
      .subscribe((data: any) => {
        this.appointments = data;
      });
  }
}
