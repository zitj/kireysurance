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

  private getSub: Subscription = new Subscription();
  private delSub: Subscription = new Subscription();

  clients: Client[] = [];
  selectedClient: Client = this.clients[0];
  displayDialog: boolean = false;
  displayDeleteDialog: boolean = false;
  clientCode: string = '';
  clientId: number = 9999;

  toggleDeleteDialog() {
    this.displayDeleteDialog
      ? (this.displayDeleteDialog = false)
      : (this.displayDeleteDialog = true);
  }

  showDialog() {
    this.displayDialog = true;
  }
  showDeleteDialog() {
    this.displayDeleteDialog = true;
  }

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

  proba(event: any): void {
    console.log(event.target);
  }

  setClientId(event: any): void {
    this.clientCode = event.currentTarget.children[0].innerText;
    for (let client of this.clients) {
      if (client.code === this.clientCode) {
        this.clientId = client.id;
      }
    }
  }

  deleteClient(): void {
    this.toggleDeleteDialog();
    this.delSub = this.clientService
      .deleteClient(this.clientId)
      .subscribe((data) => {
        this.getSub = this.clientService.getClients().subscribe((data) => {
          this.clients = data;
          for (let client of this.clients) {
            console.log(client);
          }
        });
      });
    // this.displayDeleteDialog = false;
  }
}
