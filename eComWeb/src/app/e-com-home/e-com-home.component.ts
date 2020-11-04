import { analyzeAndValidateNgModules } from '@angular/compiler';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { GlobalService } from 'src/environments/global.service';
import { EComAPIService } from '../services/ecom-api.service';

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'app-e-com-home',
  templateUrl: './e-com-home.component.html',
  styleUrls: ['e-com-home.component.scss'],
})
export class EComHomeComponent implements OnInit {

  //pageErrorMsg ="All items are out of Stock!";
  itemList: any;
  cart: any = [];

  constructor(private eComAPI: EComAPIService, private windowService: GlobalService) { }

  ngOnInit() {
    this.eComAPI.getItemList().subscribe(response => {

      if (this.windowService.checkIfDataIsValid(response['data'])) {
        // this.itemList = response['data'];
        this.itemList = this.processList(response['data']);
        console.log("itemList : ", this.itemList);
      }
    });
  }

  ngDoCheck() {
    console.log("ngDoCheck");
   
    if (this.windowService.checkIfDataIsValid(this.windowService.getdataFromCartPage()) == true) {

      
      for (let k = 0; k < this.itemList.length; k++) {
        this.itemList[k].quantity = this.itemList[k].totalQuantity;
      }
      let latestCartObject = this.windowService.getdataFromCartPage();
      
      for (let i = 0; i < latestCartObject.length; i++) {
        for (let j = 0; j < this.itemList.length; j++) {
          if (this.itemList[j].id == latestCartObject[i].id) {
            this.itemList[j].quantity = latestCartObject[i].availableQuantity;
            break;
          }
        }
      }
      this.windowService.setDataFromCartPage(null);
    }
  }

  processList(dataList: any): any {
    // console.log("processList", dataList);
    for (let i = 0; i < dataList.length; i++) {
      console.log("processList 0");
      dataList[i]['quantityOrdered'] = 0;
      dataList[i]['totalQuantity'] = dataList[i].quantity;
    }
    return dataList;
  }

  addToCart(cartItemToAdd: any) {

    var currentCount, matchFound = false;
    cartItemToAdd.quantity -= 1;
    currentCount = this.windowService.getTotalItemCount();
    this.windowService.setTotalItemCount(++currentCount);
    cartItemToAdd.quantityOrdered++;
    console.log("addToCart : ", cartItemToAdd);
    var cartItem = {
      "id": cartItemToAdd.id,
      "name": cartItemToAdd.name,
      "price": cartItemToAdd.price,
      "totalQuantity": cartItemToAdd.quantity + cartItemToAdd.quantityOrdered,
      "availableQuantity": cartItemToAdd.quantity,
      "quantityOrdered": cartItemToAdd.quantityOrdered,
      "subTotal": 0

    }

    for (let i = 0; i < this.cart.length; i++) {
      if (this.cart[i].id == cartItem.id) {
        matchFound = true;
        this.cart[i].availableQuantity = cartItemToAdd.quantity;
        this.cart[i].quantityOrdered = cartItemToAdd.quantityOrdered;
        break;
      }
    }


    if (matchFound == false) {
      this.cart.push(cartItem);
    }

    console.log("cart is ready :", this.cart);
    this.windowService.setCartDataObject(this.cart);

  }



}
