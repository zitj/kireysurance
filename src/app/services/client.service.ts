import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Client } from '../models/Client';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ClientService {
  constructor(public http: HttpClient) {}

  url = environment.url;

  getClients(): Observable<Client[]> {
    return this.http.get<Client[]>(this.url + 'clients');
  }

  deleteClient(id: number): Observable<Client[]> {
    return this.http.delete<Client[]>(this.url + 'clients' + `/${id}`);
  }

  createClient(arg: Client): Observable<Client[]> {
    return this.http.post<Client[]>(this.url + 'clients', arg);
  }

  updateClient(id: number, arg: Client): Observable<Client[]> {
    return this.http.put<Client[]>(this.url + 'clients' + `/${id}`, arg);
  }
}
