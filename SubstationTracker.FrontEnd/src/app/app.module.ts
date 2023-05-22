import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthInterceptor } from '@helpers/interceptors/auth.interceptor';
import { SpinnerInterceptor } from '@helpers/interceptors/spinner.interceptor';
import { HandleMessagesInterceptor } from '@helpers/interceptors/handle-messages.interceptor';

import { ConfirmationService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';

import { LayoutModule } from './components/layout/layout.module';
import { AppComponent } from './app.component';
import { NgxSpinnerModule } from 'ngx-spinner';

@NgModule({
	declarations: [
		AppComponent
	],
	imports: [
		BrowserModule,
		BrowserAnimationsModule,
		AppRoutingModule,
		HttpClientModule,
		LayoutModule,
		ConfirmDialogModule,
		ToastModule,
		NgxSpinnerModule
	],
	providers: [
		{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
		{ provide: HTTP_INTERCEPTORS, useClass: SpinnerInterceptor, multi: true },
		{ provide: HTTP_INTERCEPTORS, useClass: HandleMessagesInterceptor, multi: true },
		ConfirmationService
	],
	bootstrap: [AppComponent]
})
export class AppModule { }
