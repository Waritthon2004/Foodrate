import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { ApiService } from '../../service/api.service';
import { CommonModule } from '@angular/common';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-changepass',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './changepass.component.html',
  styleUrl: './changepass.component.scss'
})
export class ChangepassComponent  implements OnInit {
 
  myform!: FormGroup;
  formData: FormData = new FormData();
  id : any;
  check! : any;
  ch:any;
  constructor(private formBuilder:FormBuilder,private api: ApiService,private dialogRef: MatDialogRef<ChangepassComponent> ){}
  ngOnInit(): void {
    this.id = localStorage.getItem('id');
    this.myform = this.formBuilder.group({
      Password: [''],
      Newpass: ['']
      // Password: [''],
      // File: [''] 
    });  
  }
  async submitForm() {
    if (this.myform.valid) {
      // this.formData.forEach((value, key) => {
      //   console.log(key + ', ' + value);
      // });
      console.log(this.myform.get('Newpass')!.value);
      let Data = {
        "Password": this.myform.get('Password')!.value,
        "Newpass": this.myform.get('Newpass')!.value
            };
      try {
        this.check = await this.api.changePass(Data,this.id);
        
        // Reset formData to empty
        this.formData = new FormData();
 
        if(this.check.TXT)alert("Wrong Password");
        else{
          this.dialogRef.close();
          alert("Update Successss");
        } 
        

      } catch (error) {
        
      }
    } else {
      alert("กรุณากรอกข้อมูลให้ครบ");
    } 
  }
  

  
}
