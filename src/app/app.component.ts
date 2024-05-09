import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'cuchufli-app';

  constructor(private _route: Router) {
    this._route.navigate(['/copy-paste'])
  }
}
