import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  users: any[] = [];
  displayedColumns: string[] = ['name', 'email'];

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.fetchUsers();
  }

  fetchUsers(): void {
    const apiUrl = 'https://tasksyncapi-4c8b005350c1.herokuapp.com/user/users';

    this.http.get(apiUrl)
      .pipe(
        catchError((error) => {
          console.error('Error fetching users:', error);
          return [];
        })
      )
      .subscribe((data: any) => {
        this.users = data;
      });
  }
}
