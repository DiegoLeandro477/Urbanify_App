import { Font } from "@/styles/global";
import {
  ActivityIndicator,
  Dimensions,
  StyleSheet,
  Text,
  View,
} from "react-native";
import Map, { Circle, Marker } from "react-native-maps";
import simplifiedMapStyle from "@/utils/simplifiedMapStyle.json";
import { useReports } from "@/hooks/useReports";
import React, { useEffect, useRef, useState } from "react";
import MapView from "react-native-maps";
import { Report } from "@/components/Interfaces/report";
import useSyncReportsOnline from "@/hooks/useSyncReportsOnline";

interface Coordinates {
  latitude: number;
  longitude: number;
}

export default function Mapping() {
  const { getLocation } = useReports();
  const { findReportsAvaliable } = useSyncReportsOnline();
  const [coordinates, setCoordinates] = useState<Coordinates | null>(null);
  const mapRef = useRef<MapView>(null); // Referência para o mapa
  const [reports, setReports] = useState<Report[]>([]);

  useEffect(() => {
    const findReport = async () => {
      findReportsAvaliable();
    };
    const setLoc = async () => {
      console.log("buscando localização");
      const location = await getLocation();
      if (!location) {
        console.error("Localização não encontrada");
        return;
      }
      setCoordinates(location);
    };
    findReport();
    setLoc();
  }, []);

  const handleMarkerPress = (reportCoordinates: Coordinates) => {
    if (mapRef.current) {
      const zoomedRegion = {
        ...reportCoordinates,
        latitudeDelta: 0.001,
        longitudeDelta: 0.001,
      };
      mapRef.current.animateToRegion(zoomedRegion, 500);
    }
  };

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
          ref={mapRef} // Atribua a referência
          style={styles.map}
          customMapStyle={simplifiedMapStyle}
          initialRegion={{
            latitude: coordinates.latitude,
            longitude: coordinates.longitude,
            latitudeDelta: 0.005,
            longitudeDelta: 0.005,
          }}
        >
          {/* Marcador da localização atual */}
          {coordinates && (
            <Marker
              coordinate={coordinates}
              onPress={() => handleMarkerPress(coordinates)}
            />
          )}

          {/* Círculos para cada report */}
          {reports.map((report) => {
            const reportCoordinates = {
              latitude: parseFloat(report.coordinates!.latitude),
              longitude: parseFloat(report.coordinates!.longitude),
            };

            const circleColor = "red";

            return (
              <React.Fragment key={report.id}>
                <Circle
                  center={reportCoordinates}
                  radius={50} // Raio em metros
                  fillColor={`${circleColor}30`} // Cor com 30% de opacidade
                  strokeColor={circleColor}
                  strokeWidth={2}
                />

                {/* Marcador opcional para cada report */}
                <Marker
                  coordinate={reportCoordinates}
                  onPress={() => handleMarkerPress(reportCoordinates)}
                />
              </React.Fragment>
            );
          })}
        </Map>
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
