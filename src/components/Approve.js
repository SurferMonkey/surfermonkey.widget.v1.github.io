import React from 'react';
import '../styles/Approve.css';
import * as Aux from '../tools/Aux.js';

function Approve({ userMessage }) {
  // Destructure userIntention to get the tokenAddress and amount
  //const tokenAddressString = userMessage.depositPublicDataParams.ERC20_SC;
  const tokenAddress = userMessage.depositPublicDataParams.ERC20_SC;//tokenAddressString.slice(0, 6) + '...' + tokenAddressString.slice(-6);

  const amount = userMessage.depositPublicDataParams.amount;
  const amountFormat = Aux.formatBigInt(amount, userMessage.decimals, userMessage.decimals)
  const amountFormatST = amountFormat +"" 

  return (
    <div className="Approve">
      <h3>Let's give permission for SurferMonkey to use the asset</h3>
      
      <div className="input-container">
        {/* Token Address Input */}
        <label>  
        Token address
          <input 
            type="text" 
            value={tokenAddress} 
            readOnly
            disabled  // Disable the input
            placeholder="Token address" 
          />
        </label>

        {/* Amount Input */}
        <label>
        Amount (base unit):
          <input 
            type="text" 
            value={amountFormatST} 
            readOnly
            disabled  // Disable the input
            placeholder="Amount (base unit)" 
          />
        </label>
      </div>

      {/* Approve Button */}
      <div className="button-container">
        <button>Approve</button>
      </div>
    </div>
  );
}

export default Approve;