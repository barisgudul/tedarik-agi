import { Stack } from 'expo-router';
import 'react-native-reanimated';

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen
        name="product/[id]"
        options={{
          presentation: 'modal',
          headerShown: true,
          title: 'Ürün Detayı',
        }}
      />
    </Stack>
  );
}