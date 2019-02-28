import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule} from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { GuardService } from './guard.service';
import { RouterModule } from '@angular/router';
import { routes } from './routes';
import { TagSelectComponent } from './tag-select/tag-select.component';
import { TagComponent } from './tag/tag.component';
import { UploadSingleFileComponent } from './upload-single-file/upload-single-file.component';
import { MenuComponent } from './menu/menu.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    TagSelectComponent,
    TagComponent,
    UploadSingleFileComponent,
    MenuComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes)
  ],
  providers: [
    GuardService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
