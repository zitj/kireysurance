import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientRoutingModule } from './client-routing.module';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';

@NgModule({
  declarations: [],
  imports: [CommonModule, ClientRoutingModule, ButtonModule, TableModule],
})
export class ClientModule {}
