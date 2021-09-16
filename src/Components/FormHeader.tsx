/* eslint-disable react-native/no-inline-styles */

import React from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import Web3 from "web3";

export type Props = {
  stakingBalance: string;
  rewardBalance: String;
};

export const FormHeader: React.FC<Props> = ({ stakingBalance = "0", rewardBalance = "0" }) => {
  return (
    <View
      style={{
        width: "80%",
        height: 100,
        margin: 10,
        backgroundColor: "black",
        flexDirection: "row",
      }}
    >
      <View
        style={{
          width: "50%",
          height: "100%",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text style={{ color: "white", fontWeight: "bold", margin: 5 }}>{"Staking Balance"}</Text>
        <Text style={{ color: "white", fontWeight: "bold", margin: 5 }}>
          {Web3.utils.fromWei(stakingBalance, "ether") + " mDAI"}
        </Text>
      </View>
      <View
        style={{
          width: "50%",
          height: "100%",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text style={{ color: "white", fontWeight: "bold", margin: 5 }}>{"Reward Balance"}</Text>
        <Text style={{ color: "white", fontWeight: "bold", margin: 5 }}>
          {Web3.utils.fromWei(rewardBalance, "ether") + " Tokens"}
        </Text>
      </View>
    </View>
  );
};
