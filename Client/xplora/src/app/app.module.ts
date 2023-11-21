import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { UserhomeComponent } from './userhome/userhome.component';
import { AdminhomeComponent } from './adminhome/adminhome.component';
import { AdmindashboardComponent } from './admindashboard/admindashboard.component';
import { UserdashboardComponent } from './userdashboard/userdashboard.component';
import { AdminbookingsComponent } from './adminbookings/adminbookings.component';
import { AdminprofileComponent } from './adminprofile/adminprofile.component';
import { AdminreviewsComponent } from './adminreviews/adminreviews.component';
import { AlldestinationsComponent } from './alldestinations/alldestinations.component';
import { AllusersComponent } from './allusers/allusers.component';
import { ContactusComponent } from './contactus/contactus.component';
import { DestinationformComponent } from './destinationform/destinationform.component';
import { LandingpageComponent } from './landingpage/landingpage.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { ProfileComponent } from './profile/profile.component';
import { UserbookingsComponent } from './userbookings/userbookings.component';
import { UserreviewComponent } from './userreview/userreview.component';
//import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    FooterComponent,
    LoginComponent,
    RegisterComponent,
    UserhomeComponent,
    AdminhomeComponent,
    AdmindashboardComponent,
    UserdashboardComponent,
    AdminbookingsComponent,
    AdminprofileComponent,
    AdminreviewsComponent,
    AlldestinationsComponent,
    AllusersComponent,
    ContactusComponent,
    DestinationformComponent,
    LandingpageComponent,
    NotfoundComponent,
    ProfileComponent,
    UserbookingsComponent,
    UserreviewComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    //FontAwesomeModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
