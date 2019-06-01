import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule, MatButtonModule, MatInputModule, MatIconModule } from '@angular/material';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { AppComponent } from './app.component';
import { FieldComponent } from './field/field.component';
import { GameService } from './game.service';

@NgModule({
  declarations: [
    AppComponent,
    FieldComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    MatSelectModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    MatCheckboxModule
  ],
  providers: [GameService],
  bootstrap: [AppComponent]
})
export class AppModule { }
