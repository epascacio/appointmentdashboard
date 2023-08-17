import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'app-trade-list',
  templateUrl: './trade-list.component.html',
  styleUrls: ['./trade-list.component.scss']
})
export class TradeListComponent implements OnInit {
  trades: any[] = [];
  displayedColumns: string[] = ['requestingCustomer', 'requestedTimeSlot', 'status'];

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.fetchTrades();
  }

  fetchTrades(): void {
    const apiUrl = 'http://localhost:3000/timeSlotTrade/time-slot-trades';

    this.http.get(apiUrl)
      .pipe(
        catchError((error) => {
          console.error('Error fetching trades:', error);
          return [];
        })
      )
      .subscribe((data: any) => {
        this.trades = data;
      });
  }
}
