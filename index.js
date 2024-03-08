'use strict';

function checkCashRegister(price, cash, cid) {
    //calculate change
    let change = cash - price;
    //console.log(change);

    //get total cash in register
    let totalCID = 0;

    for (let i = 0; i < cid.length; i++) {
      //console.log(cid[i][1]);
      totalCID += cid[i][1];
    }

    //round to 2 dp
    totalCID = parseFloat(totalCID.toFixed(2));
    //console.log(totalCID);

    //?check if total cash-in-drawer == to change due.
    //if so, return {status: "CLOSED", change: cid}
    //This means I don't need to give any change,
    //and the register can be CLOSED.
    if (totalCID == change) {
      return {status: "CLOSED", change: cid}
    }

    //?check if cash-in-drawer is less than the change due.
    else if (totalCID < change) {
      return {status: "INSUFFICIENT_FUNDS", change: []}
    }
    
    else {
      //create array to hold coins and bills that make up the change
      let changeArray =[];

      //reverse mapping of the denominations and their values, so that they can be accessed later
      let denominations = [
        ["PENNY", 1.01],
        ["NICKEL", 2.05],
        ["DIME", 3.1],
        ["QUARTER", 4.25],
        ["ONE", 90],
        ["FIVE", 55],
        ["TEN", 20],
        ["TWENTY", 60],
        ["ONE HUNDRED", 100]
      ]

      //iterate over the denominations in reverse order (higest to lowest)
    for (let denomination of denominations.reverse()) {
      //console.log(denomination[1]);
      let denominationName = denomination[0];
      //console.log(denominationName);
      let denominationValue = denomination[1];
      //console.log(denominationValue);
      let cid_amount = 0;
      //iterate over cid and increment amount to cid_amount
      for (let i = 0; i < cid.length; i++) {
        if (cid[i][0] === denominationName) {
          cid_amount = cid[i][1];
          break;
        }
      }
      //console.log(`${denominationName}: ${cid_amount}`)
      //console.log(cid_amount);

      //calculate number of this denomination needed for the change
      let change_amount = 0;
      while (change >= denominationValue && cid_amount > 0) {
        change -= denominationValue;
        cid_amount -= denominationValue;
        change_amount += denominationValue;
      }

      //if any change of this denomination is needed, add it to changeArray
      if (change_amount > 0) {
        changeArray.push([denominationName, change_amount])
      }

    }

    if (change > 0) {
      //console.log({status: "INSUFFICIENT_FUNDS", change: []});
      return {status: "INSUFFICIENT_FUNDS", change: []}
    }

    console.log({status: "OPEN", change: changeArray});
    return {status: "OPEN", change: changeArray};

    }
    
  }
  
  checkCashRegister(3.26, 100, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]]);
  //console.log(checkCashRegister);