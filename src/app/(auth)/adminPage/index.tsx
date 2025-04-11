import { ButtonCustom } from "@/components/ButtonCustom";
import useCapture from "@/hooks/useCapture";
import { colors, Font } from "@/styles/global";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function Admin() {
  const { photo, handleCapture, setPhoto } = useCapture();

  return (
    <View style={styles.container}>
      <Text style={[{ marginTop: 28 }, Font.xl]}>Registrar serviço</Text>
      <TouchableOpacity style={styles.photoBox} onPress={handleCapture}>
        <Ionicons name="camera-outline" size={48} color={colors.p1} />
        <Text style={styles.photoText}>Fotografe aqui</Text>
      </TouchableOpacity>
      <ButtonCustom
        styleCustom={{ marginTop: 21 }}
        title={"ENVIAR"}
        onPress={handleCapture}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 32,
    alignItems: "center",
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
    marginTop: 24,
    backgroundColor: "#EAF4FF",
  },
  photoText: {
    color: colors.p1,
    fontSize: 16,
    marginTop: 8,
  },
});
