import { Alert, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { baseFontSize, colors } from '../shared/fonts';
import { getUserProfile, updateUserProfile } from '../services/api';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { FontAwesome } from '@expo/vector-icons';

const Profile = () => {
    const [userProfile, setUserProfile] = useState(null);
    const [userId, setUserId] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUserId = async () => {
            try {
                const storedUserId = await AsyncStorage.getItem('userId');
                if (storedUserId) {
                    setUserId(storedUserId);
                }
            } catch (error) {
                console.error('Error fetching user ID:', error);
                setError('Failed to load user information. Please try again.');
            }
        };

        fetchUserId();
    }, []);

    useEffect(() => {
        if (userId) {
            fetchUserProfile();
        }
    }, [userId]);

    const fetchUserProfile = async () => {
        try {
            setIsLoading(true);
            setError(null);
            const profileData = await getUserProfile(userId);
            setUserProfile(profileData);
        } catch (error) {
            console.error('Error fetching user profile:', error);
            setError('Failed to load user profile. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleUpdateProfile = async (updatedData) => {
        try {
            const updatedProfile = await updateUserProfile(userId, updatedData);
            setUserProfile(updatedProfile);
            Alert.alert('Success', 'Profile updated successfully');
        } catch (error) {
            console.error('Error updating profile:', error);
            Alert.alert('Error', 'Failed to update profile. Please try again.');
        }
    };

    if (isLoading) {
        return (
            <View style={styles.centerContainer}>
                <Text style={styles.loadingText}>Loading...</Text>
            </View>
        );
    }

    if (error) {
        return (
            <View style={styles.centerContainer}>
                <Text style={styles.errorText}>{error}</Text>
                <TouchableOpacity style={styles.retryButton} onPress={fetchUserProfile}>
                    <Text style={styles.retryButtonText}>Retry</Text>
                </TouchableOpacity>
            </View>
        );
    }

    if (!userProfile) {
        return (
            <View style={styles.centerContainer}>
                <Text style={styles.errorText}>No profile data available.</Text>
            </View>
        );
    }

    return (
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                <Image
                    source={{ uri: userProfile.profilePicture }}
                    style={styles.profilePicture}
                />
                <View style={styles.headerInfo}>
                    <Text style={styles.name}>{userProfile.name}</Text>
                    <Text style={styles.username}>@{userProfile.username}</Text>
                </View>
            </View>

            <View style={styles.statsContainer}>
                <View style={styles.statItem}>
                    <Text style={styles.statNumber}>{userProfile.recipesCount}</Text>
                    <Text style={styles.statLabel}>Recipes</Text>
                </View>
                <View style={styles.statItem}>
                    <Text style={styles.statNumber}>{userProfile.followersCount}</Text>
                    <Text style={styles.statLabel}>Followers</Text>
                </View>
                <View style={styles.statItem}>
                    <Text style={styles.statNumber}>{userProfile.followingCount}</Text>
                    <Text style={styles.statLabel}>Following</Text>
                </View>
            </View>

            <Text style={styles.bio}>{userProfile.bio}</Text>

            <TouchableOpacity style={styles.editButton}>
                <Text style={styles.editButtonText}>Edit Profile</Text>
            </TouchableOpacity>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>My Recipes</Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    {userProfile.recipes.map((recipe) => (
                        <View key={recipe.id} style={styles.recipeThumbnail}>
                            <Image source={{ uri: recipe.imageUrl }} style={styles.recipeImage} />
                            <Text style={styles.recipeName}>{recipe.name}</Text>
                        </View>
                    ))}
                </ScrollView>
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Recent Activity</Text>
                {userProfile.recentActivity.map((activity, index) => (
                    <View key={index} style={styles.activityItem}>
                        <FontAwesome name={activity.icon} size={16} color={colors.primary} />
                        <Text style={styles.activityText}>{activity.text}</Text>
                    </View>
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
    centerContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.background,
    },
    loadingText: {
        fontFamily: 'Poppins',
        fontSize: baseFontSize * 1.2,
        color: colors.text,
    },
    errorText: {
        fontFamily: 'Poppins',
        fontSize: baseFontSize,
        color: colors.error,
        textAlign: 'center',
        marginHorizontal: 20,
    },
    retryButton: {
        backgroundColor: colors.primary,
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 20,
        marginTop: 20,
    },
    retryButtonText: {
        fontFamily: 'Poppins',
        color: colors.background,
        fontSize: baseFontSize,
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
