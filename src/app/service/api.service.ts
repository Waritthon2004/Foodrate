import { Injectable } from '@angular/core';
import { Constants } from '../config/constants';
import { HttpClient } from '@angular/common/http';
import { last, lastValueFrom } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private constants: Constants, private http: HttpClient) {}


  //Login 
  public async checkLogin(options?: any) {    
    let url = this.constants.API_ENDPOINT + '/user/check';
    const response = await lastValueFrom(this.http.post(url, options));

    return response ;
  }
  public async register(option : any) {
    let url = this.constants.API_ENDPOINT+'/user';
    const response = await lastValueFrom(this.http.post(url,option))
    return response;
  }


  //get image
 public async getImage() {    
    let url = this.constants.API_ENDPOINT + '/image';
    const response = await lastValueFrom(this.http.get(url));
    return response ;
  }

  //update point 
  public async putPoint(options?: any) {    
    let url = this.constants.API_ENDPOINT + '/image';
    const response = await lastValueFrom(this.http.put(url,options));

    return response ;
  }
  //update imageUser 
  public async imageUser(options?: any) {    
    let url = this.constants.API_ENDPOINT + '/upload/image';
    const response = await lastValueFrom(this.http.put(url,options));

    return response ;
  }

}
