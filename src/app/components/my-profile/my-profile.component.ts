import { MatIconModule } from '@angular/material/icon';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ApiService } from '../../service/api.service';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
@Component({
  selector: 'app-my-profile',
  standalone: true,
  imports: [MatIconModule,RouterLink,ReactiveFormsModule],
  templateUrl: './my-profile.component.html',
  styleUrl: './my-profile.component.scss'
})
export class MyProfileComponent implements OnInit{
  name = localStorage.getItem('user');
  myform!: FormGroup;
  formData: FormData = new FormData();
  id : any;
  data : any;
  datas : any;
  constructor(private api:ApiService,private formBuilder:FormBuilder,private activedroute : ActivatedRoute ){}
  ngOnInit(): void {
    this.id = localStorage.getItem('id');
    this.myform = this.formBuilder.group({
      Firstname: [''],
      Lastname: [''],
      Email: [''],
      Password: [''],
      File: [''] 
    });
    this.getData();
  }
  async getData(){
    this.datas = [];
    const response = await this.api.getUserById(this.id)
    this.data = response;
  }
  onFileChange($event: Event) {
  }
  submitForm() {
  } 
  back() {
    window.history.back();
  }  

}
