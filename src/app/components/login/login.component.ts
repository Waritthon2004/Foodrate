import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { ApiService } from '../../service/api.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule,RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  myForm!: FormGroup;
  bool: any;
  constructor(private formBuilder: FormBuilder, private api: ApiService,private route:Router) {}

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
    console.log(typeof this.bool.UID);
    
    if(typeof this.bool.UID === 'number'){
        localStorage.setItem('id',this.bool.UID);
     
        this.route.navigate(['/user'])
    }
    else{
      console.log("wrong");
      
    }
  }

}
