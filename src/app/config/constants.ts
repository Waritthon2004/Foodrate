import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
//https://apifood-kbmk.onrender.com
export class Constants {
  public readonly API_ENDPOINT: string = 'https://apifood-kbmk.onrender.com';
}