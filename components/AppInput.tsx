import Colors from "@/constants/colors";
import React from "react";
import { Text, TextInput, View } from "react-native";

type Props = {
  label: string;
  placeholder: string;
  value?: string;
  onChangeText?: (text: string) => void;
  secureTextEntry?: boolean;
  multiline?: boolean;
};

export default function AppInput({
  label,
  placeholder,
  value,
  onChangeText,
  secureTextEntry,
  multiline = false
}: Props) {
  return (
    <View style={{ marginBottom: 18 }}>
      <Text
        style={{
          color: Colors.text,
          fontSize: 14,
          fontWeight: "600",
          marginBottom: 8
        }}
      >
        {label}
      </Text>

      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={Colors.subText}
        secureTextEntry={secureTextEntry}
        multiline={multiline}
        style={{
          backgroundColor: Colors.card,
          borderColor: Colors.border,
          borderWidth: 1,
          borderRadius: 16,
          color: Colors.white,
          paddingHorizontal: 16,
          paddingVertical: multiline ? 18 : 14,
          minHeight: multiline ? 110 : undefined,
          textAlignVertical: multiline ? "top" : "center"
        }}
      />
    </View>
  );
}