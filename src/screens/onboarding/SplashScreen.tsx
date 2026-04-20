import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import Svg, { Circle, Ellipse } from 'react-native-svg';
import { Colors } from '../../constants/colors';
import { FontSizes } from '../../constants/typography';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { OnboardingStackParams } from '../../navigation/OnboardingStack';
import { FlightIcon } from '../../components/ui/Icons';

const { width } = Dimensions.get('window');
const LOGO_SIZE = 96;

type Props = NativeStackScreenProps<OnboardingStackParams, 'Splash'>;

export const SplashScreen: React.FC<Props> = ({ navigation }) => {
  const progressAnim = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;
  const orbit1Anim = useRef(new Animated.Value(0)).current;
  const orbit2Anim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 60,
        friction: 10,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
    ]).start();

    Animated.loop(
      Animated.timing(orbit1Anim, {
        toValue: 1,
        duration: 4000,
        useNativeDriver: true,
      })
    ).start();

    Animated.loop(
      Animated.timing(orbit2Anim, {
        toValue: 1,
        duration: 6000,
        useNativeDriver: true,
      })
    ).start();

    Animated.timing(progressAnim, {
      toValue: 1,
      duration: 2400,
      useNativeDriver: false,
    }).start(() => {
      navigation.replace('Onboarding');
    });
  }, []);

  const orbit1Rotate = orbit1Anim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const orbit2Rotate = orbit2Anim.interpolate({
    inputRange: [0, 1],
    outputRange: ['360deg', '0deg'],
  });

  const progressWidth = progressAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%'],
  });

  return (
    <LinearGradient
      colors={['#0A1628', '#0D9488', '#059669']}
      start={{ x: 0.2, y: 0 }}
      end={{ x: 0.8, y: 1 }}
      style={styles.gradient}
    >
      <SafeAreaView style={styles.safe}>
        <View style={styles.center}>
          {/* Orbit rings */}
          <Animated.View
            style={[
              styles.orbitWrap,
              { transform: [{ rotate: orbit1Rotate }] },
            ]}
          >
            <Svg width={240} height={240}>
              <Ellipse
                cx={120}
                cy={120}
                rx={110}
                ry={44}
                fill="none"
                stroke="rgba(255,255,255,0.15)"
                strokeWidth={1}
              />
            </Svg>
          </Animated.View>
          <Animated.View
            style={[
              styles.orbitWrap,
              { transform: [{ rotate: orbit2Rotate }] },
            ]}
          >
            <Svg width={240} height={240}>
              <Ellipse
                cx={120}
                cy={120}
                rx={100}
                ry={60}
                fill="none"
                stroke="rgba(255,255,255,0.1)"
                strokeWidth={1}
              />
            </Svg>
          </Animated.View>

          {/* Logo */}
          <Animated.View
            style={[
              styles.logoWrap,
              {
                opacity: fadeAnim,
                transform: [{ scale: scaleAnim }],
              },
            ]}
          >
            <View style={styles.logoCircle}>
              <FlightIcon size={40} color={Colors.white} />
            </View>
          </Animated.View>

          <Animated.View style={{ opacity: fadeAnim }}>
            <Text style={styles.logoText}>visatale</Text>
            <Text style={styles.tagline}>Your visa, simplified</Text>
          </Animated.View>
        </View>

        {/* Progress bar */}
        <View style={styles.progressSection}>
          <View style={styles.progressTrack}>
            <Animated.View
              style={[styles.progressFill, { width: progressWidth }]}
            />
          </View>
          <Text style={styles.loadingText}>Loading your experience…</Text>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  safe: {
    flex: 1,
    justifyContent: 'space-between',
    paddingBottom: 48,
  },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  orbitWrap: {
    position: 'absolute',
  },
  logoWrap: {
    marginBottom: 24,
  },
  logoCircle: {
    width: LOGO_SIZE,
    height: LOGO_SIZE,
    borderRadius: LOGO_SIZE / 2,
    backgroundColor: 'rgba(255,255,255,0.15)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.3)',
  },
  logoText: {
    fontSize: FontSizes['4xl'],
    fontFamily: 'SpaceGrotesk_700Bold',
    color: Colors.white,
    textAlign: 'center',
    letterSpacing: -1,
  },
  tagline: {
    fontSize: FontSizes.base,
    fontFamily: 'Inter_400Regular',
    color: 'rgba(255,255,255,0.7)',
    textAlign: 'center',
    marginTop: 6,
  },
  progressSection: {
    paddingHorizontal: 40,
    gap: 10,
  },
  progressTrack: {
    height: 3,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: Colors.white,
    borderRadius: 2,
  },
  loadingText: {
    fontSize: FontSizes.xs,
    fontFamily: 'Inter_400Regular',
    color: 'rgba(255,255,255,0.5)',
    textAlign: 'center',
  },
});
