import { BreakpointObserver } from '@angular/cdk/layout';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  toggleSideBar() {
    this.opened = !this.opened
  }

  opened = false; // This controls the state of the sidenav
  isExpanded: boolean = true;

  constructor(private breakpointObserver: BreakpointObserver) { }

  ngOnInit() {
  }

  title = 'dynamic-form-builder';
}
