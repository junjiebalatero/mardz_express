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
        <>
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
          <div>
            <p>Visit 4everland.org: <a href="https://7r2gg-ayaaa-aaaag-aaxsq-cai.ic0.app/" >Decentralize your Website, Application, Data and Storage.</a></p>
          </div>
          <div>
            <p>Hosted by fleek.co: <a href="https://3sxlk-ayaaa-aaaad-qeagq-cai.ic.fleek.co/" >fleek.co is hosting this app - Connect and Read smart contract</a></p>
          </div>
          <div>
            <p>Dsocial - A Decentralized alternate to Youtube: <a href="https://dwqte-viaaa-aaaai-qaufq-cai.ic0.app/@mardz" >@mardz - Watch my Dsocial Channel.</a></p>
          </div>
          <div>
            <p>Visit nuance: <a href="https://exwqn-uaaaa-aaaaf-qaeaa-cai.ic0.app/" >Blogging to the People.</a></p>
          </div>         
          <div>
            <p>Visit commonwealth.im: <a href="https://commonwealth.im/" >A community for every token.</a></p>
          </div>         
          <div>
            <p>distrikt - A Decentralized alternate to Facebook: <a href="https://az5sd-cqaaa-aaaae-aaarq-cai.ic0.app/" >Own your data and identity, make new connections, and build a community.</a></p>
          </div>         
          <div>
            <p>DSCVR - A Decentralized alternate to Reddit: <a href="https://dscvr.one/" >a decentralized social content platform</a></p>
          </div>
          <div>
            <p>Dstar Note: <a href="https://nazwh-uiaaa-aaaai-qbexq-cai.ic0.app/#/login" >all data of the notes is stored in the blockchain</a></p>
          </div>
          <div>
            <p>Visit Dmail: <a href="https://evyc3-ziaaa-aaaak-aam5a-cai.ic0.app/login" >Decentralize email</a></p>
          </div>
          <div>
            <p>Visit dbox: <a href="https://2prn7-tqaaa-aaaai-acjja-cai.ic0.app/login" >Decentralize email</a></p>
          </div>
          <div>
            <p>Visit tribes.xyz: <a href="https://www.tribes.xyz/" >Decentralize Chat. </a></p>
          </div>
          <div>
            <p>Visit oc.app: <a href="https://oc.app/" >Decentralize Chat. </a></p>
          </div>          
        </>
      </div>
    )
  }
</div>
);
}

export default App;
