import { ButtonCustom } from "@/components/ButtonCustom";
import useCapture from "@/hooks/useCapture";
import { ClassColor, colors, Font } from "@/styles/global";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function Admin() {
  const { photo, handleCapture, setPhoto } = useCapture();
  const [quantReparos, setQuantReparos] = useState(4);

  return (
    <View style={styles.container}>
      <Text style={[{ marginTop: 28 }, Font.xl]}>REGISTRAR REPARO</Text>
      <TouchableOpacity style={styles.photoBox} onPress={handleCapture}>
        <Ionicons name="camera-outline" size={48} color={colors.p1} />
        <Text style={[styles.photoText, Font.m_b]}>Fotografe aqui</Text>
      </TouchableOpacity>
      <ButtonCustom
        styleCustom={{ marginTop: 40 }}
        title={"ENVIAR"}
        onPress={handleCapture}
      />
      <ButtonCustom
        gradientColors={[colors.c12, colors.c12]}
        styleCustom={styles.viewMapButton}
        title={"VISUALIZAR MAPA"}
        textCustom={[ClassColor.c0, Font.m_b]}
        onPress={() =>
          router.push({
            pathname: "/adminPage/mapping",
          })
        }
      />
      <Text style={[Font.m, ClassColor.c2, { marginTop: 16 }]}>
        Reparos pendentes na região:{" "}
        <Text style={[Font.m_b]}>{quantReparos}</Text>
      </Text>
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
  photoBox: {
    width: "100%",
    height: 150,
    borderWidth: 2,
    borderColor: colors.p1,
    borderStyle: "dashed",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 44,
    backgroundColor: "#EAF4FF",
  },
  photoText: {
    color: colors.p1,
    marginTop: 8,
  },
  viewMapButton: {
    marginTop: 24,
    borderWidth: 1,
    borderColor: colors.c2,
  },
});
