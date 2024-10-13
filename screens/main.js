import * as ImagePicker from 'expo-image-picker';

import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import { getRecipesByIngredients, uploadFridgeImage } from '../services/api';

import { Camera } from 'expo-camera';
import { Ionicons } from '@expo/vector-icons';

const Main = () => {
  const [fridgeImage, setFridgeImage] = useState(null);
  const [suggestedRecipes, setSuggestedRecipes] = useState([]);

  const takeFridgePhoto = async () => {
    const { status } = await Camera.requestCameraPermissionsAsync();
    if (status === 'granted') {
      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled) {
        setFridgeImage(result.assets[0].uri);
        try {
          const uploadResult = await uploadFridgeImage(result.assets[0]);
          const recipes = await getRecipesByIngredients(uploadResult.ingredients);
          setSuggestedRecipes(recipes);
        } catch (error) {
          console.error('Error processing image:', error);
          Alert.alert('Error', 'Failed to process image. Please try again.');
        }
      }
    }
  };

  const renderRecipeItem = ({ item }) => (
    <View style={styles.recipeItem}>
      <Image source={{ uri: item.imageUrl }} style={styles.recipeImage} />
      <Text style={styles.recipeName}>{item.name}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Fridge Chef</Text>

      {fridgeImage ? (
        <Image source={{ uri: fridgeImage }} style={styles.fridgeImage} />
      ) : (
        <TouchableOpacity style={styles.cameraButton} onPress={takeFridgePhoto}>
          <Ionicons name="camera" size={40} color="#fff" />
          <Text style={styles.cameraButtonText}>Take a photo of your fridge</Text>
        </TouchableOpacity>
      )}

      {suggestedRecipes.length > 0 && (
        <>
          <Text style={styles.suggestedRecipesTitle}>Suggested Recipes</Text>
          <FlatList
            data={suggestedRecipes}
            renderItem={renderRecipeItem}
            keyExtractor={(item) => item.id.toString()}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
          />
        </>
      )}
    </View>
  );
};

const dummyRecipes = [
  { id: 1, name: 'Vegetable Stir Fry', imageUrl: 'https://example.com/stir-fry.jpg' },
  { id: 2, name: 'Chicken Salad', imageUrl: 'https://example.com/chicken-salad.jpg' },
  { id: 3, name: 'Fruit Smoothie', imageUrl: 'https://example.com/smoothie.jpg' },
];

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f0f0f0',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  cameraButton: {
    backgroundColor: '#4a90e2',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  cameraButtonText: {
    color: '#fff',
    marginTop: 10,
  },
  fridgeImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 20,
  },
  suggestedRecipesTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },
  recipeItem: {
    marginRight: 15,
  },
  recipeImage: {
    width: 120,
    height: 120,
    borderRadius: 10,
  },
  recipeName: {
    marginTop: 5,
    textAlign: 'center',
  },
});

export default Main;
