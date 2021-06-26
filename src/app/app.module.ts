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
import { HttpClientModule } from '@angular/common/http';

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
  ],
  exports: [TableModule],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ToolbarModule,
    ClientModule,
    HttpClientModule,
    TableModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
