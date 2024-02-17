import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class BipsService {

  constructor(private http: HttpClient) { }

  getBips() {
    return this.http.get('https://upgradeclub-app-back.vercel.app/api/bips')
  }

  getAllBips() {
    return this.http.get('https://upgradeclub-app-back.vercel.app/api/all-bips')
  }

  createBip(bip: any) {
    return this.http.post('https://upgradeclub-app-back.vercel.app/api/create-bip', bip)
  }

  deleteBip(id: string) {
    return this.http.delete(`https://upgradeclub-app-back.vercel.app/api/bips/${id}`)
  }

  patchLikes(id: string, likes: string[]) {
    return this.http.patch(`https://upgradeclub-app-back.vercel.app/api/bips/${id}`, {likes})
  }

}
