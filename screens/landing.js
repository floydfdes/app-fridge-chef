import { ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { baseFontSize, colors, useAppFonts } from '../shared/fonts';

import { FontAwesome } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { useNavigation } from '@react-navigation/native';

export default function Landing() {
  const navigation = useNavigation();
  const loaded = useAppFonts();

  if (!loaded) {
    return null;
  }

  return (
    <ImageBackground
      source={{ uri: 'https://images.unsplash.com/photo-1543352634-99a5d50ae78e' }}
      style={styles.container}
    >
      <LinearGradient
        colors={['rgba(0,0,0,0.5)', 'rgba(0,0,0,0.8)']}
        style={styles.gradient}
      >
        <View style={styles.contentContainer}>
          <Text style={styles.appName}>Fridge Chef</Text>
          <Text style={styles.tagline}>Turn your ingredients into culinary masterpieces</Text>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('Home')}
          >
            <FontAwesome name="cutlery" size={24} color={colors.background} />
            <Text style={styles.buttonText}>Get Started</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.loginButton]}
            onPress={() => navigation.navigate('Login')}
          >
            <FontAwesome name="sign-in" size={24} color={colors.primary} />
            <Text style={[styles.buttonText, styles.loginButtonText]}>Login</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.footer}>Discover recipes. Reduce waste. Cook smart.</Text>
      </LinearGradient>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    resizeMode: 'cover',
  },
  gradient: {
    flex: 1,
    justifyContent: 'space-between',
    padding: 20,
  },
  contentContainer: {
    alignItems: 'center',
    marginTop: 60,
  },
  appName: {
    fontFamily: 'PoppinsBold',
    fontSize: baseFontSize * 3,
    color: 'white',
    textAlign: 'center',
  },
  tagline: {
    fontFamily: 'Poppins',
    fontSize: baseFontSize * 1.2,
    color: 'white',
    textAlign: 'center',
    marginTop: 10,
  },
  buttonContainer: {
    marginBottom: 40,
  },
  button: {
    backgroundColor: colors.primary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 25,
    marginBottom: 15,
  },
  buttonText: {
    fontFamily: 'Poppins',
    fontSize: baseFontSize * 1.2,
    color: 'white',
    marginLeft: 10,
  },
  loginButton: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: 'white',
  },
  loginButtonText: {
    color: 'white',
  },
  footer: {
    fontFamily: 'PoppinsLight',
    fontSize: baseFontSize * 0.9,
    color: 'white',
    textAlign: 'center',
  },
});
