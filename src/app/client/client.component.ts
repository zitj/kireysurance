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

  private getSub: Subscription = new Subscription();
  private postSub: Subscription = new Subscription();
  private delSub: Subscription = new Subscription();
  private updateSub: Subscription = new Subscription();

  formGroup: FormGroup = new FormGroup({});

  validNumberOfAccounts: boolean = false;
  validDuration: boolean = false;
  validName: boolean = false;
  edit: boolean = false;

  heading: string = '';
  header: string = 'Add client';

  date = new Date(Date.now());
  clients: Client[] = [];

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
      this.validName = false;
      this.validDuration = false;
      this.validNumberOfAccounts = false;
    }, 0);
  }

  buildingForm(): void {
    let randomString = Math.random().toString(36).substring(7).toUpperCase();

    this.formGroup = this.formBuilder.group({
      code: [randomString],
      name: ['', [Validators.required]],
      duration: ['1', [Validators.required]],
      numberOfAccounts: ['1', [Validators.required]],
      dateOfCreation: this.date.toLocaleDateString(),
    });
  }

  setClientId(event: any): void {
    this.clientId = +event.currentTarget.id;
  }

  getClients(): void {
    this.getSub = this.clientService.getClients().subscribe((data) => {
      this.clients = data.reverse();
      if (this.clients.length === 0) {
        this.heading = 'There are no clients';
      } else {
        this.heading = 'Table of clients';
      }
    });
  }

  postClient(): void {
    this.postSub = this.clientService
      .createClient(this.formGroup.value)
      .subscribe((data) => {
        this.getClients();
      });
  }

  updateClient(): void {
    this.updateSub = this.clientService
      .updateClient(this.clientId, this.formGroup.value)
      .subscribe((data) => {
        this.getClients();
      });
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

  ngOnInit(): void {
    this.buildingForm();
    this.getClients();
  }
  ngOnDestroy(): void {
    this.getSub.unsubscribe();
    this.delSub.unsubscribe();
    this.postSub.unsubscribe();
    this.updateSub.unsubscribe();
  }

  addNewClient(): void {
    this.formGroup.value.name.trim() === ''
      ? (this.validName = true)
      : (this.validName = false);

    this.formGroup.value.duration <= 0
      ? (this.validDuration = true)
      : (this.validDuration = false);

    this.formGroup.value.numberOfAccounts <= 0
      ? (this.validNumberOfAccounts = true)
      : (this.validNumberOfAccounts = false);

    if (
      this.formGroup.value.name.trim() === '' ||
      this.formGroup.value.duration <= 0 ||
      this.formGroup.value.numberOfAccounts <= 0
    ) {
      return;
    }

    this.toggleDialog();
    this.postClient();
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
    this.formGroup.value.name.trim() === ''
      ? (this.validName = true)
      : (this.validName = false);

    this.formGroup.value.duration <= 0
      ? (this.validDuration = true)
      : (this.validDuration = false);

    this.formGroup.value.numberOfAccounts <= 0
      ? (this.validNumberOfAccounts = true)
      : (this.validNumberOfAccounts = false);

    if (
      this.formGroup.value.name.trim() === '' ||
      this.formGroup.value.duration <= 0 ||
      this.formGroup.value.numberOfAccounts <= 0
    ) {
      return;
    }
    this.toggleDialog();
    this.updateClient();
  }
}
