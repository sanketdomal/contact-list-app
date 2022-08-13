import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const baseUrl = 'http://localhost:8080';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  constructor(private http: HttpClient) { }

  getPaginatedContacts(params): Observable<any> {
    return this.http.get(baseUrl+"/listPageable", { params });
  }

  getAllContacts(): Observable<any> {
    return this.http.get(baseUrl +"/fetch");
  }


  //This api call is to populate Data in DB from people.csv file
  populateInMemoryData():Observable<any> {
    return this.http.get(baseUrl + "/populateContact");
  }

  
}
