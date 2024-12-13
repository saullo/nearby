import { colors } from "@/styles/colors";
import { categoriesIcons } from "@/utils/categories-icons";
import { Pressable, PressableProps, Text } from "react-native";
import { styles } from "./styles";

type Props = Readonly<
  PressableProps & {
    name: string;
    iconId: string;
    selected?: boolean;
  }
>;

export const Category = ({
  name,
  iconId,
  selected = false,
  ...rest
}: Props) => {
  const Icon = categoriesIcons[iconId];

  return (
    <Pressable
      style={[styles.container, selected && styles.containerSelected]}
      {...rest}
    >
      <Icon size={16} color={colors.gray[selected ? 100 : 400]} />
      <Text style={[styles.name, selected && styles.nameSelected]}>{name}</Text>
    </Pressable>
  );
};
