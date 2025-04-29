import React from "react";
import { View, Image, Pressable, Text } from "react-native";
import { styles } from "./styles";
//@ts-ignore
import Logo from "../../../assets/images/logo-white.svg";

interface HeaderProps {
  children?: React.ReactNode;
}

export const Header: React.FC<HeaderProps> = ({ children }) => {
  return (
    <View style={[styles.container]}>
      <View style={styles.logo}>
        <Logo width={200} />
      </View>
      {children}
    </View>
  );
};
