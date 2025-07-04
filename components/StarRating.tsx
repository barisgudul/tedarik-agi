import React from 'react';
import { View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../constants/colors';

// Dinamik Yıldız Puanlama Bileşeni
export const StarRating = ({ rating, size = 16 }: { rating: number; size?: number }) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
        if (i <= rating) {
            stars.push(<Ionicons key={i} name="star" size={size} color={colors.secondary.DEFAULT} />);
        } else if (i === Math.ceil(rating) && !Number.isInteger(rating)) {
            stars.push(<Ionicons key={i} name="star-half" size={size} color={colors.secondary.DEFAULT} />);
        } else {
            stars.push(<Ionicons key={i} name="star-outline" size={size} color={colors.border} />);
        }
    }
    return <View style={{ flexDirection: 'row' }}>{stars}</View>;
};
