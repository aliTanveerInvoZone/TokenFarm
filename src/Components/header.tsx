/* eslint-disable react-native/no-inline-styles */

import React from "react";
import { Button, StyleSheet, Text, View } from "react-native";

export type Props = {
  title: string;
  accountAddress: String;
};

export const Header: React.FC<Props> = ({ title = "", accountAddress = "" }) => {
  return (
    <View
      style={{
        width: "100%",
        height: 60,
        backgroundColor: "black",
        flexDirection: "row",
      }}
    >
      <View
        style={{
          width: "30%",
          height: "100%",
          justifyContent: "center",
          alignItems: "flex-start",
          paddingHorizontal: 20,
        }}
      >
        <Text style={{ color: "white", fontSize: 15 }}>{title}</Text>
      </View>
      <View
        style={{
          width: "70%",
          height: "100%",
          justifyContent: "center",
          alignItems: "flex-end",
          paddingHorizontal: 20,
        }}
      >
        <Text style={{ color: "white", fontSize: 10 }}>{"Acc:" + accountAddress}</Text>
      </View>
    </View>
  );
};
