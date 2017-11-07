import { Component } from '@angular/core';
import {HeroesComponent} from './heroes.component'
@Component({
 selector: 'my-app',
 template: `
   <h1>{{title}}</h1>
   <hr />
   <nav>
   <a routerLink="/dashboard"  routerLinkActive="active">Dashboard</a>
   <a routerLink="/heroes"  routerLinkActive="active">Heroes</a>
   </nav>
   <router-outlet></router-outlet>
   <hr />
 `,
 styleUrls: ['./app.component.css'],
})
export class AppComponent {
 title = 'Tour of Heroes';
}