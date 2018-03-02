import React from 'react';

const CoinTotal = (props) => {

  let sumTotal = 0;

  for(var coin in props.firebaseData){
    for(var action in props.firebaseData[coin]){
      let coinAmt = props.firebaseData[coin][action].purchase/props.firebaseData[coin][action].rate * props.coinCurr[coin];
      sumTotal = sumTotal + coinAmt;
    }
  }

  return(
    <span>
      ${parseFloat(sumTotal.toFixed(2))}
    </span>
  )
}

export default CoinTotal;
