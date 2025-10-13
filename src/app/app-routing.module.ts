import { NgModule } from "@angular/core"
import { RouterModule, Routes } from "@angular/router"
import { AdminComponent } from "admin/admin.component";
import { AuthComponent } from "auth/auth.component";
import { AuthGuard } from "guards/auth.guard";
import { HomeComponent } from "home/home.component"
import { QuizComponent } from "quiz/quiz.component";
import { StatsComponent } from "stats/stats.component";


const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'quiz', component: QuizComponent },
  { path: 'stats', component: StatsComponent },
  { path: 'login', component: AuthComponent },
  { path: 'admin', component: AdminComponent, canActivate:[AuthGuard] },
  { path: '**', redirectTo: '/home' }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
