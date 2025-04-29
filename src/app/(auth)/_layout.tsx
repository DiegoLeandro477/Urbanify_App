import React from "react";
import { Stack } from "expo-router";
import { Header } from "@/components/Header";
export default function LayoutProvideRole() {
  return (
    <>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="homePage" />
        <Stack.Screen name="adminPage" />
      </Stack>
    </>
  );
}
