import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormBuilder,FormGroup } from '@angular/forms';
import { ApiService } from '../../service/api.service';
@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnInit {
  myform! : FormGroup;
  constructor(private formBuilder : FormBuilder,private api : ApiService){}
  ngOnInit(): void {
    this.myform = this.formBuilder.group({
      FirstName: [''],
      LastName:[''],
      Email:[''],
      Password: [''],
    });
  }
 
  async submitForm() {
    const formData = this.myform.value;
    console.log(formData);
    
    const response =  await this.api.register(formData);
    //console.log(response);
    
  }

}
