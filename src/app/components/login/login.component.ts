import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ReactiveFormsModule } from '@angular/forms';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [  ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  myForm!: FormGroup ;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.myForm = this.formBuilder.group({
      email: [''],
      password: [''],
     
    });
  }

  submitForm() {
    const formData = this.myForm.value;
    console.log(formData);
    const jsonData = JSON.stringify(formData);
    console.log(jsonData); 
 
  }
}
