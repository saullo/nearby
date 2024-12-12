import { colors } from "@/styles/colors";
import { IconProps } from "@tabler/icons-react-native";
import { ComponentType } from "react";
import { Text, View } from "react-native";
import { styles } from "./styles";

type Props = Readonly<{
  title: string;
  description: string;
  icon: ComponentType<IconProps>;
}>;

export const Step = ({ title, description, icon: Icon }: Props) => {
  return (
    <View style={styles.container}>
      <Icon size={32} color={colors.red.base} />

      <View style={styles.details}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{description}</Text>
      </View>
    </View>
  );
};
