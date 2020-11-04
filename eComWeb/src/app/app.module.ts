import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { EComHomeComponent } from './e-com-home/e-com-home.component';
import { EComHeaderComponent } from './e-com-header/e-com-header.component';
import { EComFooterComponent } from './e-com-footer/e-com-footer.component';
import { EComAPIService } from './services/ecom-api.service';
import { HttpClientModule } from '@angular/common/http';
import { GlobalService } from 'src/environments/global.service';
import { EComPopoverComponent } from './cartPopOver/e-com-popover.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [AppComponent,
    EComHomeComponent,
    EComHeaderComponent,
    EComFooterComponent,
    EComPopoverComponent
  ],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule,HttpClientModule,FormsModule],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    EComAPIService,
    GlobalService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
