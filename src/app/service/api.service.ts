import { Injectable } from '@angular/core';
import { Constants } from '../config/constants';
import { HttpClient } from '@angular/common/http';
import { last, lastValueFrom } from 'rxjs';
@Injectable({
  providedIn: 'root'
})

export class ApiService {
  cal : any;
  json:any;
  constructor(private constants: Constants, private http: HttpClient) {
    
  }


  //Login 
  public async checkLogin(options?: any) {    
    let url = this.constants.API_ENDPOINT + '/user/check';
    const response = await lastValueFrom(this.http.post(url, options));

    return response ;
  }
//register 
public async register(option : any) {
  let url = this.constants.API_ENDPOINT+'/user';
  const response = await lastValueFrom(this.http.post(url, option))
  return response;
}



  //get image
 public async getImage() {    
    let url = this.constants.API_ENDPOINT + '/image';
    const response = await lastValueFrom(this.http.get(url));
    return response ;
  }

   //post image
 public async postimg(options: any) {    
  let url = this.constants.API_ENDPOINT + '/image/delay';
  const response = await lastValueFrom(this.http.post(url,options));
  return response ;
}

  public async getImageAll() {    
    let url = this.constants.API_ENDPOINT + '/image/all';
    const response = await lastValueFrom(this.http.get(url));
    return response ;
  }

  //update point 
  public async putPoint(options?: any) {    
    let url = this.constants.API_ENDPOINT + '/eloprocess';
    const response = await lastValueFrom(this.http.put(url,options));

    return response ;
  }
  //update imageUser 
  public async imageUser(options?: any) {    
    let url = this.constants.API_ENDPOINT + '/upload/image';
    const response = await lastValueFrom(this.http.put(url,options));

    return response ;
  }
  //select last UID
  public async lastUID(options?: any) {    
    let url = this.constants.API_ENDPOINT + '/upload';
    const response = await lastValueFrom(this.http.get(url,options));
    return response ;
  }
  //delete img
  public async deleteIMG(options?: any) {    
    let url = this.constants.API_ENDPOINT + '/image/'+options;
    const response = await lastValueFrom(this.http.delete(url));

    return response ;
  }
  //insert to pictur
  public insertPicture(option? : any,id?:any){
    let url = this.constants.API_ENDPOINT + '/upload?id='+id;
    const response = this.http.post(url,option).subscribe((res:any)=>{})
    return response;
  }
  // get all user
  public async getUser(){
    let url = this.constants.API_ENDPOINT+'/user';
    const response = await lastValueFrom(this.http.get(url));
    return response;
  }

  //get user by id
  public async getUserById(option?:any){
    let url = this.constants.API_ENDPOINT+'/user/'+option;
    const response = await lastValueFrom(this.http.get(url));
    return response;
  }


   //stand user
   public async userpage(option?:any){
    let url = this.constants.API_ENDPOINT+'/user/page';
    const response = await lastValueFrom(this.http.post(url,option));
    return response;
  }



  //get image standing

public async getstandind() {    
    let url = this.constants.API_ENDPOINT + '/standing';
    const response = await lastValueFrom(this.http.get(url));

    return response ;
  }
  //get image by id
 public async getImageById(option?:any){
  let url = this.constants.API_ENDPOINT + '/image/all/'+option;
    const response = await lastValueFrom(this.http.get(url));
  return response ;
 }

   //get * date
   public async getFoodDate(option?:any){
    let url = this.constants.API_ENDPOINT + '/image/date/'+option;
      const response = await lastValueFrom(this.http.get(url));
    return response ;
   }
    //get * chart
    public async getchart(option:any){
      console.log(option);
      
      let url = this.constants.API_ENDPOINT + '/eloprocess/chart?id='+option;
      console.log(url);
      
        const response = await lastValueFrom(this.http.get(url));
      return response ;
     }
    //getPerviousDay
    public async getPerviousDay(option?:any){
      let url = this.constants.API_ENDPOINT+'/standing/pervious';
        const response = await lastValueFrom(this.http.get(url));
      return response ;
     }

    //newday
    public async newday(){
      let url = this.constants.API_ENDPOINT+'/image/newday';
        const response = await lastValueFrom(this.http.get(url));
      return response ;
     }



} 

