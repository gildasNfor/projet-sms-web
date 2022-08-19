import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
// import { AlertModule } from 'ngx-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { MainComponent } from './pages/main/main.component';
import { SidebarComponent } from './pages/sidebar/sidebar.component';
import { ForgotpasswordComponent } from './pages/forgotpassword/forgotpassword.component';
import { ResetpasswordComponent } from './pages/resetpassword/resetpassword.component';
import { ContactsComponent } from './pages/contacts/contacts.component';
import { CreateContactComponent } from './pages/create-contact/create-contact.component';
import { SendSMSComponent } from './pages/send-sms/send-sms.component';
import { ViewMessagesComponent } from './pages/view-messages/view-messages.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    MainComponent,
    SidebarComponent,
    ForgotpasswordComponent,
    ResetpasswordComponent,
    ContactsComponent,
    CreateContactComponent,
    SendSMSComponent,
    ViewMessagesComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, NgbModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
