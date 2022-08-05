import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormLoginComponent } from './form-login/form-login.component';
import { FormBuilderComponent } from './form-builder/form-builder.component';
import { AboutComponent } from './form-builder/about/about.component';
import { AccountComponent } from './form-builder/account/account.component';
import { CanHelpComponent } from './form-builder/can-help/can-help.component';
import { SignUpComponent } from './sign-up/sign-up.component';

const routes: Routes = [
  { path: '', redirectTo: 'form-login', pathMatch: 'full' },
  // { path: '', component: FormLoginComponent },
  { path: 'form-login', component: FormLoginComponent },
  { path: 'sign-up', component: SignUpComponent },
  { path: 'form-builder', component: FormBuilderComponent },
  { path: 'about', component: AboutComponent },
  { path: 'account', component: AccountComponent },
  { path: 'account/:id', component: AccountComponent },
  { path: 'can-help', component: CanHelpComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
