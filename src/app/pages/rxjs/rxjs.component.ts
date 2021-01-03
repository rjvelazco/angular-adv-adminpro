import { Component, OnDestroy } from '@angular/core';
import { Observable, interval, Subscription } from 'rxjs';
import { retry, take, map, filter } from 'rxjs/operators';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: [
  ]
})
export class RxjsComponent implements OnDestroy {

  public intervalSubs: Subscription;

  constructor() {

    // this.retrunaObservable().pipe(
    //   retry(2)
    // ).subscribe(
    //     valor => console.log('Subs:', valor),
    //     error => console.warn('Error:', error),
    //     () => console.log('Obs terminado') 
    // );

    this.intervalSubs = this.retornaIntervalo().subscribe(console.log);

  }

  retornaIntervalo():Observable<number> {
    return interval(100)
      .pipe(
        // Los operadores se ejecutan de manera secuencial
        map(valor => valor + 1),
        filter(valor => (valor % 2 ===0)),
    );
  }

  retrunaObservable():Observable<number> {
    return new Observable<number>(observer => {
      let i = -1;

      const intervalo = setInterval(() => {

        i++;
        observer.next(i);

        if (i === 4) {
          clearInterval(intervalo);
          observer.complete();
        }
        
        if (i === 2) {
          observer.error('i llego al valor de 2');
        }

      }, 1000);
    });
  }

  ngOnDestroy() {
    this.intervalSubs.unsubscribe();
  }


}
