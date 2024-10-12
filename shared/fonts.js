import { useFonts } from 'expo-font';

export const useAppFonts = () => {
  const [loaded] = useFonts({
    Poppins: require('../assets/fonts/Poppins/Poppins-Medium.ttf'),
    PoppinsBold: require('../assets/fonts/Poppins/Poppins-Bold.ttf'),
    PoppinsLight: require('../assets/fonts/Poppins/Poppins-Light.ttf'),
  });

  return loaded;
};

export const colors = {
  primary: '#476930',
  secondary: '#86b049',
  third: '#F1dddf',
  fourth: '#c8b88a'
}

export const baseFontSize = 16;