import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  constructor() {}

  showNav: boolean = true;

  ngOnInit(): void {
    if (screen.width <= 700) {
      this.showNav = false;
    }
  }

  toggleNavigation(): void {
    this.showNav ? (this.showNav = false) : (this.showNav = true);
  }
}
