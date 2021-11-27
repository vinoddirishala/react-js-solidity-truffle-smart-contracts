import './App.css';
import Web3 from 'web3'
import Web3EthContract from 'web3-eth-contract'

import React,{Component} from 'react'
const config = require('./config.json');
const abiJson = require('./abi.json');


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

        Web3EthContract.setProvider(ethereum);
        let web3 = new Web3(ethereum);
        

        // ask for metamask sign transaction
        const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
        const account = accounts[0];

        const netWork = await ethereum.request({method:'net_version'});
        if (netWork == config.networks['matic-testnet'].netWorkID) {
          console.log("Perfect");
        }else{
          console.log("Switch network to "+config.networks['matic-testnet'].netWorkName);
        }

         // detect Network account change
        ethereum.on('chainChanged', function(networkId){
           console.log('chainChanged',networkId);
        });

          // listener to detect the account change
        ethereum.on('accountsChanged', function (accounts) {
          console.log('accountsChanges',accounts);
    
        });

      

        this.state.isWalletConnected = true;
        this.state.walletAddress = account;

       // console.log(abiJson);

        // fetch data from a sample smart contract using abi and contract address

        try{

        const SmartContractObj = new Web3EthContract(
          abiJson,
          "0x8016e7c45ceb286df3f2e685434665caf56d8755"
        );

        let tSupply = await SmartContractObj.methods.totalSupply().call();
        let baseUri = await SmartContractObj.methods.baseURI().call();
        let owner = await SmartContractObj.methods.owner().call();


        console.log(tSupply+"\n"+baseUri+"\n"+owner);
        }catch(err){
          console.log(err);
        }

        
        
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
