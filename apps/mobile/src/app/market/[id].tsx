import { Button } from "@/components/button";
import { Loading } from "@/components/loading";
import { MarketCoupon } from "@/components/market/coupon";
import { MarketCover } from "@/components/market/cover";
import { MarketDetails } from "@/components/market/details";
import { api } from "@/services/api";
import {
  BarcodeScanningResult,
  CameraView,
  useCameraPermissions,
} from "expo-camera";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { Alert, Modal, ScrollView, View } from "react-native";
import { Market as MarketProps } from "../home";

type Coupon = {
  coupon: string;
};

type SearchParams = {
  id: string;
};

const Market = () => {
  const [loading, setLoading] = useState(true);
  const [market, setMarket] = useState<MarketProps>();

  const [coupon, setCoupon] = useState<string | null>(null);
  const [couponFetching, setCouponFetching] = useState(false);

  const [isVisibleCameraModal, setIsVisibleCameraModal] = useState(false);
  const [_, requestPermission] = useCameraPermissions();

  const { id } = useLocalSearchParams<SearchParams>();

  const qrLock = useRef(false);

  const fetchMarket = async () => {
    try {
      const { data } = await api.get<MarketProps>(`/markets/${id}`);

      setMarket(data);
      setLoading(false);
    } catch (e) {
      Alert.alert("Erro", "Não foi possivel carregar o local", [
        { text: "OK", onPress: () => router.back() },
      ]);
    }
  };

  const handleOpenCamera = async () => {
    try {
      const { granted } = await requestPermission();
      if (!granted) {
        Alert.alert("Câmera", "Você precisa habilitar o uso da câmera");
        return;
      }

      qrLock.current = false;
      setIsVisibleCameraModal(true);
    } catch (e) {
      Alert.alert("Câmera", "Não foi possivel utilizar a câmera");
    }
  };

  const getCoupon = async (id: MarketProps["id"]) => {
    try {
      setCouponFetching(true);

      const {
        data: { coupon },
      } = await api.patch<Coupon>(`/coupons/${id}`);

      Alert.alert("Cupom", coupon);
      setCoupon(coupon);
    } catch (e) {
      Alert.alert("Erro", "Não foi possivel utilizar o coupon");
    } finally {
      setCouponFetching(false);
    }
  };

  const handleUseCoupon = (id: string) => {
    setIsVisibleCameraModal(false);

    Alert.alert(
      "Cupom",
      "Não é possivel reutilizar um coupon regastado. Deseja realmente resgatar o cupom?",
      [
        {
          style: "cancel",
          text: "Não",
        },
        {
          text: "Sim",
          onPress: () => getCoupon(id),
        },
      ]
    );
  };

  const onBarcodeScanned = ({ data }: BarcodeScanningResult) => {
    if (!data || qrLock.current) {
      return;
    }

    qrLock.current = true;
    handleUseCoupon(data);
  };

  useEffect(() => {
    fetchMarket();
  }, [id, coupon]);

  if (loading || !market) {
    return <Loading />;
  }

  return (
    <View style={{ flex: 1 }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <MarketCover uri={market.cover} />
        <MarketDetails data={market} />
        {coupon && <MarketCoupon code={coupon} />}
      </ScrollView>

      <View style={{ padding: 32 }}>
        <Button onPress={handleOpenCamera}>
          <Button.Title>Ler QR Code</Button.Title>
        </Button>
      </View>

      <Modal style={{ flex: 1 }} visible={isVisibleCameraModal}>
        <CameraView
          style={{ flex: 1 }}
          facing="back"
          onBarcodeScanned={onBarcodeScanned}
        />

        <View style={{ position: "absolute", bottom: 32, left: 32, right: 32 }}>
          <Button
            onPress={() => setIsVisibleCameraModal(false)}
            loading={couponFetching}
          >
            <Button.Title>Voltar</Button.Title>
          </Button>
        </View>
      </Modal>
    </View>
  );
};

export default Market;
