import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class EComAPIService {


  private url: string = 'https://www.mocky.io/v2/5eda4003330000740079ea60';
  constructor(private http: HttpClient) { }

  getItemList(): Observable<any[]> {
    return this.http.get<any[]>(this.url);
  }
}
