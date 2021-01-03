import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-promesas',
  templateUrl: './promesas.component.html',
  styles: [
  ]
})
export class PromesasComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    // const promesa = new Promise<string>((resolve, reject) => {

    //   if(false){
    //     resolve('Hola Mundo');
    //   } else {
    //     reject('Algo salio mal');
    //   }

    // });

    // promesa
    //   .then(console.log)
    //   .catch(console.error);
    // console.log('Fin del Init');

    this.getUsuarios().then(console.log);
  }

  async getUsuarios() {
    const data = await fetch('https://reqres.in/api/users', { method: 'GET' });
    const users = (await data.json()).data;

    return users;
  }

}
