import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { HttpClientModule } from '@angular/common/http';
import { CreateReviewComponent } from './create-review/create-review.component';
import { AssignReviewComponent } from './assign-review/assign-review.component';
import { AdminComponent } from './admin/admin.component';
import { ViewReviewsComponent } from './view-reviews/view-reviews.component';
import { ReviewDetailComponent } from './review-detail/review-detail.component';
import { AssignedReviewComponent } from './assigned-review/assigned-review.component';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    PageNotFoundComponent,
    CreateReviewComponent,
    AssignReviewComponent,
    AdminComponent,
    ViewReviewsComponent,
    ReviewDetailComponent,
    AssignedReviewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
