import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { ApiService } from '../../service/api.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  myForm!: FormGroup;
  bool: any;
  constructor(private formBuilder: FormBuilder, private api: ApiService) {}

  ngOnInit(): void {
    this.myForm = this.formBuilder.group({
      Email: [''],
      Password: [''],
    });
  }

  async submitForm() {
    const formData = this.myForm.value;
    await this.Checklogin(formData);
  
  }

  async Checklogin(jsonData: any) {
    this.bool = await this.api.checkLogin(jsonData);
    console.log(this.bool);
    
    if(typeof this.bool.UID.typenumeber){
        console.log("yayay");
    }
    else{
      console.log("baba");
      
    }
  }
}
