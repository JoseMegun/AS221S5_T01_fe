import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ModerationListComponent } from './moderation/moderation-list/moderation-list.component';
import { ModerationFormComponent } from './moderation/moderation-form/moderation-form.component';
import { ModerationEditComponent } from './moderation/moderation-edit/moderation-edit.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'moderation'
  },
  { path: 'moderation', 
  component: ModerationListComponent 
  },
  { path: 'moderation/register',
  component: ModerationFormComponent
  },
  { path: 'moderation/edit/:id',
    component: ModerationEditComponent
  }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }