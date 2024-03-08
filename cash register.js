'use strict';

function checkCashRegister(price, cash, cid) {
    //calculate change
    let change = cash - price;
    console.log(change);

    //get total cash in register
    let totalCID = 0;

    




    //?check if total cash-in-drawer == to change.
    //if so, return {status: "CLOSED", change: cid}
    //This means I don't need to give any change,
    //and the register can be CLOSED.
    //?

    
    
  }
  
  checkCashRegister(3.26, 100, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]]);
  //console.log(checkCashRegister);