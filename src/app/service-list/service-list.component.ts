import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'app-service-list',
  templateUrl: './service-list.component.html',
  styleUrls: ['./service-list.component.scss']
})
export class ServiceListComponent implements OnInit {
  services: any[] = [];
  displayedColumns: string[] = ['name', 'description', 'duration', 'price'];

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.fetchServices();
  }

  fetchServices(): void {
    const apiUrl = 'http://localhost:3000/service/services';

    this.http.get(apiUrl)
      .pipe(
        catchError((error) => {
          console.error('Error fetching services:', error);
          return [];
        })
      )
      .subscribe((data: any) => {
        this.services = data;
      });
  }
}
