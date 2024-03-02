import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormBuilder,FormGroup } from '@angular/forms';
import { ApiService } from '../../service/api.service';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnInit {
  myform! : FormGroup;
  data : any;
  constructor(private formBuilder : FormBuilder,private api : ApiService,private http: HttpClient){}
  ngOnInit(): void {
    this.myform = this.formBuilder.group({
      Firstname: [''],
      Lastname:[''],
      Email:[''],
      Password: [''],
    });
  }
 
  async submitForm(img: HTMLInputElement) {
    const formData = this.myform.value;
    console.log(formData);
    
    let response =  await this.api.register(formData);
   console.log(response);

    
  //  const uid =  await this.api.lastUID();
  //   console.log(uid);
    // response = await this.api.imageUser(uid)
  }
  // onChangeFile(event: any) {
  //   const file  = event.target.files[0];
  //   const formData = new FormData();
  //   this.data = formData.append('file',file);
  //  // this.http.put('http://localhost:3000/upload/image',formData).subscribe((res:any)=>{ })
    


  // }

}
