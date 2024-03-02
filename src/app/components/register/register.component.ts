import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ApiService } from '../../service/api.service';
import { ReactiveFormsModule } from '@angular/forms';
@Component({
  selector: 'app-register',  
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  myform!: FormGroup;
  formData: FormData = new FormData();

  constructor(private formBuilder: FormBuilder, private api: ApiService) { }
  
  ngOnInit(): void {
    this.myform = this.formBuilder.group({
      Firstname: [''],
      Lastname: [''],
      Email: [''],
      Password: [''],
      File: [''] 
    });
  }

  async submitForm() {
    this.formData.append('Firstname', this.myform.get('Firstname')!.value);
    this.formData.append('Lastname', this.myform.get('Lastname')!.value);
    this.formData.append('Email', this.myform.get('Email')!.value);
    this.formData.append('Password', this.myform.get('Password')!.value);
    this.formData.forEach((value, key) => {
      console.log(key + ', ' + value);
    });
    
    await this.api.register(this.formData);
  }

  async onFileChange($event: Event) {
    const file = ($event.target as HTMLInputElement).files![0];
    this.formData.append('file', file);
  }
}
