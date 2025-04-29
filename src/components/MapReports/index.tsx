import React from "react";
import { View, StyleSheet } from "react-native";
import MapView, { Marker, Circle, PROVIDER_GOOGLE } from "react-native-maps";
import { useNavigation } from "@react-navigation/native";

const MapReports = ({ reports }: any) => {
  const [region, setRegion] = React.useState({
    latitude: -2.5387,
    longitude: -44.2825,
    latitudeDelta: 2,
    longitudeDelta: 2,
  });

  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        region={region}
        onRegionChangeComplete={setRegion}
      ></MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: "100%",
    height: "100%",
  },
});

export default MapReports;
