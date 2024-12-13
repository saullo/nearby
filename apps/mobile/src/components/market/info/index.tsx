import { colors } from "@/styles/colors";
import { IconProps } from "@tabler/icons-react-native";
import { ComponentType } from "react";
import { Text, View } from "react-native";
import { styles } from "./styles";

type Props = Readonly<{
  description: string;
  icon: ComponentType<IconProps>;
}>;

export const MarketInfo = ({ description, icon: Icon }: Props) => {
  return (
    <View style={styles.container}>
      <Icon size={16} color={colors.gray[400]} />
      <Text style={styles.text}>{description}</Text>
    </View>
  );
};
