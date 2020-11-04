import { Component, ViewEncapsulation } from '@angular/core';
import { NavParams, PopoverController } from "@ionic/angular";
import { GlobalService } from 'src/environments/global.service';

@Component({
    encapsulation: ViewEncapsulation.None,
    selector: 'e-com-popover',
    templateUrl: './e-com-popover.component.html',
    styleUrls: ['e-com-popover.component.scss']
})
export class EComPopoverComponent {

    cartObject: any;
    totalCheckoutAmount = 0;
    constructor(private popover: PopoverController, public navParams: NavParams, public windowService: GlobalService) {

        this.cartObject = this.navParams.get('cart');
        console.log(" cartObj is popover : ", this.cartObject);
        if(this.windowService.checkIfDataIsValid(this.cartObject) == true){
            this.calculateTotalCheckoutAmt();
        }
        
    }

    ClosePopover() {


        if(this.windowService.checkIfDataIsValid(this.cartObject) == false ){
            this.popover.dismiss("empty");

        }else{
            for (let i = 0; i < this.cartObject.length; i++) {
                console.log("this.cartObject[index].quantityOrdered : ", this.cartObject[i]);
                this.cartObject[i].availableQuantity = this.cartObject[i].totalQuantity - this.cartObject[i].quantityOrdered;
            }
            this.popover.dismiss(this.cartObject);
        }
        

    }
    calculateTotalCheckoutAmt() {
        for (let i = 0; i < this.cartObject.length; i++) {
            this.cartObject[i].subTotal = this.cartObject[i].price * this.cartObject[i].quantityOrdered;
            this.totalCheckoutAmount = this.totalCheckoutAmount + this.cartObject[i].subTotal;
        }
    }

    removeFromCart(index) {
        console.log("remove from cart ", index)
        this.totalCheckoutAmount = this.totalCheckoutAmount - this.cartObject[index].subTotal;
        /*  let self = this;
         setTimeout(function(){
             self.totalCheckoutAmount = self.totalCheckoutAmount-self.cartObject[index].subTotal;
             alert(self.totalCheckoutAmount);
         },100); */
      
        this.setCounterForAppHeader(index);
        this.cartObject.splice(index, 1);
    }

    setCounterForAppHeader(index) {
        let tempItemCount = this.windowService.getTotalItemCount();
        tempItemCount -= this.cartObject[index].quantityOrdered;
        this.windowService.setTotalItemCount(tempItemCount);
    }

    changeInQuantity(index) {
        console.log("chnage in input : ", index);

        if (this.cartObject[index].quantityOrdered > this.cartObject[index].totalQuantity) {
            alert("Available stock is only  :" + this.cartObject[index].totalQuantity + " units");
            let self = this;
            setTimeout(function () {
                self.cartObject[index].quantityOrdered = self.cartObject[index].totalQuantity;
                self.cartObject[index].subTotal = self.cartObject[index].quantityOrdered * self.cartObject[index].price;
            }, 100);
        } else {
            this.cartObject[index].subTotal = this.cartObject[index].quantityOrdered * this.cartObject[index].price;
        }
        this.totalCheckoutAmount = 0;
        let totalItemCount = 0;
        for (let i = 0; i < this.cartObject.length; i++) {
            console.log("this.cartObject[index].quantityOrdered : ", this.cartObject[i]);
            this.totalCheckoutAmount = this.totalCheckoutAmount + this.cartObject[i].subTotal;
            totalItemCount += this.cartObject[i].quantityOrdered; // calculating total count of header
        }
        console.log("totalItemCount : ", totalItemCount);
        this.windowService.setTotalItemCount(0);
        this.windowService.setTotalItemCount(totalItemCount);// setting total count of header

    }

    checkout(){
        alert("Your total payable amount is:" +this.totalCheckoutAmount);
    }

    ngOnDestroy(){
        this.windowService.settotalCheckoutAmt(this.totalCheckoutAmount);
    }
}
