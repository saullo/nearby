import { FlatList } from "react-native";
import { Category } from "../category";
import { styles } from "./styles";

export type Category = {
  id: string;
  name: string;
};

type Props = Readonly<{
  data: Category[];
  selected: Category["id"];
  onSelect: (id: Category["id"]) => void;
}>;

export const Categories = ({ data, selected, onSelect }: Props) => {
  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.id}
      renderItem={({ item: { id, name } }) => (
        <Category
          name={name}
          iconId={id}
          onPress={() => onSelect(id)}
          selected={selected === id}
        />
      )}
      style={styles.container}
      contentContainerStyle={styles.content}
      horizontal
      showsHorizontalScrollIndicator
    />
  );
};
