import { MatIconModule } from '@angular/material/icon';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ApiService } from '../../service/api.service';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import {
  MatDialog,
  MatDialogRef,
  MatDialogActions,
  MatDialogClose,
  MatDialogTitle,
  MatDialogContent,
  MatDialogConfig,
} from '@angular/material/dialog';
import { ChangepassComponent } from '../changepass/changepass.component';
@Component({
  selector: 'app-my-profile',
  standalone: true,
  imports: [
    MatDialogActions,
    MatDialogClose,
    MatDialogTitle,
    MatDialogContent,MatIconModule,RouterLink,ReactiveFormsModule],
  templateUrl: './my-profile.component.html',
  styleUrl: './my-profile.component.scss'
})
export class MyProfileComponent implements OnInit{

  name = localStorage.getItem('user');
  myform!: FormGroup;
  formData: FormData = new FormData();
  id : any;
  data : any;
  datas : any;
  check! : any;
  constructor(public dialog: MatDialog,private route : Router,private api:ApiService,private formBuilder:FormBuilder ){}
   ngOnInit(): void {
    let  x   = localStorage.getItem('type')||2;
    if(x  == 1){
      this.route.navigate(['/admin']);
    }
    else if(x == 2){
      this.route.navigate(['']);

    }
    this.data = [];
   
    this.id = localStorage.getItem('id');
    this.getData();

  }
  form(){
    this.myform = this.formBuilder.group({
      Firstname: [this.data[0].Firstname],
      Lastname: [this.data[0].Lastname],
      Email: [this.data[0].Email]
      // Password: [''],
      // File: [''] 
    });    
  
  }
  async getData(){
    this.datas = [];
    const response = await this.api.getUserById(this.id)
    this.data = response;
    this.form();
   
  }
  async onFileChange($event: Event) {
    const file = ($event.target as HTMLInputElement).files![0];
    this.formData.append('file', file);
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
        console.log(this.formData);
        this.check = await this.api.updateData(this.formData,this.id);
  
        if(this.check.Err == "false"){
          console.log(this.check.Err );
          location.reload();
        } else {
          await this.getData();
        }
        
        // Reset formData to empty
        this.formData = new FormData();
        localStorage.setItem('user',this.data[0].Firstname)
        localStorage.setItem('img',this.data[0]?.image)
        this.name = localStorage.getItem('user');

        
      } catch (error) {
        
      }
    } else {
      alert("กรุณากรอกข้อมูลให้ครบ");
    } 
  }
  


  back() {
    window.history.back();
  }  
  logout(){
    localStorage.clear();
    this.route.navigate(['']);
  }
  show() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '500px'; // Set width
    dialogConfig.height = '300px'; // Set height
     this.dialog.open(ChangepassComponent, dialogConfig);
    }

}
