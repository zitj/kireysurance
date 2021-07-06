import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { ToolbarModule } from 'primeng/toolbar';
import { HeroComponent } from './home/hero/hero.component';
import { TestemonialsComponent } from './home/testemonials/testemonials.component';
import { AboutComponent } from './home/about/about.component';
import { FooterComponent } from './home/footer/footer.component';
import { ClientModule } from './client/client.module';
import { ClientComponent } from './client/client.component';
import { TableModule } from 'primeng/table';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { DialogModule } from 'primeng/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { MessageModule } from 'primeng/message';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ProfileComponent } from './profile/profile.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    HeroComponent,
    TestemonialsComponent,
    AboutComponent,
    FooterComponent,
    ClientComponent,
    ProfileComponent,
  ],
  exports: [
    TableModule,
    DialogModule,
    InputNumberModule,
    InputTextModule,
    MessageModule,
    ButtonModule,
    ProgressSpinnerModule,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ToolbarModule,
    ClientModule,
    HttpClientModule,
    TableModule,
    DialogModule,
    BrowserAnimationsModule,
    InputNumberModule,
    InputTextModule,
    MessageModule,
    FormsModule,
    ReactiveFormsModule,
    ButtonModule,
    ProgressSpinnerModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
