import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'app-business-list',
  templateUrl: './business-list.component.html',
  styleUrls: ['./business-list.component.scss']
})
export class BusinessListComponent implements OnInit {
  businesses: any[] = [];
  displayedColumns: string[] = ['name', 'description', 'address'];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchBusinesses();
  }

  fetchBusinesses(): void {
    const apiUrl = 'http://localhost:3000/business/businesses';

    this.http.get(apiUrl)
      .pipe(
        catchError((error) => {
          console.error('Error fetching businesses:', error);
          return [];
        })
      )
      .subscribe((data: any) => {
        this.businesses = data;
      });
  }
}
