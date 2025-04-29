import React from "react";
import { Stack } from "expo-router";
import { Header } from "@/components/Header";

export default function AdminLayout() {
  return (
    <>
      <Stack screenOptions={{ headerShown: true }}>
        <Stack.Screen
          name="index"
          options={{
            header: () => <Header />,
          }}
        />
        <Stack.Screen
          name="mapping/index"
          options={{
            header: () => <Header />,
          }}
        />
      </Stack>
    </>
  );
}
