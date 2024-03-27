import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../service/api.service';
import { ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { LoaddingComponent } from '../loadding/loadding.component';
import { MatDialog } from '@angular/material/dialog';
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
  check! : any;
  constructor(private formBuilder: FormBuilder, private api: ApiService,private route:Router,public dialog: MatDialog) { }
  
  ngOnInit(): void {
    this.myform = this.formBuilder.group({
      Firstname: ['',Validators.required],
      Lastname: ['', Validators.required],
      Email: ['', Validators.required],
      Password: ['', Validators.required],
      File: ['']
    });
  }
  
  async submitForm() {
    let dialogRef = this.dialog.open(LoaddingComponent, {
      width: '250px',
      height: '250px',
      data: { message: 'Loading...' }
    });
    if (this.myform.valid) {
      this.formData.append('Firstname', this.myform.get('Firstname')!.value);
    this.formData.append('Lastname', this.myform.get('Lastname')!.value);
    this.formData.append('Email', this.myform.get('Email')!.value);
    this.formData.append('Password', this.myform.get('Password')!.value);
    this.formData.forEach((value, key) => {
      console.log(key + ', ' + value);
    });
    try {
       this.check =await this.api.register(this.formData);
   
       
      if(this.check.Err == "false"){
        console.log(this.check.Err );
        location.reload();
      }
      else{
        this.route.navigate(['/login']);  
      }
      
    } catch (error) {
      
    }
    finally{
        dialogRef.close();
    }
    } else {
      alert("กรุณากรอกข้อมูลให้ครบ");
    }
    

   
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
