import { Component, OnInit, inject } from '@angular/core';
import { Game } from 'src/models/game';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';
import { DocumentData, Firestore, addDoc, collection, collectionData, doc, docData, updateDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';





@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})



export class GameComponent  {

  game! :  Game;
  firestore: Firestore = inject(Firestore)
  game$: Observable<DocumentData | undefined> | undefined;
  firebase: any;
  newGames :string = "";
  gameId: string | undefined;
  
  

  constructor(public dialog: MatDialog, private route: ActivatedRoute) {
    // this.getGame()
   
  }

  

  

  ngOnInit() {
    this.newGame();
    this.route.params.subscribe ((params: any) => {
      console.log(params.id)

      const gameColletion = collection(this.firestore, 'games');
      const gameDoc = doc(gameColletion, params.id)
      this.gameId = params.id
      docData(gameDoc).subscribe((game: any) => {
        console.log(game);
        
        this.game.currentPlayer = game.currentPlayer;
        this.game.playedCard = game.playedCard;
        this.game.players = game.players;
        this.game.stack = game.stack;
        this.game.currentCard = game.currentCard;
        this.game.pickCardAnimation = game.pickCardAnimation;
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
    if (!this.game.pickCardAnimation) { 
      this.game.currentCard = this.game.stack.pop();
      
      this.game.pickCardAnimation = true;
      
      this.game.currentPlayer++
      this.game.currentPlayer = this.game.currentPlayer % this.game.players.length;
      this.saveGame();
      setTimeout(() => {
        if (this.game.currentCard) {
          this.game.playedCard.push(this.game.currentCard);
        }
      this.game.pickCardAnimation = false;
      this.saveGame();
      }, 1000);
    }   
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddPlayerComponent)
    dialogRef.afterClosed().subscribe((name: string) => {
      if (name && name.length > 0) {
      this.game.players.push(name);
      this.saveGame();
      }  
    });
  }


    saveGame () {
    const gameColletion = collection(this.firestore, 'games');
    const gameDoc = doc(gameColletion, this.gameId);
     updateDoc(gameDoc,this.game.toJson())
  }
}
