import './App.css';
import Web3 from 'web3'
import React,{Component} from 'react'

class App extends Component{


  componentWillMount(){
    this.loadBlockChainData()
  }

  async loadBlockChainData(){
    const web3 = new Web3(Web3.givenProvider || "http://localhost:3000")
    const network = await web3.eth.net.getNetworkType()
    const account = await web3.eth.getAccounts()
    console.log(network)
    console.log("account :"+account[0])
    this.setState( {walletAddress:account[0]})

  }

  constructor(props){
    super(props)
    this.state = {walletAddress:''}
  }

  render(){
    return(
      <div className="container">
          <h2>Connected wallet address : {this.state.walletAddress}</h2>
      </div>
    )
  }
}

export default App;
