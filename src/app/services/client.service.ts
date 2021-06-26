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
}
