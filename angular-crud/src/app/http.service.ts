import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private _http: HttpClient) { }

  get(url) {
    return this._http.get(url);
  }
  post(url, data) {
    return this._http.post(url, data);
  }
}
