import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
@Injectable({
  providedIn: 'root'
})
export class DadosService {
  private ADDRESS = 'http://localhost/loja1/';

  constructor(private http: Http) { }

  checkuser (param: string, obj: any) {
    return this.http.post( this.ADDRESS + param, JSON.stringify(obj));
  }

  getAll (param: string) {
    return this.http.get(this.ADDRESS  + param );
  }

  getOne (param: string, id) {
    return this.http.get( this.ADDRESS + param + '/' + id);
  }

  set (param: string, obj: any) {
    return this.http.post(this.ADDRESS + param , JSON.stringify(obj));
  }

  update (param: string, id, obj: any) {
    return this.http.put(this.ADDRESS + param + '/' + id, JSON.stringify(obj));
  }

  delete (param: string, id) {
    return this.http.delete(this.ADDRESS + param + '/' + id);
  }
}
