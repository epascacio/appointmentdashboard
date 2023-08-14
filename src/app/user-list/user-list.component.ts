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

  defaultImageUrlBase = 'https://coreui.io/demos/bootstrap/4.2/free/assets/img/avatars/';

  getRandomImageNumber(): number {
    return Math.floor(Math.random() * 6) + 1; // Generates a random number between 1 and 6
  }

  fetchUsers(): void {
    const apiUrl = 'http://localhost:3000/user/users';

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
