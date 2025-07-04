// app/(tabs)/_layout.tsx - Tabs (veya Grup) Layout
import React, { useState } from 'react';
import { Tabs } from 'expo-router';
import CustomHeader from '../../components/CustomHeader';
import OverlayMenu from '../../components/OverlayMenu';

export default function TabsLayout() {
  const [isMenuVisible, setMenuVisible] = useState(false);
  const openMenu = () => setMenuVisible(true);
  const closeMenu = () => setMenuVisible(false);

  return (
    <>
      <Tabs
        screenOptions={{
          header: () => <CustomHeader onMenuPress={openMenu} />,
          tabBarStyle: { display: 'none' },
        }}
      >
        <Tabs.Screen
          name="index"
        />
        <Tabs.Screen
          name="cart"
        />
        <Tabs.Screen
          name="profile"
        />
      </Tabs>
      <OverlayMenu isVisible={isMenuVisible} onClose={closeMenu} />
    </>
  );
}
