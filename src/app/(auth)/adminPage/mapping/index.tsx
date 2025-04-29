import { Font } from "@/styles/global";
import {
  ActivityIndicator,
  Dimensions,
  StyleSheet,
  Text,
  View,
} from "react-native";
import Map from "react-native-maps";
import simplifiedMapStyle from "@/utils/simplifiedMapStyle.json";
import { useReports } from "@/hooks/useReports";
import { useEffect, useState } from "react";

interface Coordinates {
  latitude: number;
  longitude: number;
}

export default function Mapping() {
  const { getLocation } = useReports();
  const [coordinates, setCoordinates] = useState<Coordinates | null>(null);

  useEffect(() => {
    const setLoc = async () => {
      console.log("buscando localização");
      const location = await getLocation();
      if (!location) {
        console.error("Localização não encontrada");
        return;
      }
      setCoordinates(location);
    };
    setLoc();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={[{ marginTop: 30 }, Font.xl]}>MAPA DE OCORRÊNCIAS</Text>
      {coordinates === null ? (
        <View style={styles.loadingContainer}>
          {/* Substitua o Text por ActivityIndicator */}
          <ActivityIndicator
            size="large"
            color="#0000ff" // Cor do spinner (pode ser ajustada)
          />
          <Text style={styles.loadingText}>Carregando ocorrências</Text>
        </View>
      ) : (
        <Map
          style={styles.map}
          customMapStyle={simplifiedMapStyle}
          initialRegion={{
            latitude: coordinates.latitude,
            longitude: coordinates.longitude,
            latitudeDelta: 0.005,
            longitudeDelta: 0.005,
          }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    flex: 1,
  },
  loadingContainer: {
    marginTop: "50%",
    justifyContent: "center", // Centraliza verticalmente
    alignItems: "center", // Centraliza horizontalmente
  },
  loadingText: {
    marginTop: 10, // Espaço entre o spinner e o texto
    fontSize: 16,
    color: "#555",
  },
  text: { fontSize: 20, fontWeight: "bold" },
  map: {
    flex: 1,
  },
});
