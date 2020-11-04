export class GlobalService {

    private totalItemCount = 0;
    private cartData = null;
    private dataFromCartPage=null;
    private totalCheckoutAmt = 0;
   
    constructor() { }
  
    checkIfDataIsValid(data : any){
        if(data == null || data == "" || data== undefined || data == "undefined") return false;
        return true;

    }

    getTotalItemCount():any{
        return this.totalItemCount;
    }

    setTotalItemCount(count  :any){
        this.totalItemCount = count;
    }

    setCartDataObject(cartObj  :any){
        this.cartData = cartObj;
    }

    getCartDataObject():any{
        return this.cartData;
    }

    setDataFromCartPage(data){
        this.dataFromCartPage = data;
    }
    getdataFromCartPage():any{
        return this.dataFromCartPage;
    }
    getTotalCheckoutAmt():any{
        return this.totalCheckoutAmt;
    }
    settotalCheckoutAmt(amt){
        this.totalCheckoutAmt = amt;
    }
  }