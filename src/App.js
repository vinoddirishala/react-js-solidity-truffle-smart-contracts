import './App.css';
import Web3 from 'web3'
import React,{Component} from 'react'

class App extends Component{

  constructor(props){
    super(props);
    this.state = {isWalletConnected:false,walletAddress:''};
  }

  render(){
    return(
      <div className="container">
          {this.state.isWalletConnected ? 
          (<h3>Connected to {this.state.walletAddress}</h3>)
          :
          (
            
          <button onClick={async () => {await this.connectToMetaMask();} }>Connect to wallet</button>
          )}
      </div>
    )}


    async connectToMetaMask() {
      //check metamask installed or not
      if (window.ethereum) {
        this.askForMetaMaskSigning();
      }else{
        this.setState = {isWalletConnected:false}
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
        this.setState = {isWalletConnected:true}
        this.setState = {walletAddress:account[0]}
        console.log(account);
        
        } catch {
        
          this.setState = {isWalletConnected:false}
          this.setState = {walletAddress:''}
        }

  
    }


}




export default App;
