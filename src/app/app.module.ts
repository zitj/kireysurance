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

@NgModule({
  declarations: [AppComponent, HomeComponent, HeaderComponent, HeroComponent, TestemonialsComponent, AboutComponent, FooterComponent],
  imports: [BrowserModule, AppRoutingModule, ToolbarModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
