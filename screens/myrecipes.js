import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { baseFontSize, colors, useAppFonts } from '../shared/fonts';

import { FontAwesome } from '@expo/vector-icons';
import React from 'react';
import recipesData from '../shared/recipes.json';

const RecipeCard = ({ recipe }) => (
    <View style={styles.recipeCard}>
        <Image source={{ uri: recipe.imageUrl }} style={styles.recipeImage} />
        <View style={styles.recipeInfo}>
            <Text style={styles.recipeName}>{recipe.name}</Text>
            <Text style={styles.recipeCuisine}>{recipe.cuisine}</Text>
            <View style={styles.ratingContainer}>
                <FontAwesome name="star" size={16} color={colors.secondary} />
                <Text style={styles.ratingText}>{recipe.rating}</Text>
            </View>
        </View>
    </View>
);

const MyRecipes = () => {
    const loaded = useAppFonts();

    if (!loaded) {
        return null;
    }

    return (
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.heading}>My Recipes</Text>
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>My Creations</Text>
                {recipesData.myRecipes.map((recipe) => (
                    <RecipeCard key={recipe.id} recipe={recipe} />
                ))}
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Popular Recipes</Text>
                {recipesData.popularRecipes.map((recipe) => (
                    <RecipeCard key={recipe.id} recipe={recipe} />
                ))}
            </View>

            <TouchableOpacity style={styles.addButton}>
                <Text style={styles.addButtonText}>Add New Recipe</Text>
            </TouchableOpacity>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
    },
    header: {
        padding: 20,
        backgroundColor: colors.primary,
    },
    heading: {
        fontFamily: 'PoppinsBold',
        fontSize: baseFontSize * 1.5,
        color: colors.third,
    },
    section: {
        padding: 20,
    },
    sectionTitle: {
        fontFamily: 'PoppinsBold',
        fontSize: baseFontSize * 1.2,
        color: colors.text,
        marginBottom: 10,
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
        marginLeft: 5,
    },
    addButton: {
        backgroundColor: colors.secondary,
        paddingVertical: 15,
        paddingHorizontal: 20,
        borderRadius: 25,
        alignSelf: 'center',
        marginVertical: 20,
    },
    addButtonText: {
        fontFamily: 'Poppins',
        color: colors.background,
        fontSize: baseFontSize,
    },
});

export default MyRecipes;