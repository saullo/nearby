import { Categories, Category } from "@/components/categories";
import { Place } from "@/components/place";
import { Places } from "@/components/places";
import { api } from "@/services/api";
import { colors } from "@/styles/colors";
import { fontFamily } from "@/styles/font-family";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { Alert, Text, View } from "react-native";
import MapView, { Callout, Marker, Region } from "react-native-maps";

export type Market = Readonly<
  Place & {
    latitude: number;
    longitude: number;
    phone: string;
    rules: {
      id: string;
      description: string;
    }[];
  }
>;

const initialRegion: Region = {
  latitude: -23.561187293883442,
  latitudeDelta: 0.01,
  longitude: -46.656451388116494,
  longitudeDelta: 0.01,
};

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
      const { data } = await api.get<Market[]>("/markets/category/" + category);

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

      <MapView style={{ flex: 1 }} initialRegion={initialRegion}>
        <Marker
          identifier="current"
          coordinate={{
            latitude: initialRegion.latitude,
            longitude: initialRegion.longitude,
          }}
          image={require("@/assets/location.png")}
        />

        {markets.map(({ id, name, address, latitude, longitude }) => (
          <Marker
            key={id}
            identifier={id}
            coordinate={{
              latitude,
              longitude,
            }}
          >
            <Callout onPress={() => router.navigate(`/market/${id}`)}>
              <View>
                <Text
                  style={{
                    fontSize: 14,
                    color: colors.gray[600],
                    fontFamily: fontFamily.medium,
                  }}
                >
                  {name}
                </Text>
                <Text
                  style={{
                    fontSize: 12,
                    color: colors.gray[600],
                    fontFamily: fontFamily.regular,
                  }}
                >
                  {address}
                </Text>
              </View>
            </Callout>
          </Marker>
        ))}
      </MapView>

      <Places data={markets} />
    </View>
  );
};

export default Home;
