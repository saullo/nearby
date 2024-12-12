import { colors } from "@/styles/colors";
import { IconProps as TablerIconProps } from "@tabler/icons-react-native";
import { ComponentType } from "react";
import {
  ActivityIndicator,
  Text,
  TextProps,
  TouchableOpacity,
  TouchableOpacityProps,
} from "react-native";
import { styles } from "./styles";

type Props = TouchableOpacityProps &
  Readonly<{
    loading?: boolean;
  }>;

const Button = ({ children, style, loading = false, ...rest }: Props) => {
  return (
    <TouchableOpacity
      style={[styles.container, style]}
      activeOpacity={0.8}
      disabled={loading}
      {...rest}
    >
      {loading ? (
        <ActivityIndicator size="small" color={colors.gray[100]} />
      ) : (
        children
      )}
    </TouchableOpacity>
  );
};

const Title = ({ children }: TextProps) => {
  return <Text style={styles.title}>{children}</Text>;
};

Button.Title = Title;

type IconProps = Readonly<{
  icon: ComponentType<TablerIconProps>;
}>;

const Icon = ({ icon: Icon }: IconProps) => {
  return <Icon size={24} color={colors.gray[100]} />;
};

Button.Icon = Icon;

export { Button };
