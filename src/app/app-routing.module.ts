import { NgModule } from "@angular/core"
import { RouterModule, Routes } from "@angular/router"
import { AuthComponent } from "auth/auth.component";
import { HomeComponent } from "home/home.component"
import { QuizComponent } from "quiz/quiz.component";
import { StatsComponent } from "stats/stats.component";


const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'quiz', component: QuizComponent },
  { path: 'stats', component: StatsComponent },
  { path: 'auth', component: AuthComponent },
  { path: '**', redirectTo: '/home' }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
