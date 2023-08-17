import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'; // Add this import
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-service-list',
  templateUrl: './service-list.component.html',
  styleUrls: ['./service-list.component.scss']
})


export class ServiceListComponent implements OnInit {

  addForm!: FormGroup; // Declare the FormGroup
  editForm!: FormGroup; // Declare the FormGroup

  services: any[] = [];

  @ViewChild('addModal') addModal: any;
  @ViewChild('editModal') editModal: any;
  editedService: any = {};

  constructor(
    private http: HttpClient,
    private modalService: NgbModal,
    private formBuilder: FormBuilder // Inject the FormBuilder
  ) {}

  ngOnInit(): void {
    this.fetchServices();
    this.initializeAddForm();
    this.initializeEditForm(); 
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

  openAddModal() {
    this.modalService.open(this.addModal);
  }

  initializeAddForm() {
    this.addForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: [''],
      duration: ['', Validators.required],
      price: ['', Validators.required]
    });
  }

  onAddService() {
    if (this.addForm.valid) {
      const newService = this.addForm.value;

      const apiUrl = 'http://localhost:3000/service/services';

      this.http.post(apiUrl, newService)
        .pipe(
          catchError((error) => {
            console.error('Error adding service:', error);
            return [];
          })
        )
        .subscribe((response: any) => {
          this.services.push(response);
          this.modalService.dismissAll(); // Close the modal
        });
    }
  }

  openEditModal(service: any) {
    this.editedService = { ...service };
    this.populateEditForm(); // Call the method to populate the form
    this.modalService.open(this.editModal);
  }

  onEditService() {
    if (this.editForm.valid) {
      const updatedService = {
        ...this.editedService,
        ...this.editForm.value
      };

      const apiUrl = `http://localhost:3000/service/services/${this.editedService._id}`;

      this.http.put(apiUrl, updatedService)
        .pipe(
          catchError((error) => {
            console.error('Error editing service:', error);
            return [];
          })
        )
        .subscribe((response: any) => {
          const index = this.services.findIndex(s => s._id === response._id);
          if (index !== -1) {
            this.services[index] = response;
          }
          this.modalService.dismissAll(); // Close the modal
        });
    }
  }

  initializeEditForm() {
    this.editForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: [''],
      duration: ['', Validators.required],
      price: ['', Validators.required]
    });

    
  }

  populateEditForm() {
    this.editForm.patchValue({
      name: this.editedService.name,
      description: this.editedService.description,
      duration: this.editedService.duration,
      price: this.editedService.price
    });
  }



  onSave() {
    const apiUrl = 'http://localhost:3000/service/services';
  
    fetch(`${apiUrl}/${this.editedService._id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.editedService)
    })
      .then(response => response.json())
      .then(updatedService => {
        const index = this.services.findIndex(s => s._id === updatedService._id);
        if (index !== -1) {
          this.services[index] = updatedService;
        }
      })
      .catch(error => {
        console.error('Error editing service:', error);
      });
  
    // Manually close the modal (if you're not using a modal library like ng-bootstrap)
    const editModal = document.getElementById('editModal');
    if (editModal) {
      editModal.style.display = 'none';
    }
  }

  deleteService(service: any) {
    const apiUrl = `http://localhost:3000/service/services/${service._id}`;
    console.log(service);
    this.http.delete(apiUrl)
      .pipe(
        catchError((error) => {
          console.error('Error deleting service:', error);
          return [];
        })
      )
      .subscribe(() => {
        this.services = this.services.filter(s => s._id !== service._id);
      });
  }
}
