import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ModerationListComponent } from './moderation/moderation-list/moderation-list.component';
import { ModerationFormComponent } from './moderation/moderation-form/moderation-form.component';
import { ModerationEditComponent } from './moderation/moderation-edit/moderation-edit.component';

@NgModule({
  declarations: [
    AppComponent,
    ModerationListComponent,
    ModerationFormComponent,
    ModerationEditComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
