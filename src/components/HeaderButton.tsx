import React from "react";
import { Button } from "react-native";

type Props = {
  label: string;
  onPress: () => void;
};

export default function HeaderButton({ label, onPress }: Props) {
  return <Button title={label} onPress={onPress} />;
}
