import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSnackBarModule } from '@angular/material';
import { AppRoutingModule } from './app.routing';

import { DashboardModule } from './modules/dashboard/dashboard.module';
import { AuthModule } from './modules/authentication/auth.module';
import { AdminModule } from './modules/admin/admin.module';

import { DashboardService } from './modules/dashboard/dashboard.service';
import { AdminService } from './modules/admin/pages/admin/admin.service';
import { InputService } from './modules/admin/pages/input/input.service';


import { DataExchangeService } from './modules/shared/data-exchange-service/data-exchange.service';


import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    DashboardModule,
    AuthModule,
    AdminModule,
    AppRoutingModule
  ],
  providers: [
    DashboardService,
    AdminService,
    InputService,
    DataExchangeService
  ],
  //entryComponents: [GiveModal],
  bootstrap: [AppComponent]
})
export class AppModule { }
