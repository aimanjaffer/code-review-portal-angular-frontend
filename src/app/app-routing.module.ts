import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { LoginComponent } from './login/login.component';
import { CreateReviewComponent } from './create-review/create-review.component';
import { AssignReviewComponent } from './assign-review/assign-review.component';
import { AdminComponent } from './admin/admin.component';
import { ViewReviewsComponent } from './view-reviews/view-reviews.component';
import { ReviewDetailComponent } from './review-detail/review-detail.component';
import { AssignedReviewComponent } from './assigned-review/assigned-review.component';


const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'home', component: HomeComponent, children: [
    {path: '', component: ViewReviewsComponent},
    {path: 'create-review', component: CreateReviewComponent},
    {path: 'assign-review/:id', component: AssignReviewComponent},
    {path: 'admin', component: AdminComponent},
    {path: 'review/:id', component: ReviewDetailComponent},
    {path: 'assigned-review/:id', component: AssignedReviewComponent}
  ]},
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: '*', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
