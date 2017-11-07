import {Injectable} from '@angular/core';

import {Hero} from './hero';
import {HEROES} from './mock-heroes';
import {InMemoryDataService} from './in-memory-data.service';
import  {Headers, Http} from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class HeroService{

    private heroesUrl = 'api/heroes';

    //Need to pass Http as property in order to use on the code
    constructor(private http : Http){}

    // getHeroes(): Promise<Hero[]> {
    //     return Promise.resolve(HEROES);
    // }

    //http.get() return an RxJS observable. Observables are a powerful way to manage asynchronous data flows.you've converted the Observable to a Promise 
    //using the toPromise operator.
    getHeroes(): Promise<Hero[]>{
        return this.http.get(this.heroesUrl).toPromise().then(response => response.json().data as Hero[]).catch(this.handleError);
    }
    
    // getHero(id: number): Promise<Hero>{
    //     return this.getHeroes().then(heroes => heroes.find(hero => hero.id === id));
    // }

    getHero(id: number) : Promise<Hero>{
        const url = `${this.heroesUrl}/${id}`;
        return this.http.get(url).toPromise().then(response => response.json().data as Hero).catch(this.handleError);
    }

    private headers = new Headers({'Content-Type': 'application/json'});

    update(hero: Hero): Promise<Hero>{
        const url = `${this.heroesUrl}/${hero.id}`;
        return this.http.put(url, JSON.stringify(hero), {headers : this.headers}).toPromise().then(() => hero).catch(this.handleError);
    }
    private handleError(error : any): Promise<any>{
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }
    
    create(name: string) : Promise<Hero>{
        return this.http.post(this.heroesUrl, JSON.stringify({name: name}), {headers : this.headers}).toPromise()
        .then(response => response.json().data as Hero).catch(this.handleError);
    }
    
 
}