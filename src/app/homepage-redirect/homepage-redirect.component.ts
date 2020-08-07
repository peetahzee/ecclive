import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-homepage-redirect',
  template: '',
})
export class HomepageRedirectComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    window.location.href = "https://eccseattle.org";
  }

}
