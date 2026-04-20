import React, { useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Colors } from '../../constants/colors';
import { FontSizes } from '../../constants/typography';
import { Btn } from '../../components/ui/Btn';
import { RootStackParams } from '../../navigation/AppNavigator';

const CONFETTI_COLORS = [
  Colors.teal,
  Colors.emerald,
  Colors.amber,
  '#6366F1',
  '#EC4899',
  '#F97316',
  Colors.tealLight,
  Colors.emeraldLight,
  Colors.amberLight,
  '#818CF8',
];
const CONFETTI_SHAPES = ['rect', 'circle', 'rect', 'circle', 'rect', 'rect', 'circle', 'rect', 'circle', 'rect'];

interface ConfettiPiece {
  color: string;
  shape: string;
  x: Animated.Value;
  y: Animated.Value;
  opacity: Animated.Value;
  rotation: Animated.Value;
}

export const SuccessScreen: React.FC = () => {
  const nav = useNavigation<NativeStackNavigationProp<RootStackParams>>();
  const bounceAnim = useRef(new Animated.Value(0.5)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const confettiPieces = useRef<ConfettiPiece[]>(
    Array.from({ length: 16 }, (_, i) => ({
      color: CONFETTI_COLORS[i % CONFETTI_COLORS.length],
      shape: CONFETTI_SHAPES[i % CONFETTI_SHAPES.length],
      x: new Animated.Value(Math.random() * 300 - 150),
      y: new Animated.Value(-40),
      opacity: new Animated.Value(1),
      rotation: new Animated.Value(0),
    }))
  ).current;

  useEffect(() => {
    Animated.spring(bounceAnim, {
      toValue: 1,
      tension: 60,
      friction: 8,
      useNativeDriver: true,
    }).start();

    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 600,
      delay: 300,
      useNativeDriver: true,
    }).start();

    confettiPieces.forEach((piece, i) => {
      Animated.parallel([
        Animated.timing(piece.y, {
          toValue: 500,
          duration: 2000 + i * 100,
          delay: i * 80,
          useNativeDriver: true,
        }),
        Animated.timing(piece.opacity, {
          toValue: 0,
          duration: 2000,
          delay: i * 80 + 800,
          useNativeDriver: true,
        }),
        Animated.timing(piece.rotation, {
          toValue: 360 * (Math.random() > 0.5 ? 1 : -1),
          duration: 2000,
          delay: i * 80,
          useNativeDriver: true,
        }),
      ]).start();
    });
  }, []);

  return (
    <LinearGradient
      colors={[Colors.canvas, Colors.surface, '#E0FAF5']}
      style={styles.gradient}
    >
      <SafeAreaView style={styles.safe}>
        {/* Confetti */}
        <View style={styles.confettiContainer} pointerEvents="none">
          {confettiPieces.map((piece, i) => (
            <Animated.View
              key={i}
              style={[
                piece.shape === 'circle' ? styles.confettiCircle : styles.confettiRect,
                {
                  left: `${20 + (i / 16) * 60}%` as any,
                  backgroundColor: piece.color,
                  transform: [
                    { translateX: piece.x },
                    { translateY: piece.y },
                    {
                      rotate: piece.rotation.interpolate({
                        inputRange: [-360, 360],
                        outputRange: ['-360deg', '360deg'],
                      }),
                    },
                  ],
                  opacity: piece.opacity,
                },
              ]}
            />
          ))}
        </View>

        <View style={styles.content}>
          {/* Success icon */}
          <Animated.View
            style={[
              styles.iconSection,
              { transform: [{ scale: bounceAnim }] },
            ]}
          >
            <View style={styles.iconOuter}>
              <View style={styles.iconInner}>
                <Text style={styles.iconEmoji}>✓</Text>
              </View>
            </View>
          </Animated.View>

          <Animated.View style={[styles.textSection, { opacity: fadeAnim }]}>
            <Text style={styles.heading}>Application Submitted!</Text>
            <Text style={styles.sub}>
              Your UAE Tourist Visa application is now in processing. We'll notify you of every update.
            </Text>

            {/* Application ID */}
            <View style={styles.appIdCard}>
              <Text style={styles.appIdLabel}>Application ID</Text>
              <Text style={styles.appIdValue}>#VT-2024-08421</Text>
              <TouchableOpacity activeOpacity={0.7}>
                <Text style={styles.copyBtn}>Copy</Text>
              </TouchableOpacity>
            </View>

            {/* Timeline preview */}
            <View style={styles.timelineCard}>
              <Text style={styles.timelineTitle}>What happens next?</Text>
              {[
                { done: true, label: 'Application received', time: 'Just now' },
                { done: false, label: 'Document review', time: '1–2 hours' },
                { done: false, label: 'Embassy submission', time: 'Today' },
                { done: false, label: 'Visa decision', time: 'Jun 8–10' },
              ].map((step, i) => (
                <View key={i} style={styles.timelineStep}>
                  <View
                    style={[
                      styles.timeStepDot,
                      step.done ? styles.timeStepDotDone : styles.timeStepDotPending,
                    ]}
                  />
                  <Text style={[styles.timeStepLabel, step.done && styles.timeStepLabelDone]}>
                    {step.label}
                  </Text>
                  <Text style={styles.timeStepTime}>{step.time}</Text>
                </View>
              ))}
            </View>

            {/* Specialist card */}
            <View style={styles.specCard}>
              <View style={styles.specAvatar}>
                <Text style={styles.specAvatarText}>A</Text>
              </View>
              <View style={styles.specInfo}>
                <Text style={styles.specName}>Ananya Patel is assigned</Text>
                <Text style={styles.specSub}>She'll be in touch within 30 minutes</Text>
              </View>
              <View style={styles.onlineRow}>
                <View style={styles.onlineDot} />
              </View>
            </View>
          </Animated.View>

          <Animated.View style={[styles.ctaSection, { opacity: fadeAnim }]}>
            <Btn label="Track Application" onPress={() => nav.reset({ index: 0, routes: [{ name: 'Main' }] })} />
            <Btn label="Share with family" kind="ghost" onPress={() => {}} />
          </Animated.View>
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
  },
  confettiContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 10,
  },
  confettiRect: {
    position: 'absolute',
    width: 10,
    height: 6,
    borderRadius: 2,
    top: 0,
  },
  confettiCircle: {
    position: 'absolute',
    width: 8,
    height: 8,
    borderRadius: 4,
    top: 0,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 40,
    paddingBottom: 24,
  },
  iconSection: {
    alignItems: 'center',
    marginBottom: 24,
  },
  iconOuter: {
    width: 112,
    height: 112,
    borderRadius: 56,
    backgroundColor: '#D1FAE5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconInner: {
    width: 76,
    height: 76,
    borderRadius: 38,
    backgroundColor: Colors.emerald,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconEmoji: {
    fontSize: 36,
    color: Colors.white,
    fontFamily: 'SpaceGrotesk_700Bold',
  },
  textSection: {
    flex: 1,
    gap: 16,
  },
  heading: {
    fontSize: FontSizes['3xl'],
    fontFamily: 'SpaceGrotesk_700Bold',
    color: Colors.ink,
    letterSpacing: -0.5,
    textAlign: 'center',
  },
  sub: {
    fontSize: FontSizes.sm,
    fontFamily: 'Inter_400Regular',
    color: Colors.slate,
    textAlign: 'center',
    lineHeight: 22,
  },
  appIdCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderRadius: 12,
    padding: 14,
    borderWidth: 1,
    borderColor: Colors.border,
    gap: 10,
  },
  appIdLabel: {
    fontSize: FontSizes.xs,
    fontFamily: 'Inter_400Regular',
    color: Colors.muted,
  },
  appIdValue: {
    flex: 1,
    fontSize: FontSizes.base,
    fontFamily: 'JetBrainsMono_400Regular',
    color: Colors.ink,
  },
  copyBtn: {
    fontSize: FontSizes.xs,
    fontFamily: 'Inter_600SemiBold',
    color: Colors.teal,
  },
  timelineCard: {
    backgroundColor: Colors.white,
    borderRadius: 14,
    padding: 14,
    borderWidth: 1,
    borderColor: Colors.border,
    gap: 10,
  },
  timelineTitle: {
    fontSize: FontSizes.sm,
    fontFamily: 'Inter_600SemiBold',
    color: Colors.ink,
    marginBottom: 2,
  },
  timelineStep: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  timeStepDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    flexShrink: 0,
  },
  timeStepDotDone: {
    backgroundColor: Colors.emerald,
  },
  timeStepDotPending: {
    backgroundColor: Colors.border,
  },
  timeStepLabel: {
    flex: 1,
    fontSize: FontSizes.xs,
    fontFamily: 'Inter_400Regular',
    color: Colors.muted,
  },
  timeStepLabelDone: {
    color: Colors.emerald,
    fontFamily: 'Inter_600SemiBold',
  },
  timeStepTime: {
    fontSize: FontSizes.xs,
    fontFamily: 'JetBrainsMono_400Regular',
    color: Colors.muted,
  },
  specCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: Colors.surface,
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  specAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: Colors.teal,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: Colors.border,
  },
  specAvatarText: {
    fontSize: 20,
    fontFamily: 'SpaceGrotesk_700Bold',
    color: Colors.white,
  },
  specInfo: {
    flex: 1,
  },
  specName: {
    fontSize: FontSizes.sm,
    fontFamily: 'Inter_600SemiBold',
    color: Colors.ink,
  },
  specSub: {
    fontSize: FontSizes.xs,
    fontFamily: 'Inter_400Regular',
    color: Colors.muted,
    marginTop: 2,
  },
  onlineRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  onlineDot: {
    width: 9,
    height: 9,
    borderRadius: 4.5,
    backgroundColor: '#4ADE80',
  },
  ctaSection: {
    gap: 12,
    paddingTop: 8,
  },
});
