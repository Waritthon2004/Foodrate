import { Injectable } from '@angular/core';
import { Constants } from '../config/constants';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';
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

}
