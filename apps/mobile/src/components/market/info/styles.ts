import { colors } from "@/styles/colors";
import { fontFamily } from "@/styles/font-family";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  text: {
    color: colors.gray[500],
    fontSize: 14,
    fontFamily: fontFamily.regular,
    lineHeight: 22.4,
  },
});
