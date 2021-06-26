import { Component, OnDestroy, OnInit } from '@angular/core';
import { ClientService } from '../services/client.service';
import { Subscription } from 'rxjs';
import { Client } from '../models/Client';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss'],
})
export class ClientComponent implements OnInit, OnDestroy {
  constructor(private clientService: ClientService) {}

  name = 'Clients table';

  public getSub: Subscription = new Subscription();
  clients: Client[] = [];

  ngOnInit(): void {
    this.getSub = this.clientService.getClients().subscribe((data) => {
      this.clients = data;
      for (let client of this.clients) {
        console.log(client);
      }
    });
  }
  ngOnDestroy(): void {
    this.getSub.unsubscribe();
  }
}
