import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CallComponent } from './Visual-Consultation-App/call/call.component';

const routes: Routes = [
  { path: 'call/:room', component: CallComponent },
  { path: '', redirectTo: '/call/room1', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
