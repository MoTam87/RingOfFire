import { Component, inject } from '@angular/core';
import { Firestore, addDoc, collection } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Game } from 'src/models/game';

@Component({
  selector: 'app-start-screen',
  templateUrl: './start-screen.component.html',
  styleUrls: ['./start-screen.component.scss']
})
export class StartScreenComponent {

  firestore: Firestore = inject(Firestore)
  
constructor (private router: Router) {}

ngOnInit () {

}

newGame () {
  let game = new Game();
  const itemColletion = collection(this.firestore, 'games');
  const addDocs = addDoc(itemColletion, game.toJson())
  addDocs.then((gameInfo: any) => {
    this.router.navigateByUrl('/game/' + gameInfo.id)
  })



  
}







}
