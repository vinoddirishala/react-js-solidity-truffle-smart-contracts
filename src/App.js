import './App.css';
import Web3 from 'web3'
import React,{Component} from 'react'

class App extends Component{

  constructor(props){
    super(props);
    this.state = {
      isWalletConnected:false,
      walletAddress:''};
  }

  render(){
    return(
      <div className="container">
          {!this.state.isWalletConnected ? <button onClick={async () => {await this.connectToMetaMask();} }>Connect to wallet</button>:null}

          <button onClick={async () => {await this.uploadAssetToIPFS();} }>Upload to IPFS</button>


      </div>
    )}


    async connectToMetaMask() {
      //check metamask installed or not
      if (window.ethereum) {
        this.askForMetaMaskSigning();
      }else{
        this.state.isWalletConnected = false;
        this.state.walletAddress = '';
        this.showInstallMetaMaskAlert();
      }
    }

    async showInstallMetaMaskAlert(){
      console.log("Install metamask");
    }

 
    async askForMetaMaskSigning(){
      let ethereum = window.ethereum;
      try {
        const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
        const account = accounts[0];
        this.state.isWalletConnected = true;
        this.state.walletAddress = account;
        
        
        } catch {
          this.state.isWalletConnected = false;
          this.state.walletAddress = '';
        }

  
    }

    async uploadAssetToIPFS(){
      console.log("Hello World");
    }


}




export default App;
