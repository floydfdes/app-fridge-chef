import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import { baseFontSize, colors, useAppFonts } from '../shared/fonts';

import recipesData from '../shared/recipes.json';

const categories = [
    { id: '1', name: 'Breakfast', key: 'breakfast' },
    { id: '2', name: 'Lunch', key: 'lunch' },
    { id: '3', name: 'Dinner', key: 'dinner' },
    { id: '4', name: 'Desserts', key: 'desserts' },
    { id: '5', name: 'Vegetarian', key: 'vegetarian' },
    { id: '6', name: 'Quick & Easy', key: 'quickAndEasy' },
];

const Explore = () => {
    const [selectedCategory, setSelectedCategory] = useState(null);
    const loaded = useAppFonts();

    if (!loaded) {
        return null;
    }

    const renderCategory = ({ item }) => (
        <TouchableOpacity
            style={styles.categoryItem}
            onPress={() => setSelectedCategory(item.key)}
        >
            <Text style={styles.categoryText}>{item.name}</Text>
        </TouchableOpacity>
    );

    const renderRecipe = ({ item }) => (
        <View style={styles.recipeCard}>
            <Image source={{ uri: item.imageUrl }} style={styles.recipeImage} />
            <View style={styles.recipeInfo}>
                <Text style={styles.recipeName}>{item.name}</Text>
                <Text style={styles.recipeCuisine}>{item.cuisine}</Text>
                <View style={styles.ratingContainer}>
                    <Text style={styles.ratingText}>{item.rating}</Text>
                </View>
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Explore Recipes</Text>
            {!selectedCategory ? (
                <FlatList
                    data={categories}
                    renderItem={renderCategory}
                    keyExtractor={item => item.id}
                    numColumns={2}
                />
            ) : (
                <>
                    <TouchableOpacity
                        style={styles.backButton}
                        onPress={() => setSelectedCategory(null)}
                    >
                        <Text style={styles.backButtonText}>Back to Categories</Text>
                    </TouchableOpacity>
                    <FlatList
                        data={recipesData[selectedCategory]}
                        renderItem={renderRecipe}
                        keyExtractor={item => item.id.toString()}
                    />
                </>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: colors.background,
    },
    title: {
        fontFamily: 'PoppinsBold',
        fontSize: baseFontSize * 1.5,
        color: colors.text,
        marginBottom: 20,
    },
    categoryItem: {
        flex: 1,
        margin: 10,
        height: 100,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.third,
        borderRadius: 10,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
    },
    categoryText: {
        fontFamily: 'Poppins',
        fontSize: baseFontSize,
        color: colors.text,
    },
    backButton: {
        backgroundColor: colors.secondary,
        padding: 10,
        borderRadius: 5,
        marginBottom: 10,
    },
    backButtonText: {
        fontFamily: 'Poppins',
        color: colors.background,
        textAlign: 'center',
    },
    recipeCard: {
        flexDirection: 'row',
        backgroundColor: colors.third,
        borderRadius: 10,
        marginBottom: 15,
        overflow: 'hidden',
    },
    recipeImage: {
        width: 100,
        height: 100,
    },
    recipeInfo: {
        flex: 1,
        padding: 10,
    },
    recipeName: {
        fontFamily: 'Poppins',
        fontSize: baseFontSize,
        color: colors.text,
    },
    recipeCuisine: {
        fontFamily: 'PoppinsLight',
        fontSize: baseFontSize * 0.8,
        color: colors.textLight,
    },
    ratingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 5,
    },
    ratingText: {
        fontFamily: 'Poppins',
        fontSize: baseFontSize * 0.8,
        color: colors.text,
    },
});

export default Explore;
