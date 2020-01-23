import { EventEmitterService } from './services/event/event-emitter.service';
import { AuthService } from './services/auth.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { SigninComponent } from './signin/signin.component';
import { HeaderComponent } from './header/header.component';
import { DemandeDocumentComponent } from './users/demande-document/demande-document.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BsDatepickerModule, TabsModule } from 'ngx-bootstrap';
import { AccueilUsersComponent } from './users/accueil-users/accueil-users.component';
import { AccueilHomeComponent } from './accueil-home/accueil-home.component';
import { DetailTacheComponent } from './daf/taches/detail-tache/detail-tache.component';
import { MatTabsModule, MatDialogModule, MatButtonModule} from '@angular/material';
import { TacheRectifierComponent } from './users/tache-rectifier/tache-rectifier.component';
import { DetailDemandeComponent } from './users/detail-demande/detail-demande.component';
import { AuthGuardService } from './authguard/auth-guard.service';
import { ConfirmationDialogComponent } from './users/confirmation-dialog/confirmation-dialog.component';
import { CookieService } from 'ngx-cookie-service';
import { NGXCookieAPIModule, NGXCookieAPIService } from 'ngx-cookie-api-service';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { MailnodemailService } from './services/mailnodemail.service';
import localeFr from '@angular/common/locales/fr';
import { registerLocaleData } from '@angular/common';
import { DetailTacheTraiterComponent } from './daf/taches/detail-tache-traiter/detail-tache-traiter.component';
import { AssistantsComponent } from './daf/assistants/assistants.component';
registerLocaleData(localeFr);

@NgModule({
  declarations: [
    AppComponent,
    SigninComponent,
    DemandeDocumentComponent,
    AccueilUsersComponent,
    AssistantsComponent,
    AccueilHomeComponent,
    DetailTacheComponent,
    TacheRectifierComponent,
    DetailDemandeComponent,
    HeaderComponent,
    ConfirmationDialogComponent,
    PageNotFoundComponent,
    DetailTacheTraiterComponent,
    AssistantsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatButtonModule,
    BsDatepickerModule.forRoot(),
    NGXCookieAPIModule,
    NgbModule,
    MatTabsModule,
    TabsModule.forRoot()
  ],
  entryComponents: [
    ConfirmationDialogComponent
  ],
  providers: [{ provide: LOCALE_ID, useValue: 'fr-FR'},
    AuthService, AuthGuardService, EventEmitterService, CookieService, NGXCookieAPIService, MailnodemailService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
