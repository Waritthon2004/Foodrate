import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ApiService } from '../../service/api.service';
import { ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
@Component({
  selector: 'app-register',  
  standalone: true,
  imports: [ReactiveFormsModule,RouterLink],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  myform!: FormGroup;
  formData: FormData = new FormData();

  constructor(private formBuilder: FormBuilder, private api: ApiService,private route:Router) { }
  
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
    this.route.navigate(['/login']);
  }
  // onChangeFile(event: any) {
  //   const file  = event.target.files[0];
  //   const formData = new FormData();
  //   this.data = formData.append('file',file);
  //  // this.http.put('http://localhost:3000/upload/image',formData).subscribe((res:any)=>{ })
  // }

  async onFileChange($event: Event) {
    const file = ($event.target as HTMLInputElement).files![0];
    this.formData.append('file', file);
  }
}
