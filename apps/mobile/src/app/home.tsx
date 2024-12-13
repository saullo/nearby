import { Categories, Category } from "@/components/categories";
import { Place } from "@/components/place";
import { Places } from "@/components/places";
import { api } from "@/services/api";
import { useEffect, useState } from "react";
import { Alert, View } from "react-native";

type Market = Readonly<Place>;

const Home = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [category, setCategory] = useState<Category["id"]>("");
  const [markets, setMarkets] = useState<Market[]>([]);

  const fetchCategories = async () => {
    try {
      const { data } = await api.get<Category[]>("/categories");

      setCategories(data);
      setCategory(data[0].id);
    } catch (e) {
      Alert.alert("Categorias", "Não foi possivel carregar as categorias.");
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchMarkets = async () => {
    if (!category) {
      return;
    }

    try {
      const { data } = await api.get<Place[]>("/markets/category/" + category);

      setMarkets(data);
    } catch (e) {
      Alert.alert("Locais", "Não foi possivel carregar os locais.");
    }
  };

  useEffect(() => {
    fetchMarkets();
  }, [category]);

  return (
    <View style={{ flex: 1, backgroundColor: "#CECECE" }}>
      <Categories
        data={categories}
        selected={category}
        onSelect={setCategory}
      />
      <Places data={markets} />
    </View>
  );
};

export default Home;
