import { Market } from "@/app/home";
import { IconMapPin, IconPhone, IconTicket } from "@tabler/icons-react-native";
import { Text, View } from "react-native";
import { MarketInfo } from "../info";
import { styles } from "./styles";

type Props = Readonly<{
  data: Market;
}>;

export const MarketDetails = ({
  data: { name, description, address, phone, coupons, rules },
}: Props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.name}>{name}</Text>
      <Text style={styles.description}>{description}</Text>

      <View style={styles.group}>
        <Text style={styles.title}>Informações</Text>

        <MarketInfo
          description={`${coupons} cupons disponíveis`}
          icon={IconTicket}
        />
        <MarketInfo description={address} icon={IconMapPin} />
        <MarketInfo description={phone} icon={IconPhone} />
      </View>

      <View style={styles.group}>
        <Text style={styles.title}>Regulamento</Text>

        {rules.map(({ id, description }) => (
          <Text key={id} style={styles.rule}>
            {`\u2022 ${description}`}
          </Text>
        ))}
      </View>
    </View>
  );
};
