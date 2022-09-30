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
    <center><h5>When you click and nothing happens that means your browser has no Metamask installed.</h5></center>
  </div>
  <div className="app-wrapper">
    {!isConnected && (
      <div>
          <center><button className="app-button__login" onClick={onConnect}>
          Login
          </button></center>
      </div>
    )}
  </div>
  {isConnected && (
    <div className="app-wrapper">
      <center>
        <div className="app-details">
                  <h2> You are connected to metamask.</h2>
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
          <br />
            <div>
              <img
                src="https://gw.crustapps.net/ipfs/QmNgoacgbARoSn9vhAPYdDMzSnsow7dFCfHzeZKftJ1hRD/"
                alt="junjie"
              />
        </div>
      </center>
    </div>
  )
  }
</div>
);
}

export default App;