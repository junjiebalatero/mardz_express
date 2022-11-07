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
    <center><h1>Mardz Web 3.0</h1></center>      
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
        <center>
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
          <div>
            <p>My NFT created in Opensea.io: <a href="https://opensea.io/mardzreal57" target="_blank">mardzreal57</a></p>
          </div>         
          <div>
            <p>My code in Github: <a href="https://github.com/junjiebalatero" target="_blank">@junjiebalatero</a></p>
          </div>
          <div>
            <p>Hosted by 4everland: <a href="https://7r2gg-ayaaa-aaaag-aaxsq-cai.ic0.app/" target="_blank">My web 3.0 dApp</a></p>
          </div>
          <div>
            <p>Hosted by fleek.co: <a href="https://3sxlk-ayaaa-aaaad-qeagq-cai.ic.fleek.co/" target="_blank">Read smart contract</a></p>
          </div>
          <div>
            <p>Dsocial: <a href="https://dwqte-viaaa-aaaai-qaufq-cai.ic0.app/@mardz" target="_blank">Visit My Dsocial Channel</a></p>
          </div>
          <div>
            <p>IC Blogsite: <a href="https://dwqte-viaaa-aaaai-qaufq-cai.ic0.app/@mardz" target="_blank">Post what's in your mind</a></p>
          </div>
          <div>
            <p>A Clone Discord: <a href="https://commonwealth.im/" target="_blank">Build a community</a></p>
          </div>
          <div>
            <p>Like a Telegram: <a href="https://www.tribes.xyz/" target="_blank">Chat here. </a></p>
          </div>
          <div>
            <p>Like a Facebook: <a href="https://az5sd-cqaaa-aaaae-aaarq-cai.ic0.app/" target="_blank">Add Friends and Connect. </a></p>
          </div>
          <div>
            <p>Visit Dmail: <a href="https://evyc3-ziaaa-aaaak-aam5a-cai.ic0.app/login" target="_blank">Just an email in web3.0 </a></p>
          </div>
        </center>
      </div>
    )
  }
</div>
);
}

export default App;
