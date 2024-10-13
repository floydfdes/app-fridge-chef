import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { baseFontSize, colors } from '../shared/fonts'; // Adjust the path as necessary

import RecipeCard from '../components/RecipeCard'; // Assuming RecipeCard is a separate component
import { getRecipes } from '../services/api';

const MyRecipes = () => {
    const [myRecipes, setMyRecipes] = useState([]);
    const [popularRecipes, setPopularRecipes] = useState([]);

    useEffect(() => {
        fetchRecipes();
    }, []);

    const fetchRecipes = async () => {
        try {
            const recipesData = await getRecipes();
            setMyRecipes(recipesData.recipes.slice(0, 5));
            setPopularRecipes(recipesData.recipes.slice(5, 10));
        } catch (error) {
            console.error('Error fetching recipes:', error);
            // Handle error (e.g., show an alert)
        }
    };

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.sectionTitle}>My Recipes</Text>
            <View style={styles.recipeList}>
                {myRecipes.map((recipe) => (
                    <RecipeCard key={recipe.id?.toString() || `my-${recipe.name}`} recipe={recipe} />
                ))}
            </View>

            <Text style={styles.sectionTitle}>Popular Recipes</Text>
            <View style={styles.recipeList}>
                {popularRecipes.map((recipe) => (
                    <RecipeCard key={recipe.id?.toString() || `popular-${recipe.name}`} recipe={recipe} />
                ))}
            </View>
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
