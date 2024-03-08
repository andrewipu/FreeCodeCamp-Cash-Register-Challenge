'use strict';

function checkCashRegister(price, cash, cid) {
  //Get the change
  let change = cash - price;

  //Get total cash in register
  let totalCID = 0;
  for (let i = 0; i < cid.length; i++) {
    totalCID += cid[i][1];
  }

  //Round to 2 decimal places
  totalCID = parseFloat(totalCID.toFixed(2));

  //Check if total cash-in-drawer is equal to the change due
  if (totalCID === change) {
    return { status: "CLOSED", change: cid };
  }

  //Check if cash-in-drawer is less than the change due
  else if (totalCID < change) {
    return { status: "INSUFFICIENT_FUNDS", change: [] };
  }

  else {
    //Create an array to hold coins and bills that make up the change
    let changeArray = [];

    //Array of the denominations and their values
    let denominations = [
      ["PENNY", 0.01],
      ["NICKEL", 0.05],
      ["DIME", 0.1],
      ["QUARTER", 0.25],
      ["ONE", 1],
      ["FIVE", 5],
      ["TEN", 10],
      ["TWENTY", 20],
      ["ONE HUNDRED", 100]
    ];

    //Iterate over the denominations in reverse order (highest to lowest)
    for (let denomination of denominations.reverse()) {
      let denominationName = denomination[0];
      let denominationValue = denomination[1];

      let cid_amount = 0;
      //Iterate over cid and get the amount of the current denomination
      for (let i = 0; i < cid.length; i++) {
        if (cid[i][0] === denominationName) {
          cid_amount = cid[i][1];
          break;
        }
      }

      //Calculate the number of this denomination needed for the change
      let change_amount = 0;
      let temp_change = change; //Store the original change value
      while (temp_change >= denominationValue && cid_amount >= denominationValue) {
        temp_change = parseFloat((temp_change - denominationValue).toFixed(2));
        cid_amount -= denominationValue;
        change_amount += denominationValue;
      }
      change = temp_change; 

      //If any change of this denomination is needed, add it to changeArray
      if (change_amount > 0) {
        changeArray.push([denominationName, change_amount]);
      }
    }

    // After the loop, check if there is any remaining change
    if (change > 0) {
      return { status: "INSUFFICIENT_FUNDS", change: [] };
    }

    // If we reach this point, it means we can return the exact change
    return { status: "OPEN", change: changeArray };
  }
}

//console.log(checkCashRegister(19.5, 20, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]]));
//console.log(checkCashRegister(3.26, 100, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]]));
checkCashRegister(3.26, 100, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]]);
//checkCashRegister(3.26, 100, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]]);