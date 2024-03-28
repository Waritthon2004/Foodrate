import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../service/api.service';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
@Component({
  selector: 'app-editadmin',
  standalone: true,
  imports: [MatIconModule,CommonModule,ReactiveFormsModule],
  templateUrl: './editadmin.component.html',
  styleUrl: './editadmin.component.scss'
})
export class EditadminComponent {
  myform!: FormGroup;
  formData: FormData = new FormData();
  img : any;
  users : any;
  count : any;
  user : any;
  all : any;
  name : any;
  id:any;
  datas : any;
  check! : any;
  constructor(private route:Router,private api:ApiService,private formBuilder:FormBuilder,private activedroute : ActivatedRoute){}
  ngOnInit(): void {
    let  x   = localStorage.getItem('type')||2;
    if(x  == 0){
      this.route.navigate(['/user']);
    }
    else if(x == 2){
      this.route.navigate(['']);

    }
    this.id = localStorage.getItem('id');
    this.count = [];
    this.getData();
    this.load();
  
  
  }
  async load (){
     this.all = await this.api.getUser();
      this.users = this.all.data;
      let i = Math.ceil(this.all.Row / 5);
      console.log(i);
      
      for(let j = 1; j<=i;j++){
        this.count.push(j);
      }
      console.log(this.users);
      
  }
  data:any;

logout() {
  localStorage.clear();
  this.route.navigate(['']);
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
}
