import React, { useState } from "react";
import { Modal, View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Font, colors, ClassColor } from "../../styles/global";
import { ButtonCustom } from "@/components/ButtonCustom";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { SeverityEnumType, SeverityEnum } from "@//constants/severityEnum";

interface ModalSelectedInfoProps {
  visible: boolean;
  onCreateReport: (sev: SeverityEnumType) => void;
  onRequestClose: () => void;
}

const ModalSelectedInfo: React.FC<ModalSelectedInfoProps> = ({
  visible,
  onCreateReport,
  onRequestClose,
}) => {
  const [severity, setSeverity] = useState<SeverityEnumType | undefined>(
    undefined
  );

  const selectSeverity = (sev: SeverityEnumType) => {
    console.log("SelectSeverity: ", sev);
    setSeverity(sev);
  };

  const handleConfirm = () => {
    if (severity === undefined) {
      alert("Selecione uma opção!");
      return;
    }
    onCreateReport(severity);
    setSeverity(undefined);
    onRequestClose();
  };

  const handleCancel = () => {
    setSeverity(undefined);
    onRequestClose();
  };

  return (
    <Modal /* Popup (Modal) */
      animationType="slide" // Define o tipo de animação
      transparent={true} // Tornar o fundo semitransparente
      visible={visible} // Controla a visibilidade do modal
      onRequestClose={onRequestClose} // Fechar modal ao pressionar o botão de voltar (Android)
    >
      <View style={styles.popupContainer}>
        <View style={styles.popupView}>
          <Text style={[styles.titleModal, Font.l]}>
            Avalie a Gravidade do Problema
          </Text>
          <Text style={[Font.s, { color: colors.c4 }]}>
            Selecione o nível de gravidade com base no impacto que o buraco
            causa na via
          </Text>
          <View style={styles.viewButtons}>
            <TouchableOpacity
              style={[
                { borderColor: colors.red },
                styles.buttonModal,
                { width: "47.5%" },
                severity === SeverityEnum.GRAVE && styles.buttonSelectedGrave,
              ]}
              onPress={() => selectSeverity(SeverityEnum.GRAVE)}
            >
              <MaterialCommunityIcons
                style={[
                  styles.iconClassification,
                  { backgroundColor: colors.red },
                ]}
                name="alert"
                size={20}
                color={colors.c0}
              />
              <Text style={[Font.s, ClassColor.c2]}>Grave</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.buttonModal,
                { width: "47.5%" },
                severity === SeverityEnum.MODERADO &&
                  styles.buttonSelectedModerado,
                { borderColor: colors.yellow },
              ]}
              onPress={() => selectSeverity(SeverityEnum.MODERADO)}
            >
              <MaterialCommunityIcons
                style={[
                  styles.iconClassification,
                  { backgroundColor: colors.yellow },
                ]}
                name="alert"
                size={20}
                color={colors.c0}
              />
              <Text style={[Font.s, ClassColor.c2]}>Moderado</Text>
            </TouchableOpacity>
          </View>

          <ButtonCustom
            styleCustom={[styles.buttonModal]}
            title={"ENVIAR"}
            onPress={handleConfirm}
          />
          <ButtonCustom
            title={"CANCELAR"}
            styleCustom={[
              styles.buttonModal,
              { marginTop: 10, width: "100%", justifyContent: "center" },
            ]}
            textCustom={{ color: colors.c0 }}
            gradientColors={["#fff", "#fff"]}
            onPress={handleCancel}
          />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  iconClassification: {
    padding: 8,
    borderRadius: 50,
  },
  popupContainer: {
    width: "100%",
    backgroundColor: "rgba(0,0,0, .6)",
    height: "100%",
    position: "absolute",
    zIndex: 1,
  },
  popupView: {
    backgroundColor: colors.c12,
    width: "90%",
    maxWidth: 500,
    borderRadius: 10,
    margin: "auto",
    padding: 20,
  },
  viewButtons: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 32,
  },
  buttonModal: {
    padding: 12,
    borderRadius: 10,
    borderWidth: 1,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
  },
  titleModal: {
    marginBottom: 10,
    color: colors.c2,
  },

  buttonSelectedGrave: {
    backgroundColor: "rgba(255, 62, 77, 0.6)", // cors de fundo para o botão Grave selecionado
  },
  buttonSelectedModerado: {
    backgroundColor: "rgba(255, 193, 7, 0.6)", // cors de fundo para o botão Moderado selecionado
  },
});

export default ModalSelectedInfo;
