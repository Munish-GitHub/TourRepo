import { Component } from '@angular/core';
import {Hero} from './hero';
import {HeroService} from './hero.service';
import {OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'my-heroes',
  templateUrl: './heros.component.html',
  styleUrls: [ './heroes.component.css' ],
  providers : [HeroService],
  
})
export class HeroesComponent implements OnInit {

  ngOnInit(): void {
    this.getHeroes();
  }
  title = 'Tour Of Heroes';
  // hero: Hero = {
  //   id: 1,
  //   name: "Rockstar"
  // };
  heroes: Hero[];
 selectedHero: Hero;

  onSelect(hero: Hero): void {
    this.selectedHero = hero;
  }

  //
  constructor(private router: Router, private heroService: HeroService) { 

    }
    getHeroes(): void{
      //this.heroes = this.heroService.getHeroes();
      this.heroService.getHeroes().then(heroes => this.heroes = heroes);
  }
  gotoDetail(){
    this.router.navigate(['/detail', this.selectedHero.id]);
  }
  add(name: string) : void{
    name = name.trim();
    if(!name) {return;}
    this.heroService.create(name).then(hero => {this.heroes.push(hero); this.selectedHero = null  });


  }
}