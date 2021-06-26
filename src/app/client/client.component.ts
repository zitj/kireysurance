import { Component, OnDestroy, OnInit } from '@angular/core';
import { ClientService } from '../services/client.service';
import { Subscription } from 'rxjs';
import { Client } from '../models/Client';
import { FormGroup, Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss'],
})
export class ClientComponent implements OnInit, OnDestroy {
  constructor(
    private clientService: ClientService,
    private formBuilder: FormBuilder
  ) {}

  name = 'Clients table';
  date = new Date(Date.now());

  private getSub: Subscription = new Subscription();
  private postSub: Subscription = new Subscription();
  private delSub: Subscription = new Subscription();
  formGroup: FormGroup = new FormGroup({});

  clients: Client[] = [];

  displayDialog: boolean = false;
  displayDeleteDialog: boolean = false;
  clientCode: string = '';
  clientId: number = 9999;

  toggleDeleteDialog() {
    this.displayDeleteDialog
      ? (this.displayDeleteDialog = false)
      : (this.displayDeleteDialog = true);
  }

  toggleCreateEditDialog() {
    this.displayDialog
      ? (this.displayDialog = false)
      : (this.displayDialog = true);
  }

  buildingForm(): void {
    this.formGroup = this.formBuilder.group({
      code: ['', [Validators.required]],
      name: ['', [Validators.required]],
      duration: ['', [Validators.required]],
      numberOfAccounts: ['', [Validators.required]],
      dateOfCreation: this.date.toLocaleDateString(),
    });
  }

  ngOnInit(): void {
    this.buildingForm();
    this.getSub = this.clientService.getClients().subscribe((data) => {
      this.clients = data;
      for (let client of this.clients) {
        console.log(client);
      }
    });
  }
  ngOnDestroy(): void {
    this.getSub.unsubscribe();
    this.delSub.unsubscribe();
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
        });
      });
  }

  addNewClient(): void {
    this.toggleCreateEditDialog();
    this.postSub = this.clientService
      .createClient(this.formGroup.value)
      .subscribe((data) => {
        this.getSub = this.clientService.getClients().subscribe((data) => {
          this.clients = data;
        });
      });
    this.buildingForm();
  }
}
