import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { baseFontSize, colors } from '../shared/fonts';

import { FontAwesome } from '@expo/vector-icons';
import React from 'react';
import recipesData from '../shared/recipes.json';

const Profile = () => {
    return (
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                <Image
                    source={{ uri: 'https://example.com/profile-picture.jpg' }}
                    style={styles.profilePicture}
                />
                <View style={styles.headerInfo}>
                    <Text style={styles.name}>John Doe</Text>
                    <Text style={styles.username}>@johndoe</Text>
                </View>
            </View>

            <View style={styles.statsContainer}>
                <View style={styles.statItem}>
                    <Text style={styles.statNumber}>{recipesData.myRecipes.length}</Text>
                    <Text style={styles.statLabel}>Recipes</Text>
                </View>
                <View style={styles.statItem}>
                    <Text style={styles.statNumber}>1.2k</Text>
                    <Text style={styles.statLabel}>Followers</Text>
                </View>
                <View style={styles.statItem}>
                    <Text style={styles.statNumber}>350</Text>
                    <Text style={styles.statLabel}>Following</Text>
                </View>
            </View>

            <Text style={styles.bio}>Food enthusiast | Amateur chef | Recipe creator</Text>

            <TouchableOpacity style={styles.editButton}>
                <Text style={styles.editButtonText}>Edit Profile</Text>
            </TouchableOpacity>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>My Recipes</Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    {recipesData.myRecipes.map((recipe) => (
                        <View key={recipe.id} style={styles.recipeThumbnail}>
                            <Image source={{ uri: recipe.imageUrl }} style={styles.recipeImage} />
                            <Text style={styles.recipeName}>{recipe.name}</Text>
                        </View>
                    ))}
                </ScrollView>
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Recent Activity</Text>
                <View style={styles.activityItem}>
                    <FontAwesome name="star" size={16} color={colors.primary} />
                    <Text style={styles.activityText}>Liked Spaghetti Carbonara recipe</Text>
                </View>
                <View style={styles.activityItem}>
                    <FontAwesome name="pencil" size={16} color={colors.primary} />
                    <Text style={styles.activityText}>Created Homemade Pizza recipe</Text>
                </View>
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
        flexDirection: 'row',
        alignItems: 'center',
        padding: 20,
    },
    profilePicture: {
        width: 80,
        height: 80,
        borderRadius: 40,
        marginRight: 20,
    },
    headerInfo: {
        flex: 1,
    },
    name: {
        fontFamily: 'Poppins',
        fontSize: baseFontSize * 1.5,
        fontWeight: 'bold',
        color: colors.text,
    },
    username: {
        fontFamily: 'Poppins',
        fontSize: baseFontSize,
        color: colors.textLight,
    },
    statsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingVertical: 20,
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor: colors.border,
    },
    statItem: {
        alignItems: 'center',
    },
    statNumber: {
        fontFamily: 'Poppins',
        fontSize: baseFontSize * 1.2,
        fontWeight: 'bold',
        color: colors.text,
    },
    statLabel: {
        fontFamily: 'Poppins',
        fontSize: baseFontSize * 0.8,
        color: colors.textLight,
    },
    bio: {
        fontFamily: 'Poppins',
        fontSize: baseFontSize,
        color: colors.text,
        textAlign: 'center',
        paddingHorizontal: 20,
        paddingVertical: 15,
    },
    editButton: {
        backgroundColor: colors.primary,
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 20,
        alignSelf: 'center',
        marginVertical: 20,
    },
    editButtonText: {
        fontFamily: 'Poppins',
        color: colors.background,
        fontSize: baseFontSize,
    },
    section: {
        padding: 20,
    },
    sectionTitle: {
        fontFamily: 'Poppins',
        fontSize: baseFontSize * 1.2,
        fontWeight: 'bold',
        color: colors.text,
        marginBottom: 10,
    },
    recipeThumbnail: {
        width: 120,
        height: 160,
        marginRight: 10,
        borderRadius: 10,
        overflow: 'hidden',
    },
    recipeImage: {
        width: 120,
        height: 120,
    },
    recipeName: {
        fontFamily: 'Poppins',
        fontSize: baseFontSize * 0.8,
        color: colors.text,
        textAlign: 'center',
        paddingTop: 5,
    },
    activityItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    activityText: {
        fontFamily: 'Poppins',
        fontSize: baseFontSize,
        color: colors.text,
        marginLeft: 10,
    },
});

export default Profile;