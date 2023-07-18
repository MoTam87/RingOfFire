import { Component, OnInit, inject } from '@angular/core';
import { Game } from 'src/models/game';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';




@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})



export class GameComponent  {
  pickCardAnimation = false;
  currentCard: string | undefined = '';
  game! :  Game;
  firestore: Firestore = inject(Firestore)
  game$: Observable<any[]> | undefined;
  
  

  constructor(public dialog: MatDialog) {
    const aCollection = collection(this.firestore, 'games')
    this.game$ = collectionData(aCollection);
    console.log('game update', this.game$)
  }

  ngOnInit() {
    this.newGame();
    
    
  }

  newGame() {
    this.game = new Game();
    console.log(this.game);
  };


  takeCard() {
    if (!this.pickCardAnimation) { 
      this.currentCard = this.game.stack.pop();
      this.pickCardAnimation = true;
     
      this.game.currentPlayer++
      this.game.currentPlayer = this.game.currentPlayer % this.game.players.length;

      setTimeout(() => {
        if (this.currentCard) {
          this.game.playedCard.push(this.currentCard);
        }
      this.pickCardAnimation = false;
      }, 1000);
    }   
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddPlayerComponent)
      
    

    dialogRef.afterClosed().subscribe((name: string) => {
      if (name && name.length > 0) {
      this.game.players.push(name)
      }  
    });
  }
}
