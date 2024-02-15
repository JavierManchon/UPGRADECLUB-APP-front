import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class BipsService {

  constructor(private http: HttpClient) { }

  getBips() {
    return this.http.get('http://localhost:3000/api/bips')
  }

  getAllBips() {
    return this.http.get('http://localhost:3000/api/all-bips')
  }

  createBip(bip: any) {
    return this.http.post('http://localhost:3000/api/create-bip', bip)
  }

  deleteBip(id: string) {
    return this.http.delete(`http://localhost:3000/api/bips/${id}`)
  }

}
