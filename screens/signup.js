import React, { useState, useCallback } from 'react';
import {
  Alert,
  Keyboard,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  ActivityIndicator,
} from 'react-native';
import { colors, useAppFonts } from '../shared/fonts';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { signup } from '../services/api';

const Signup = ({ navigation }) => {
  const [formData, setFormData] = useState({ fullName: '', email: '', password: '' });
  const [formErrors, setFormErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const { fullName, email, password } = formData;
  const { fullNameError, emailError, passwordError } = formErrors;

  const loaded = useAppFonts();
  if (!loaded) return null;

  const handleInputChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = useCallback(() => {
    const errors = {};
    if (!fullName) errors.fullNameError = 'Please enter your full name';
    if (!email) errors.emailError = 'Please enter your email';
    else if (!/^\S+@\S+\.\S+$/.test(email)) errors.emailError = 'Please enter a valid email';
    if (!password) errors.passwordError = 'Please enter your password';
    else if (password.length < 6) errors.passwordError = 'Password should be at least 6 characters';
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  }, [fullName, email, password]);

  const handleSignup = useCallback(async () => {
    Keyboard.dismiss();
    setLoading(true);

    if (!validateForm()) {
      setLoading(false);
      return;
    }

    try {
      const userData = await signup(fullName, email, password);
      await AsyncStorage.setItem('userId', userData.userId);
      navigation.navigate('Home');
    } catch (error) {
      console.error('Signup failed:', error);
      Alert.alert('Signup Failed', 'Please try again');
    } finally {
      setLoading(false);
    }
  }, [fullName, email, password, navigation, validateForm]);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <LinearGradient colors={['#fff', '#8796a2']} style={styles.container}>
        <View style={styles.contentContainer}>
          <Text style={styles.heading}>Create an Account</Text>
          <Text style={styles.paragraph}>Sign up to explore a world of culinary possibilities with Fridge Chef.</Text>
        </View>

        <InputField
          icon="person"
          placeholder="Full Name"
          value={fullName}
          onChangeText={(value) => handleInputChange('fullName', value)}
          error={fullNameError}
        />

        <InputField
          icon="mail"
          placeholder="Email"
          value={email}
          onChangeText={(value) => handleInputChange('email', value)}
          error={emailError}
        />

        <InputField
          icon="lock-closed"
          placeholder="Password"
          value={password}
          onChangeText={(value) => handleInputChange('password', value)}
          error={passwordError}
          secureTextEntry
        />

        <TouchableOpacity style={styles.button} onPress={handleSignup} disabled={loading}>
          {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Sign Up</Text>}
        </TouchableOpacity>

        <TouchableOpacity style={styles.loginButton} onPress={() => navigation.navigate('Login')}>
          <Text style={styles.loginButtonText}>Already have an account? Login</Text>
        </TouchableOpacity>

        <View style={styles.termsContainer}>
          <Text style={styles.termsText}>By signing up, you agree to our Terms of Service and Privacy Policy.</Text>
        </View>
      </LinearGradient>
    </TouchableWithoutFeedback>
  );
};

const InputField = ({ icon, placeholder, value, onChangeText, error, secureTextEntry }) => (
  <>
    <View style={styles.inputContainer}>
      <Ionicons name={icon} size={24} color={colors.secondary} style={styles.icon} />
      <TextInput
        style={[styles.input, { outlineStyle: 'none' }]}
        placeholder={placeholder}
        placeholderTextColor="#000"
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
      />
    </View>
    {error ? <Text style={styles.error}>{error}</Text> : null}
  </>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 100,
    paddingHorizontal: 40,
  },
  contentContainer: {
    alignItems: 'flex-start',
    marginBottom: 30,
  },
  heading: {
    fontSize: 38,
    fontWeight: 'bold',
    letterSpacing: 3,
    marginBottom: 10,
    color: colors.primary,
    fontFamily: 'PoppinsBold',
  },
  paragraph: {
    fontSize: 16,
    lineHeight: 30,
    color: colors.primary,
    fontFamily: 'PoppinsLight',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 50,
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 25,
    paddingHorizontal: 10,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  icon: { marginRight: 10 },
  input: { flex: 1, height: '100%', color: '#000', fontFamily: 'PoppinsLight' },
  button: {
    backgroundColor: colors.secondary,
    borderRadius: 35,
    height: 60,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 10,
  },
  buttonText: { color: '#000', fontSize: 18, fontWeight: 'bold', fontFamily: 'Poppins' },
  loginButton: {
    backgroundColor: '#fff',
    borderRadius: 35,
    height: 60,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 10,
  },
  loginButtonText: { color: colors.secondary, fontSize: 18, fontWeight: 'bold', fontFamily: 'Poppins' },
  termsContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  termsText: { fontSize: 12, color: '#000', textAlign: 'center', fontFamily: 'PoppinsLight' },
  error: { color: 'red', marginBottom: 5, marginTop: -19 },
});

export default Signup;