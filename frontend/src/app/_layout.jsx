import React from "react";
import { Stack } from "expo-router";

//root layout for navigation:
export default function _layout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="Screens/AdminHomeScreen" options={{ headerShown: false }} />
      <Stack.Screen name="Screens/EventFormScreen" options={{ headerShown: false }} />
    </Stack>
  );
}
