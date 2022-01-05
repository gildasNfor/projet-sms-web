import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { MainComponent } from './pages/main/main.component';
import { SignupComponent } from './pages/signup/signup.component';
import { ForgotpasswordComponent } from './pages/forgotpassword/forgotpassword.component';
import { ResetpasswordComponent } from './pages/resetpassword/resetpassword.component';
import { ContactsComponent } from './pages/contacts/contacts.component';
import { CreateContactComponent } from './pages/create-contact/create-contact.component';
import { SendSMSComponent } from './pages/send-sms/send-sms.component';
import { ViewMessagesComponent } from './pages/view-messages/view-messages.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: SignupComponent },
  { path: 'home', component: MainComponent },
  { path: 'forgot-password', component: ForgotpasswordComponent },
  { path: 'reset-password/:userId', component: ResetpasswordComponent },
  { path: 'contacts', component: ContactsComponent },
  { path: 'create-contact', component: CreateContactComponent },
  { path: 'send-sms', component: SendSMSComponent },
  { path: 'send-sms/:contactId', component: SendSMSComponent },
  { path: 'messages/:contactId', component: ViewMessagesComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
