import { Component, OnInit, inject } from '@angular/core';
import { Game } from 'src/models/game';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';
import { DocumentData, Firestore, addDoc, collection, collectionData, doc, docData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';





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
  game$: Observable<DocumentData | undefined> | undefined;
  firebase: any;
  newGames :string = "";
  
  

  constructor(public dialog: MatDialog, private route: ActivatedRoute) {
    // this.getGame()
   
  }

  

  

  ngOnInit() {
    this.newGame();
    this.route.params.subscribe ((params) => {
      console.log(params['id'])

      const itemColletion = collection(this.firestore, 'games')
      
      this.game$ = collectionData(itemColletion, { idField: 'dblhzpZzjobaZlFCQeyo'})
      
      this.game$.subscribe( game=> {
           console.log('game update', game)
           
      })
      
    })
    
  }

  newGame() {
    this.game = new Game();
    // this.addTodo()
  };

  getGame() {
   

  }

  // addTodo() {
  //   const itemColletion = collection(this.firestore, 'games')
  //   addDoc(itemColletion, this.game.toJson())
    
  //   this.getGame();
  // }


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
