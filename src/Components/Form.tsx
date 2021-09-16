/* eslint-disable react-native/no-inline-styles */

import React from "react";
import { View, Text, TouchableOpacity, TextInput } from "react-native";
import Web3 from "web3";

export type Props = {
  balance: string;
  stakeTokens: Function;
  unStakeToken: Function;
};

export const Form: React.FC<Props> = ({ balance, stakeTokens, unStakeToken }) => {
  const [output, setOutput] = React.useState("");

  return (
    <View style={{ width: "100%", height: 300, alignItems: "center", marginTop: 50 }}>
      <View
        style={{
          height: "40%",
          width: "90%",
          justifyContent: "space-between",
          alignItems: "center",
          paddingVertical: 20,
          borderWidth: 1,
          borderRadius: 20,
          borderColor: "grey",
        }}
      >
        <View
          style={{
            flexDirection: "row",
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
            paddingHorizontal: 10,
          }}
        >
          <Text numberOfLines={1} ellipsizeMode={"tail"} style={{ fontWeight: "bold", fontSize: 15, width: "50%" }}>
            {"Stake Tokens"}
          </Text>
          <Text numberOfLines={1} ellipsizeMode={"tail"} style={{ fontWeight: "bold", fontSize: 15, width: "50%" }}>
            {"Balance = " + Web3.utils.fromWei(balance, "Ether")}
          </Text>
        </View>

        <View
          style={{
            borderWidth: 1,
            width: "80%",
            height: 50,
            borderRadius: 20,
            paddingHorizontal: 10,
            borderColor: "grey",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <TextInput
            onChangeText={(input) => {
              setOutput(input);
            }}
            keyboardType={"numeric"}
            placeholder="0"
            style={{
              width: "80%",
              height: "100%",
            }}
          />
          <Text style={{ fontWeight: "bold", width: "20%" }}>{"mDAI"}</Text>
        </View>
      </View>
      <View
        style={{
          height: "40%",
          width: "100%",
          justifyContent: "space-between",
          alignItems: "center",
          paddingVertical: 20,
        }}
      ></View>
      <View
        style={{
          height: "30%",
          width: "100%",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <TouchableOpacity
          onPress={() => {
            let value = Web3.utils.toWei(output, "Ether");
            stakeTokens(value);
          }}
          style={{
            width: "50%",
            height: "50%",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 20,
            backgroundColor: "black",
          }}
        >
          <Text style={{ color: "white", fontWeight: "bold" }}>{"STAKE!"}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            unStakeToken();
          }}
          style={{
            width: "50%",
            height: "50%",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 20,
            backgroundColor: "black",
            marginTop: 10,
          }}
        >
          <Text style={{ color: "white", fontWeight: "bold" }}>{"UNSTAKE!"}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
