# Supply Network (Fastkart) – React Native + Expo Router Mobile Application

This repository is a modern React Native shopping experience configured with Expo Router. It ships with a polished design system, animated components, a sample data set, and lightweight state management. The app showcases core flows such as product list, sellers, product details, and a cart screen.

- React Native: 0.79.3 (New Architecture enabled)
- React: 19.0.0
- Expo SDK: ~53.0.11
- Expo Router: ~5.1.0


## Table of Contents

- [Key Features](#key-features)
- [Demo Flow](#demo-flow)
- [Tech Stack](#tech-stack)
- [Setup and Run](#setup-and-run)
- [Architecture](#architecture)
- [Directory Structure](#directory-structure)
- [State Management (Zustand)](#state-management-zustand)
- [Design System](#design-system)
- [Core Components](#core-components)
- [Data Layer](#data-layer)
- [Development Guide](#development-guide)
- [Troubleshooting](#troubleshooting)
- [Roadmap](#roadmap)
- [Contributing and License](#contributing-and-license)


## Key Features

- Modern navigation architecture: Expo Router with `Stack` + group (`(tabs)`) layout and modal presentations
- Fluid animations: `react-native-reanimated` for list transitions, card entry animations, and an overlay menu
- Product listing: 1-2-1-2 patterned grid, featured card, and vertical price presentation (original/discounted)
- Seller view: Sorting based on rating and number of reviews; star-based rating indicator
- Product detail (modal): Blurred background, price typography, seller/category shortcuts
- Seller profile (modal): Cover image, stat boxes, product list (2-column grid)
- Overlay menu: Quick category switching and single-tap access to “Seller Profiles”
- Design system: Centralized constants for colors, typography, spacing, and shadows
- Common components: BannerCarousel, ProductCard, CustomHeader, StarRating, etc.


## Demo Flow

1. On launch, the `(tabs)/index` home screen appears. The top shows `CustomHeader`, and the content includes `BannerCarousel` and a list header for products/sellers.
2. From the banner, you can select a specific category or navigate to the “Deal of the Day”.
3. Tapping a product card opens the `product/[id]` modal detail screen. From there you can:
   - Open the seller profile `seller/[id]` using the “Seller” card,
   - Return to the home screen with the selected category via the “Collection” card,
   - Go back to the home screen (all products) with the back button.
4. From the overlay (hamburger) menu, switch between all products, a specific category, or the “Seller Profiles” view.
5. Use the cart icon in the header to open a static cart screen (`(tabs)/cart`).


## Tech Stack

- App runtime: Expo (SDK ~53)
- Navigation: Expo Router (~5.1), supports iOS/Android/Web
- Animations: `react-native-reanimated` (~3.17)
- Gestures: `react-native-gesture-handler` (^2.27)
- State management: Zustand (^5)
- UI utilities: `expo-blur`, `expo-linear-gradient`
- Types: TypeScript (strict)
- Extra: `@shopify/react-native-skia` is included but not used yet (reserved for future work)

Notes:
- `newArchEnabled: true` in `app.json` enables the RN New Architecture (Fabric/TurboModules).
- Reanimated works out-of-the-box with Expo SDK’s Babel config (no extra setup needed).


## Setup and Run

Prerequisites:
- Node.js ≥ 18
- Xcode for iOS; Android Studio for Android (with device/emulator)
- Expo CLI (optional) or use `npx expo`

Steps:

```bash
# Install dependencies
npm install

# Start the development server
npm run start

# Platform shortcuts
npm run ios
npm run android
npm run web
```

Tip: A clean Metro cache and fresh node_modules often make the first run smoother.


## Architecture

- Root layout: `app/_layout.tsx`
  - Defines the `(tabs)` group in a `Stack` and the `product/[id]` and `seller/[id]` modal screens.
- Tabs group: `app/(tabs)/_layout.tsx`
  - Contains `index`, `cart`, and `profile` screens inside `Tabs`.
  - Uses `CustomHeader` at the top and a global `OverlayMenu` (hamburger menu).
- Home: `app/(tabs)/index.tsx`
  - Category filtering, product/seller listing, banners, list animations.
- Detail screens:
  - Product: `app/product/[id].tsx` (modal presentation, blurred background)
  - Seller: `app/seller/[id].tsx` (cover image, star rating, product grid)
- Cart: `app/(tabs)/cart.tsx` (static for demo)
- Profile: `app/(tabs)/profile.tsx` (work in progress)

Navigation features:
- `presentation: 'modal'` on `Stack.Screen` opens detail views as modals.
- User flows and shortcuts are handled with `router.push`, `router.replace`, `router.dismissAll`, and `router.back`.


## Directory Structure

```
app/
  _layout.tsx                # Root Stack and modal screens
  (tabs)/
    _layout.tsx             # Tabs group and CustomHeader/OverlayMenu
    index.tsx               # Home (product/seller listings)
    cart.tsx                # Cart screen (static)
    profile.tsx             # Profile (WIP)
  product/[id].tsx          # Product detail (modal)
  seller/[id].tsx           # Seller profile (modal)

components/
  BannerCarousel.tsx        # Horizontal banners (category selection / product link)
  CustomButton.tsx          # Button component with variants
  CustomHeader.tsx          # Logo + search + cart + hamburger
  OverlayMenu.tsx           # Edge overlay with blur
  ProductCard.tsx           # Product card (default/featured)
  SearchBar.tsx             # Flexible search bar (placeholder, icons)
  StarRating.tsx            # Star rating display

constants/
  colors.ts                 # Color palette (brand/theme)
  styles.ts                 # spacing, borderRadius, shadows, typography, colors re-export

data/
  sampleProducts.ts         # Sample product and seller data

hooks/                      # (Currently placeholder files)

store/
  filterStore.ts            # View/category state with Zustand

types.ts                    # Product/Seller types
```


## State Management (Zustand)

The main view (products/sellers) and category filter live in `store/filterStore.ts`:

```ts
interface FilterState {
  viewMode: 'products' | 'sellers';
  selectedCategory: string | 'all';
  showProducts: (category: string | 'all') => void;
  showSellers: () => void;
}
```

Usage examples:

- The home screen applies a smooth transition when changing categories and calls `showProducts(newCategory)`.
- BannerCarousel triggers the same flow via `onCategorySelect(category)` when a category banner is tapped.
- The overlay menu calls `showSellers()` for “Seller Profiles” and `showProducts('all')` for “All Products”.
- On product detail, the back button returns to all products; the “Collection” shortcut applies the selected category and dismisses the modal.


## Design System

- Colors: `constants/colors.ts` (brand theme: Midnight Ink & Champagne Gold)
- Typography/Spacing/Shadows: `constants/styles.ts`
- Card/Button/Search components rely on these constants for a consistent UI.

Example price presentation (ProductCard): the original price is larger and strikethrough; the discounted price is smaller but highlighted with the brand color.


## Core Components

- BannerCarousel
  - Horizontal scrolling, “category” or “product” actions (via routing or store)
- ProductCard
  - Supports `variant: 'default' | 'featured'`; vertical price layout
- CustomHeader
  - Hamburger menu, search, cart icon (badge)
- OverlayMenu
  - Fast switching for categories and seller profiles; BlurView on iOS, translucent background on Android
- StarRating
  - Dynamic full/half/outline star combination


## Data Layer

- Sample sellers and products reside in `data/sampleProducts.ts`.
- There is no real API integration; this speeds up UI/flow iteration.
- Product types are in `types.ts`; TypeScript `strict` mode keeps types clear and sound.


## Development Guide

Add a new screen (Expo Router):

```bash
# Example: help screen
touch app/help.tsx
```

```tsx
// app/help.tsx
import { View, Text } from 'react-native';
export default function Help() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Help</Text>
    </View>
  );
}
```

Add a new category:
1. Add a new entry to the `categories` list in `OverlayMenu.tsx`.
2. Add the related product(s) into `sampleProducts.ts`.
3. Optionally create a new banner in `BannerCarousel`.

To keep design consistency:
- Use the values from `colors`, `spacing`, `typography`, `borderRadius`, `shadows`.
- Keep component variants and sizes simple and readable (e.g., `CustomButton`).


## Troubleshooting

- Metro/Cache Clearing:

  ```bash
  rm -rf node_modules && npm install
  npx expo start -c
  ```

- iOS simulator doesn’t launch:
  - Check Xcode is up-to-date and the simulator is properly installed.

- Android emulator not listed:
  - Ensure at least one AVD is configured and running in Android Studio.

- Reanimated warnings:
  - Expo SDK 53 configures Reanimated automatically. For a fresh start, try `expo start -c`.


## Roadmap

- Real cart functionality (add/remove, quantity, totals)
- Authentication and a complete profile screen
- Real search and filtering flows (integrate `SearchBar`)
- Remote API integration (REST/GraphQL)
- Rich visual effects with `@shopify/react-native-skia`
- Test infrastructure (unit/e2e) and CI
