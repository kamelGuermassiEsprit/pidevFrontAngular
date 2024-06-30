import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { DatatableComponent, SelectionType } from '@swimlane/ngx-datatable';
import {
  UntypedFormGroup,
  UntypedFormBuilder,
  UntypedFormControl,
  Validators,
  NgForm,
} from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import { HttpClient } from '@angular/common/http';
import { ListingService } from '../services/listing.service';


@Component({
  selector: 'app-advance-table',
  templateUrl: './advance-table.component.html',
  styleUrls: ['./advance-table.component.sass'],
  providers: [ToastrService],
})
export class AdvanceTableComponent implements OnInit {

  listing = {
    title: '',
    description: '',
    address: '',
    amneties: '',
    availability: '',
    houseRules: '',
    photos: []
  };
  selectFiles(event: any): void {
    if (event.target.files.length > 0) {
      this.selectedFiles = Array.from(event.target.files);
    }
  }
  selectedFiles: File[] = [];
  constructor(private http: HttpClient, private listingService: ListingService) {}
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
 

  onSubmit(form: any): void {
    if (form.invalid) {
      return;
    }

    const formData = new FormData();
    formData.append('title', this.listing.title);
    formData.append('description', this.listing.description);
    formData.append('address', this.listing.address);
    formData.append('amneties', this.listing.amneties);
    formData.append('availability', this.listing.availability);
    formData.append('houseRules', this.listing.houseRules);

    for (let i = 0; i < this.selectedFiles.length; i++) {
      formData.append('photos', this.selectedFiles[i]);
    }

    this.listingService.addListing(formData).subscribe(
      response => {
        console.log('Listing added successfully:', response);
        // Reset form and selected files
        form.resetForm();
        this.selectedFiles = [];
        this.listing = {title: '',
          description: '',
          address: '',
          amneties: '',
          availability: '',
          houseRules: '',
          photos: []};
      },
      error => {
        console.error('Error adding listing:', error);
      }
    );
  }
}

