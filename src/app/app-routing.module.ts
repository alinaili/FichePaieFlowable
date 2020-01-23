import { DetailTacheTraiterComponent } from './daf/taches/detail-tache-traiter/detail-tache-traiter.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { DetailDemandeComponent } from './users/detail-demande/detail-demande.component';
import { TacheRectifierComponent } from './users/tache-rectifier/tache-rectifier.component';
import { AccueilHomeComponent } from './accueil-home/accueil-home.component';
import { AccueilUsersComponent } from './users/accueil-users/accueil-users.component';
import { DemandeDocumentComponent } from './users/demande-document/demande-document.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DetailTacheComponent } from './daf/taches/detail-tache/detail-tache.component';
import { SigninComponent } from './signin/signin.component';
import { AuthGuardService } from './authguard/auth-guard.service';
import { AssistantsComponent } from './daf/assistants/assistants.component';

const routes: Routes = [
  {
    path: 'users', canActivate: [AuthGuardService], component: AccueilUsersComponent
  },
  {
    path: 'users/:id', canActivate: [AuthGuardService], component: AccueilUsersComponent
  },
  {
    path: 'detailDemande', canActivate: [AuthGuardService], component: DetailDemandeComponent
  },
  {
    path: 'demande', canActivate: [AuthGuardService], component: DemandeDocumentComponent
  },
  {
    path: 'assistants', canActivate: [AuthGuardService], component: AssistantsComponent
  },
  {
    path: 'detailtachtraiter', canActivate: [AuthGuardService], component: DetailTacheTraiterComponent
  },
  {
    path: 'detailTask', canActivate: [AuthGuardService], component: DetailTacheComponent
  },
  {
    path: 'rectifier', canActivate: [AuthGuardService], component: TacheRectifierComponent
  },
  {
    path: 'home', component: AccueilHomeComponent
  },
  {
    path: 'signin', component: SigninComponent
  },
  {
    path: '', redirectTo: '/home', pathMatch: 'full'
   },
  {
    path: '**', component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
