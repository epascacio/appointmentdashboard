import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-business-list',
  templateUrl: './business-list.component.html',
  styleUrls: ['./business-list.component.scss'],
})
export class BusinessListComponent implements OnInit {
  editForm: FormGroup;

  @ViewChild('businessModal') businessModal!: TemplateRef<any>;
  businesses: any[] = [];
  displayedColumns: string[] = [
    'name',
    'description',
    'address',
    'industry',
    'actions',
  ];
  isEditing: boolean = false;
  editedBusiness: any = {};
  newBusiness?:any = {};
  private modalRef: NgbModalRef | undefined;

  constructor(private http: HttpClient, private modalService: NgbModal, private fb: FormBuilder) {
    this.editForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      address: ['', Validators.required],
      associatedIndustry: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.fetchBusinesses();
  }

  fetchBusinesses(): void {
    const apiUrl = 'http://localhost:3000/business/businesses';

    this.http
      .get(apiUrl)
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

  openAddBusinessModal(): void {
    this.isEditing = false;
    this.newBusiness = {};
    this.modalRef = this.modalService.open(this.businessModal);
  }

  openEditBusinessModal(business: any): void {
    this.isEditing = true;
    this.editedBusiness = { ...business };
    this.modalRef = this.modalService.open(this.businessModal);
    console.log(this.editedBusiness);
    // Load business data into the form controls
    this.editForm.patchValue({
      name: this.editedBusiness.name,
      description: this.editedBusiness.description,
      address: this.editedBusiness.address,
      associatedIndustry: this.editedBusiness.associatedIndustry,
    });
  }

  saveBusiness(): void {
    if (this.isEditing) {
      console.log(this.editedBusiness)
      const apiUrl = `http://localhost:3000/business/businesses/${this.editedBusiness._id}`;
      const editedBusiness = {
        "_id":this.editedBusiness._id,
        "name": this.editForm.value.name,
        "description": this.editForm.value.description,
        "associatedServices": [],
        "address": this.editForm.value.address,
        "avgRating": 0,
        "imageUrl": "https://cdn.iconscout.com/icon/premium/png-512-thumb/company-adress-office-location-33816.png?f=avif&w=256",
        "contactPhone": "555-123-4567",
        "contactEmail": "test@example.com",
        "associatedIndustry": this.editForm.value.associatedIndustry,
      }
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      };
      this.http.put(apiUrl, editedBusiness,httpOptions)
      .pipe(
        catchError(error => {
          console.error('Error updating business:', error);
          return of(null);
        })
      )
      .subscribe((updatedBusinessData: any) => {
        if (updatedBusinessData) {
          const index = this.businesses.findIndex(b => b.id === this.editedBusiness._id);
          if (index !== -1) {
            this.businesses[index] = updatedBusinessData;
          }
        }

        this.modalRef?.close(); // Close the modal
      });
    } 
    else {
      const apiUrl = 'http://localhost:3000/business/businesses';
      const newBusiness = {
        "name": this.editForm.value.name,
        "description": this.editForm.value.description,
        "associatedServices": [],
        "address": this.editForm.value.address,
        "avgRating": 0,
        "imageUrl": "https://cdn.iconscout.com/icon/premium/png-512-thumb/company-adress-office-location-33816.png?f=avif&w=256",
        "contactPhone": "555-123-4567",
        "contactEmail": "test@example.com",
        "associatedIndustry": this.editForm.value.associatedIndustry,
      }
      console.log(newBusiness);
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      };
      this.http.post(apiUrl, newBusiness, httpOptions)
        .pipe(
          catchError(error => {
            console.error('Error adding business:', error);
            return of(null);
          })
        )
        .subscribe((newBusiness: any) => {
          if (newBusiness) {
            this.businesses.push(newBusiness);
          }
          this.modalRef?.close(); // Close the modal
        });
      
    }
    if (this.modalRef) {
      window.location.reload();
      this.modalRef.close();
    }
  }

  deleteBusiness(business: any): void {
    const apiUrl = `http://localhost:3000/business/businesses/${business._id}`;
    this.http
      .delete(apiUrl)
      .pipe(
        catchError((error) => {
          console.error('Error deleting business:', error);
          return of(null); 
        })
      )
      .subscribe(() => {
        this.businesses = this.businesses.filter((b) => b.id !== business._id);
        window.location.reload();
      });
  }
}
