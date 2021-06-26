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

  heading: string = '';
  header: string = 'Add client';
  date = new Date(Date.now());
  edit: boolean = false;
  clients: Client[] = [];

  private getSub: Subscription = new Subscription();
  private postSub: Subscription = new Subscription();
  private delSub: Subscription = new Subscription();
  private updateSub: Subscription = new Subscription();

  formGroup: FormGroup = new FormGroup({});

  displayDialog: boolean = false;
  clientCode: string = '';
  clientId: number = 9999;

  toggleDialog() {
    this.displayDialog
      ? (this.displayDialog = false)
      : (this.displayDialog = true);
    setTimeout(() => {
      if (this.edit) {
        this.header = 'Edit client';
      } else {
        this.header = 'Add client';
      }
    }, 0);
  }

  buildingForm(): void {
    let randomString = Math.random().toString(36).substring(7).toUpperCase();

    this.formGroup = this.formBuilder.group({
      code: [randomString],
      name: ['', [Validators.required]],
      duration: ['', [Validators.required]],
      numberOfAccounts: ['', [Validators.required]],
      dateOfCreation: this.date.toLocaleDateString(),
    });
  }

  getClients(): void {
    this.getSub = this.clientService.getClients().subscribe((data) => {
      this.clients = data.reverse();
      if (this.clients.length === 0) {
        this.heading = 'Currently there are no clients';
      } else {
        this.heading = 'Table of clients';
      }
    });
  }

  ngOnInit(): void {
    this.buildingForm();
    this.getClients();
  }
  ngOnDestroy(): void {
    this.getSub.unsubscribe();
    this.delSub.unsubscribe();
    this.postSub.unsubscribe();
  }

  setClientId(event: any): void {
    this.clientId = +event.currentTarget.id;
  }

  deleteClient(): void {
    setTimeout(() => {
      for (let client of this.clients) {
        if (client.id === this.clientId) {
          this.delSub = this.clientService
            .deleteClient(this.clientId)
            .subscribe((data) => {
              this.getClients();
            });
        }
      }
    }, 0);
  }

  addNewClient(): void {
    this.toggleDialog();
    this.postSub = this.clientService
      .createClient(this.formGroup.value)
      .subscribe((data) => {
        this.getClients();
      });
  }

  openCreateDialog(): void {
    this.edit = false;
    this.toggleDialog();
    this.buildingForm();
  }

  openEditDialog(): void {
    this.toggleDialog();
    this.edit = true;
    setTimeout(() => {
      for (let client of this.clients) {
        if (client.id === this.clientId) {
          this.formGroup = this.formBuilder.group({
            code: [client.code],
            name: [client.name, [Validators.required]],
            duration: [client.duration, [Validators.required]],
            numberOfAccounts: [client.numberOfAccounts, [Validators.required]],
            dateOfCreation: this.date.toLocaleDateString(),
          });
        }
      }
    }, 0);
  }

  editClient(): void {
    this.toggleDialog();
    this.updateSub = this.clientService
      .updateClient(this.clientId, this.formGroup.value)
      .subscribe((data) => {
        this.getClients();
      });
  }
}
