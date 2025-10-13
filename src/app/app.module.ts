import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';
import { AppRoutingModule } from "./app-routing.module";  // <-- chemin relatif
import { AppComponent } from "./app.component";           // <-- idem
import { HomeComponent } from "./home/home.component";     // <-- idem
import { MatListModule } from "@angular/material/list";
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { QuizComponent } from "quiz/quiz.component";
import { StatsComponent } from "stats/stats.component";
import { AuthComponent } from "auth/auth.component";
import { MatRadioModule } from '@angular/material/radio';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { NavBarComponent } from './navbar/navbar.component';
import { AdminComponent } from "admin/admin.component";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    QuizComponent, 
    StatsComponent,
    AuthComponent,
    NavBarComponent,
    AdminComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatListModule,
    FormsModule,
    MatCardModule,
    MatRadioModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatToolbarModule,
    MatProgressBarModule,
    MatIconModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
