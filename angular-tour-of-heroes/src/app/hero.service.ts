import { Injectable } from '@angular/core';
import { Hero } from './hero';
import { HEROES } from './mock-heroes'
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs'

import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})


const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
}

export class HeroService {

  constructor( 
  	private http: HttpClient,
  	private messageService: MessageService
  ) { }

	private log(message: string) {
		this.messageService.add('HeroService: ' + message)
	}

	private heroesUrl = 'api/heroes';

  getHeroes(): Observable<Hero[]> {
  	//this.messageService.add('HeroService: fetched heroes')
  	//return of(HEROES);
    return this.http.get<Hero[]>(this.heroesUrl).pipe(
      tap(heroes => this.log(`fetched heroes`)),
      catchError( this.handleError('getHeroes', []))
    )
  }

  getHero(id: number): Observable<Hero>{
  	const url = `${this.heroesUrl}/${id}`;
    return this.http.get<Hero>(url).pipe(
      tap( _ => this.log(`fetched hero id = ${id}`)),
      catchError( this.handleError<Hero>(`getHero id=${id}`))
    )
  }

  updateHero(hero: Hero): Observable<any>{
   
    return this.http.put(this.heroesUrl, hero, httpOptions).pipe(
      tap( _ => this.log(`updated hero id = ${hero.id}`)),
      catchError(this.handleError<any>('updateHero'))
    )
  }


  private handleError<T>(operation = 'operation', result ?: T){
    return (error: any): Observable<T> => {
      //Todo: send the error to remote logging infreastructure
      console.error(error)

      //Todo better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`)

      // let the app keep running by returning an empty result
      return of(result as T)
    }
  }

  addHero(hero: Hero): Observable<Hero>{
    return this.http.post<Hero>(this.heroesUrl, hero, httpOptions).pipe(
      tap((hero: Hero) => this.log(`added hero w/ id=${hero.id}`)),
      catchError(this.handleError<Hero>('addHero'))
    )
  }
}
