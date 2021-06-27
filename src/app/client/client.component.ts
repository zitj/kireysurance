import { Component, OnDestroy, OnInit } from '@angular/core';
import { ClientService } from '../services/client.service';
import { Subject } from 'rxjs';
import { Client } from '../models/Client';
import { FormGroup, Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { takeUntil } from 'rxjs/operators';

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

  public unsubscribe$ = new Subject();

  formGroup: FormGroup = new FormGroup({});

  loadingUsers: boolean = true;
  validNumberOfAccounts: boolean = false;
  validDuration: boolean = false;
  validName: boolean = false;
  edit: boolean = false;

  heading: string = 'There are no clients';
  header: string = 'Add client';

  date = new Date(Date.now());
  clients: Client[] = [];

  displayDialog: boolean = false;
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

  // HTTPS
  getClients(): void {
    this.clientService
      .getClients()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        (res) => {
          this.loadingUsers = false;
          this.clients = res.reverse();
          if (this.clients.length === 0) {
            this.heading = 'There are no clients';
          } else {
            this.heading = 'Table of clients';
          }
        },
        (err) => {
          console.log(err.message);
        }
      );
  }

  postClient(): void {
    this.clientService
      .createClient(this.formGroup.value)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        (res) => {
          this.getClients();
        },
        (err) => {
          console.log(err.message);
        }
      );
  }

  updateClient(): void {
    this.clientService
      .updateClient(this.clientId, this.formGroup.value)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        (res) => {
          this.getClients();
        },
        (err) => {
          console.log(err.message);
        }
      );
  }

  deleteClient(): void {
    setTimeout(() => {
      for (let client of this.clients) {
        if (client.id === this.clientId) {
          this.clientService
            .deleteClient(this.clientId)
            .pipe(takeUntil(this.unsubscribe$))
            .subscribe(
              (res) => {
                this.getClients();
              },
              (err) => {
                console.log(err.message);
              }
            );
        }
      }
    }, 0);
  }

  ngOnInit(): void {
    this.buildingForm();
    this.getClients();
  }
  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  // Create client
  openCreateDialog(): void {
    this.edit = false;
    this.toggleDialog();
    this.buildingForm();
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

  // Edit client
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
