import React from "react";
import { Text } from "react-native";

const iconMap = {
  home: "♡",
  search: "♢",
  favorites: "♧",
  profile: "♤",
  profile2: "♤"
};

const Icon = ({ name, color, style, ...props }) => {
  const icon = iconMap[name];

  return <Text style={[{ fontSize: 26, color }, style]}>{icon}</Text>;
};

export default Icon;