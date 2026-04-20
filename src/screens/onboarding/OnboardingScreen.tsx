import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  FlatList,
  Animated,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors } from '../../constants/colors';
import { FontSizes } from '../../constants/typography';
import { Btn } from '../../components/ui/Btn';
import { Pill } from '../../components/ui/Pill';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { OnboardingStackParams } from '../../navigation/OnboardingStack';

const { width, height } = Dimensions.get('window');

const SLIDES = [
  {
    id: '1',
    tag: 'Fast Processing',
    tagTone: 'teal' as const,
    heading: 'Visa in days,\nnot weeks',
    body: 'AI-powered applications with real-time tracking for 150+ countries. Skip the embassy queues.',
    art: '🌏',
    artBg: ['#0D9488', '#059669'] as [string, string],
  },
  {
    id: '2',
    tag: 'Expert Guidance',
    tagTone: 'emerald' as const,
    heading: 'A specialist\nin your pocket',
    body: 'Dedicated visa experts for UAE, Schengen, US and more. Chat anytime, get answers fast.',
    art: '👨‍💼',
    artBg: ['#0A1628', '#0D9488'] as [string, string],
  },
  {
    id: '3',
    tag: '98% Success Rate',
    tagTone: 'amber' as const,
    heading: 'More approvals,\nless stress',
    body: 'Smart document checklist + AI error detection = fewer rejections. Trusted by 2M+ travellers.',
    art: '🎯',
    artBg: ['#F59E0B', '#D97706'] as [string, string],
  },
];

type Props = NativeStackScreenProps<OnboardingStackParams, 'Onboarding'>;

export const OnboardingScreen: React.FC<Props> = ({ navigation }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);
  const scrollX = useRef(new Animated.Value(0)).current;

  const handleNext = () => {
    if (currentIndex < SLIDES.length - 1) {
      flatListRef.current?.scrollToIndex({ index: currentIndex + 1, animated: true });
    } else {
      navigation.navigate('SignUp');
    }
  };

  const handleSkip = () => {
    navigation.navigate('SignIn');
  };

  const onViewableItemsChanged = useRef(({ viewableItems }: any) => {
    if (viewableItems.length > 0) {
      setCurrentIndex(viewableItems[0].index);
    }
  }).current;

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleSkip} activeOpacity={0.7}>
          <Text style={styles.skip}>Skip</Text>
        </TouchableOpacity>
      </View>

      <Animated.FlatList
        ref={flatListRef}
        data={SLIDES}
        keyExtractor={(item) => item.id}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false }
        )}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={{ viewAreaCoveragePercentThreshold: 50 }}
        renderItem={({ item }) => (
          <View style={[styles.slide, { width }]}>
            {/* Art card */}
            <LinearGradient
              colors={item.artBg}
              style={styles.artCard}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <Text style={styles.artEmoji}>{item.art}</Text>
              {/* Decorative circles */}
              <View style={styles.decorCircle1} />
              <View style={styles.decorCircle2} />
            </LinearGradient>

            {/* Text content */}
            <View style={styles.textContent}>
              <Pill label={item.tag} tone={item.tagTone} />
              <Text style={styles.heading}>{item.heading}</Text>
              <Text style={styles.body}>{item.body}</Text>
            </View>
          </View>
        )}
      />

      <View style={styles.footer}>
        {/* Dot indicators */}
        <View style={styles.dots}>
          {SLIDES.map((_, i) => {
            const inputRange = [(i - 1) * width, i * width, (i + 1) * width];
            const dotWidth = scrollX.interpolate({
              inputRange,
              outputRange: [8, 24, 8],
              extrapolate: 'clamp',
            });
            const opacity = scrollX.interpolate({
              inputRange,
              outputRange: [0.3, 1, 0.3],
              extrapolate: 'clamp',
            });
            return (
              <Animated.View
                key={i}
                style={[styles.dot, { width: dotWidth, opacity }]}
              />
            );
          })}
        </View>

        <Btn
          label={currentIndex === SLIDES.length - 1 ? 'Get Started' : 'Continue'}
          onPress={handleNext}
        />

        <TouchableOpacity onPress={handleSkip} activeOpacity={0.7}>
          <Text style={styles.signInLink}>
            Already have an account?{' '}
            <Text style={styles.signInLinkBold}>Sign in</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: Colors.canvas,
  },
  header: {
    alignItems: 'flex-end',
    paddingHorizontal: 24,
    paddingTop: 8,
    paddingBottom: 8,
  },
  skip: {
    fontSize: FontSizes.base,
    fontFamily: 'Inter_500Medium',
    color: Colors.muted,
  },
  slide: {
    paddingHorizontal: 24,
  },
  artCard: {
    height: height * 0.38,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 32,
    overflow: 'hidden',
    position: 'relative',
  },
  artEmoji: {
    fontSize: 88,
    zIndex: 2,
  },
  decorCircle1: {
    position: 'absolute',
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: 'rgba(255,255,255,0.08)',
    top: -60,
    right: -60,
  },
  decorCircle2: {
    position: 'absolute',
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: 'rgba(255,255,255,0.06)',
    bottom: -40,
    left: -40,
  },
  textContent: {
    gap: 12,
  },
  heading: {
    fontSize: FontSizes['3xl'],
    fontFamily: 'SpaceGrotesk_700Bold',
    color: Colors.ink,
    lineHeight: 38,
    letterSpacing: -0.5,
  },
  body: {
    fontSize: FontSizes.base,
    fontFamily: 'Inter_400Regular',
    color: Colors.slate,
    lineHeight: 24,
  },
  footer: {
    paddingHorizontal: 24,
    paddingBottom: 16,
    gap: 16,
  },
  dots: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  dot: {
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.teal,
  },
  signInLink: {
    fontSize: FontSizes.sm,
    fontFamily: 'Inter_400Regular',
    color: Colors.muted,
    textAlign: 'center',
  },
  signInLinkBold: {
    fontFamily: 'Inter_600SemiBold',
    color: Colors.teal,
  },
});
