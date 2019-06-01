import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Element } from '@angular/compiler';
import { MatSelect, MatButton } from '@angular/material';
import { Field } from './field';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { GameService } from './game.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(public game: GameService) { }

  ngOnInit() {
    this.game.startNewGame();
  }
}
