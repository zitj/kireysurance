import { Component, OnDestroy, OnInit } from '@angular/core';
import { ClientService } from '../services/client.service';
import { Subscription, Subject } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit, OnDestroy {
  private routeSub!: Subscription;
  public unsubscribe$ = new Subject();
  constructor(
    private clientService: ClientService,
    private route: ActivatedRoute
  ) {}
  clientId: number = 0;
  clientName: string = '';
  ngOnInit(): void {
    this.routeSub = this.route.params.subscribe((params) => {
      this.clientId = +params['id'];
    });
    this.clientService
      .getClients()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        (res) => {
          console.log(res);
          res.forEach((el) => {
            el.id === this.clientId
              ? (this.clientName = el.name)
              : console.log('nothing');
          });
        },
        (err) => {
          console.log(err.message);
        }
      );
  }
  ngOnDestroy(): void {
    this.routeSub.unsubscribe();
  }
}
