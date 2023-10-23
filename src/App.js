import { useState } from "react";
import Web3 from "web3";


function App() {

const [isConnected, setIsConnected] = useState(false);
const [ethBalance, setEthBalance] = useState("");

const detectCurrentProvider = () => {
let provider;
if (window.ethereum) {
  provider = window.ethereum;
} else if (window.web3) {
  provider = window.web3.currentProvider;
} else {
  console.log("Non-ethereum browser detected. You should install Metamask.");
}
return provider;
};

const onConnect = async() => {
try {
  const currentProvider = detectCurrentProvider();
  if(currentProvider) {
    await currentProvider.request({method: 'eth_requestAccounts'});
    const web3 = new Web3(currentProvider);
    const userAccount = await web3.eth.getAccounts();
    const account = userAccount[0];
    let ethBalance = await web3.eth.getBalance(account);
    setEthBalance(ethBalance);
    setIsConnected(true);
  }
}catch(err) {
  console.log(err);
}
}

const onDisconnect = () => {
setIsConnected(false);
}

return (
<div className="app">
  <div className="app-header"> 
    <center><h1>Mardz Dapp</h1></center>      
  </div>
  <div className="app-wrapper">
    {!isConnected && (
      <div>
          <center><button className="app-button__login" onClick={onConnect}>
          Login
          </button></center>          
         <center>
         <h5>Metamask needed to login.</h5>
         </center>        
      </div>
      
    )}
  </div>
  {
    isConnected && (
      <div className="app-wrapper">
      
          <div className="app-details">
              <h3> You are connected to metamask.</h3>
                  <div className="app-balance">
                       <span>Balance:  </span>
                            {ethBalance}
                  </div>
          </div>          
          <div>
            <br />
              <button className="app-button__logout" onClick={onDisconnect}>
                  Disconnect
              </button>
          </div>    
          <h3> Just A Few List of Web 3.0</h3>          
    
      </div>
    )
  }
</div>
);
}

export default App;
