import { Stack } from 'expo-router';
import 'react-native-reanimated';

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen
        name="product/[id]"
        options={{
          headerShown: false,
          presentation: 'modal',
        }}
      />
      <Stack.Screen
        name="seller/[id]"
        options={{
          headerShown: false,
          presentation: 'modal',
        }}
      />
      {/* sellers için olan Stack.Screen tanımı buradan kaldırıldı */}
    </Stack>
  );
}