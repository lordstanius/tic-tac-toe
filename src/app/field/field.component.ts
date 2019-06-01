import {
  Component,
  HostListener
} from '@angular/core';
import { GameService } from '../game.service';
import { Field } from '../field';

@Component({
  selector: 'app-field',
  templateUrl: './field.component.html',
  styleUrls: ['./field.component.css']
})
export class FieldComponent {

  field: Field;
  isMouseOver = false;

  constructor(private game: GameService) {
    this.field = game.board.nextField;
  }

  @HostListener('mouseenter') onMouseEnter() {
    if (this.game.canPlay(this.field)) {
      this.field.glyph = this.game.currentPlayerGlyph;
      this.isMouseOver = true;
    }
  }

  @HostListener('mouseleave') onMouseLeave() {
    if (!this.field.isDisabled) {
      this.field.glyph = null;
    }
    this.isMouseOver = false;
  }

  @HostListener('click') onClick() {
    if (this.game.canPlay(this.field)) {
      this.game.playTo(this.field);
      this.game.switchPlayers();
    }
  }
}
