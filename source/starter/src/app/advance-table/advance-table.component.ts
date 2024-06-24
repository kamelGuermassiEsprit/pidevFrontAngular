import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { DatatableComponent, SelectionType } from '@swimlane/ngx-datatable';
import {
  UntypedFormGroup,
  UntypedFormBuilder,
  UntypedFormControl,
  Validators,
} from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import { HttpClient } from '@angular/common/http';

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
  constructor(private http: HttpClient) {}
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
}

