import { Card, Text } from 'react-native-paper';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import { baseFontSize, colors } from '../shared/fonts';

import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';

const RecipeCard = ({ recipe }) => (
    <TouchableOpacity>
        <Card style={styles.card}>
            <Image source={{ uri: recipe.imageUrl || 'https://picsum.photos/700' }} style={styles.image} />
            <LinearGradient
                colors={['transparent', 'rgba(0,0,0,0.8)']}
                style={styles.gradient}
            >
                <View style={styles.contentContainer}>
                    <Text style={styles.title}>{recipe.name}</Text>
                    <View style={styles.infoContainer}>
                        <Text style={styles.cuisine}>{recipe.cuisine}</Text>
                        <View style={styles.ratingContainer}>
                            <Ionicons name="star" size={16} color={colors.secondary} />
                            <Text style={styles.rating}>{recipe.rating}</Text>
                        </View>
                    </View>
                    <Text style={styles.difficulty}>{recipe.difficulty}</Text>
                </View>
            </LinearGradient>
        </Card>
    </TouchableOpacity>
);

const styles = StyleSheet.create({
    card: {
        marginBottom: 20,
        borderRadius: 15,
        overflow: 'hidden',
        elevation: 5,
    },
    image: {
        width: '100%',
        height: 200,
    },
    gradient: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        height: '100%',
        justifyContent: 'flex-end',
    },
    contentContainer: {
        padding: 15,
    },
    title: {
        fontFamily: 'PoppinsBold',
        fontSize: baseFontSize * 1.2,
        color: colors.background,
        marginBottom: 5,
    },
    infoContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 5,
    },
    cuisine: {
        fontFamily: 'PoppinsLight',
        fontSize: baseFontSize * 0.9,
        color: colors.background,
    },
    ratingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    rating: {
        fontFamily: 'Poppins',
        fontSize: baseFontSize * 0.9,
        color: colors.background,
        marginLeft: 5,
    },
    difficulty: {
        fontFamily: 'PoppinsLight',
        fontSize: baseFontSize * 0.8,
        color: colors.background,
        textTransform: 'uppercase',
    },
});

export default RecipeCard;
