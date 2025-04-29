import useAsyncStorage from "@/hooks/useSyncStorage";
import { router } from "expo-router";
import React, { useEffect } from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";

const enum RoleEnum {
  ADMIN = "ADMIN",
  USER = "USER",
}

export default function ProviderRole() {
  const { getRole } = useAsyncStorage();
  useEffect(() => {
    const checkRole = async () => {
      try {
        const role = await getRole();
        if (role === RoleEnum.USER) {
          router.replace("/homePage");
        } else if (role === RoleEnum.ADMIN) {
          router.replace("/adminPage");
        }
      } catch (err) {
        console.log("[PROVIDER-ROLE]: ", err);
      }
    };

    checkRole();
  }, []);

  return (
    <View style={styles.container}>
      <ActivityIndicator size={"large"} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 32,
    justifyContent: "center",
    alignItems: "center",
    gap: 12,
  },
  text: { fontSize: 20, fontWeight: "bold" },
});
