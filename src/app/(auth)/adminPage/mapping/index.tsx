import { Font } from "@/styles/global";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import MapView, { UrlTile } from "react-native-maps";

export default function Mapping() {
  return (
    <View style={styles.container}>
      <Text style={[{ marginTop: 12 }, Font.xl]}>MAPA DE OCORRÊNCIAS</Text>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: -23.5505,
          longitude: -46.6333,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        <UrlTile
          urlTemplate="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png"
          maximumZ={19}
        />
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 28,
    marginHorizontal: 16,
    paddingVertical: 20,
  },
  text: { fontSize: 20, fontWeight: "bold" },
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
});
