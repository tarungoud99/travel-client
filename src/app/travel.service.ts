import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Travel } from './travel.model';

@Injectable({
  providedIn: 'root',
})
export class TravelService {
  private apiUrl = 'http://localhost:3000/travels';

  constructor(private http: HttpClient) {}

  getRecord(): Observable<Travel[]> {
    return this.http.get<Travel[]>(this.apiUrl);
  }

  addRecord(travel: Travel): Observable<Travel> {
    return this.http.post<Travel>(this.apiUrl, travel);
  }

  updateRecord(id: string, travel: Travel): Observable<Travel> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.put<Travel>(url, travel);
  }

  deleteRecord(travelId: string): Observable<any> {
    const url = `${this.apiUrl}/${travelId}`;
    return this.http.delete(url);
  }
}
