/* eslint-disable react-hooks/exhaustive-deps */
import "../shim";
import Web3 from "web3";
import "../shim";
import React, { useEffect, useState } from "react";
import { Alert, FlatList, SafeAreaView, Text, TouchableOpacity, View } from "react-native";
import { Header } from "./Components/header";
// import { Main } from "./Components/Main";
import { Loader } from "./Components/loader";
import HDWalletProvider from "@truffle/hdwallet-provider";
import { PRIVATE_KEYS, PROVIDER } from "./constants";
import TokenAbi from "./abis/Token.json";
import DaiTokenAbi from "./abis/DaiToken.json";
import TokenFarmAbi from "./abis/TokenFarm.json";
import { FormHeader } from "./Components/FormHeader";
import { Form } from "./Components/Form.tsx";

function App() {
  const [account, setAccount] = useState("");
  const [daiToken, setDaiToken] = useState("");
  const [token, setToken] = useState("");
  const [tokenFarm, setTokenFarm] = useState("");
  const [daiTokenBalance, setDaiTokenBalance] = useState("");
  const [tokenBalance, setTokenBalance] = useState("");
  const [stakingBalance, setStakingBalance] = useState("");
  const [loader, setLoader] = useState(false);

  var hdWalletProvider = new HDWalletProvider({
    privateKeys: PRIVATE_KEYS,
    providerOrUrl: PROVIDER,
    numberOfAddresses: 1,
  });
  var web3 = new Web3(hdWalletProvider);
  useEffect(() => {
    setLoader(true);
    const init = async () => {
      await loadBlockChainData();
    };
    init();
  }, []);

  async function loadBlockChainData() {
    console.log("Load Block Data ===> "); // Init Web3 Block Chain
    let accounts = await web3.eth.getAccounts();
    console.log("Accounts Address ====> ", accounts);
    let balance = await web3.eth.getBalance(accounts[0]);
    console.log("balance === > ", balance);
    setAccount(accounts[0]);
    const networkID = await web3.eth.net.getId();

    const DaeTokenData = DaiTokenAbi.networks[networkID];
    if (DaeTokenData) {
      const ABI = DaiTokenAbi.abi;
      const address = DaeTokenData.address;
      const daiTokenContract = new web3.eth.Contract(ABI, address);
      console.log("daiTokenContract ====> ", daiTokenContract);
      setDaiToken(daiTokenContract);
      let daiTokenBalance = await daiTokenContract.methods.balanceOf(accounts[0]).call();
      console.log("daiTokenBalance.toString()", daiTokenBalance.toString());
      setDaiTokenBalance(daiTokenBalance.toString());
      console.log("daiTokenBalance --- > ", daiTokenBalance);
    } else {
      alert("Dai Token Smart Contract is not Deployed to Network");
    }

    const TokenData = TokenAbi.networks[networkID];
    if (TokenData) {
      const ABI = TokenAbi.abi;
      const address = TokenData.address;
      const tokenContract = new web3.eth.Contract(ABI, address);
      console.log("TokenContract ====> ", tokenContract);
      setToken(tokenContract);
      let tokenBalance = await tokenContract.methods.balanceOf(accounts[0]).call();
      console.log("TokenBalance.toString()", tokenBalance.toString());
      setTokenBalance(tokenBalance.toString());
      console.log("tokenBalance --- > ", tokenBalance);
    } else {
      alert(" Token Smart Contract is not Deployed to Network");
    }

    const TokenFarmData = TokenFarmAbi.networks[networkID];
    if (TokenFarmData) {
      const ABI = TokenFarmAbi.abi;
      const address = TokenFarmData.address;
      const tokenFarmContract = new web3.eth.Contract(ABI, address);
      console.log("TokenContract ====> ", tokenFarmContract);
      setTokenFarm(tokenFarmContract);
      let tokenFarmBalance = await tokenFarmContract.methods.stakingBalance(accounts[0]).call();
      console.log("tokenFarmBalance.toString()", tokenFarmBalance.toString());
      setStakingBalance(tokenFarmBalance.toString());
      console.log("tokenBalance --- > ", tokenFarmBalance);
    } else {
      alert(" Token Smart Contract is not Deployed to Network");
    }

    setLoader(false);
  }

  function stakeTokens(amount: any) {
    setLoader(true);
    daiToken.methods
      .approve(tokenFarm._address, amount)
      .send({ from: account })
      .on("transactionHash", (hash: any) => {
        console.log("hash", hash);
      })
      .on("confirmation", async (confirmation: number) => {
        if (confirmation === 1) {
          tokenFarm.methods
            .StakeTokens(amount)
            .send({ from: account, gas: 3000000 })
            .on("transactionHash", (hash: any) => {
              console.log(" stakeTokens transactionHash  ", hash);
            })
            .on("confirmation", async (confirmation: number) => {
              if (confirmation === 1) {
                await loadBlockChainData();
              }
            });
        }
      });
  }

  function unstakeTokens() {
    setLoader(true);
    tokenFarm.methods
      .unstakeTokens()
      .send({ from: account })
      .on("transactionHash", (hash: any) => {
        console.log("Unstake Tokens Hash", hash);
      })
      .on("confirmation", async (confirmation: number) => {
        if (confirmation === 1) {
          await loadBlockChainData();
        }
      });
  }

  return (
    <SafeAreaView style={{ flex: 1, alignItems: "center" }}>
      <Header title={"Token Farm (Defi)"} accountAddress={account} />
      <Loader isLoading={loader} />

      <View style={{ width: "100%", height: "100%", alignItems: "center" }}>
        <FormHeader stakingBalance={stakingBalance} rewardBalance={tokenBalance} />

        <Form
          balance={daiTokenBalance}
          stakeTokens={(value: string) => {
            stakeTokens(value);
          }}
          unStakeToken={(value: string) => {
            unstakeTokens();
          }}
        />
      </View>
    </SafeAreaView>
  );
}

export default App;
