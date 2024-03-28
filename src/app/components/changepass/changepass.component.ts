import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { ApiService } from '../../service/api.service';

@Component({
  selector: 'app-changepass',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './changepass.component.html',
  styleUrl: './changepass.component.scss'
})
export class ChangepassComponent  implements OnInit {
 
  check : any;
  myform!: FormGroup;
  formData: FormData = new FormData();
  id : any;
  constructor(private formBuilder:FormBuilder,private api: ApiService ){}
  ngOnInit(): void {
    this.id = localStorage.getItem('id');
    this.myform = this.formBuilder.group({
      Password: [''],
      Newpass: [''],
      // Password: [''],
      // File: [''] 
    });    
  }
  async submitForm() {
    if (this.myform.valid) {
      this.formData.append('Firstname', this.myform.get('Firstname')!.value);
      this.formData.append('Lastname', this.myform.get('Lastname')!.value);
      this.formData.append('Email', this.myform.get('Email')!.value);
      this.formData.forEach((value, key) => {
        console.log(key + ', ' + value);
      });
      
      
      try {
        this.check = await this.api.changePass(this.formData,this.id);
  
        if(this.check.Err == "false"){
          console.log(this.check.Err );
          location.reload();
        } else {
        }
        // Reset formData to empty
        this.formData = new FormData();        
      } catch (error) {
        
      }
    } else {
      alert("กรุณากรอกข้อมูลให้ครบ");
    } 
  }
}
