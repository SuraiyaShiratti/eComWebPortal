import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { GlobalService } from 'src/environments/global.service';
import { EComPopoverComponent } from '../cartPopOver/e-com-popover.component';

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'app-e-com-header',
  templateUrl: './e-com-header.component.html',
  styleUrls: ['e-com-header.component.scss'],
})
export class EComHeaderComponent implements OnInit {

  constructor(private windowService: GlobalService,private popover: PopoverController) { }

  ngOnInit() {}


  async createPopover(ev: any) {

    
    const pop = await this.popover.create({
      component: EComPopoverComponent,
      cssClass: 'custom-popover',
      event: ev,
      translucent: true,
      backdropDismiss : false,
      componentProps: {
        "cart": this.windowService.getCartDataObject(),
      }
    });

    pop.onDidDismiss()
    .then((data) => {
      const cartData = data['data']; 
      console.log("on dissmiss : ", cartData);
      this.windowService.setDataFromCartPage(cartData);
  });
    return await pop.present();
  }
}
