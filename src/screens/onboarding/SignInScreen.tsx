import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors } from '../../constants/colors';
import { FontSizes } from '../../constants/typography';
import { Btn } from '../../components/ui/Btn';
import { Field } from '../../components/ui/Field';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { OnboardingStackParams } from '../../navigation/OnboardingStack';

type Props = NativeStackScreenProps<OnboardingStackParams, 'SignIn'>;

export const SignInScreen: React.FC<Props> = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSignIn = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      // Navigate to MainTabs - handled by AppNavigator
    }, 1200);
  };

  return (
    <SafeAreaView style={styles.safe}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <ScrollView
          contentContainerStyle={styles.scroll}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <TouchableOpacity
            style={styles.backBtn}
            onPress={() => navigation.goBack()}
            activeOpacity={0.7}
          >
            <Text style={styles.backText}>← Back</Text>
          </TouchableOpacity>

          <View style={styles.header}>
            <Text style={styles.heading}>Welcome back</Text>
            <Text style={styles.subheading}>Sign in to continue your applications</Text>
          </View>

          {/* Face ID Card */}
          <LinearGradient
            colors={[Colors.teal, Colors.tealDark]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.faceIdCard}
          >
            <View style={styles.faceIdLeft}>
              <View style={styles.faceIdIconWrap}>
                <Text style={styles.faceIdEmoji}>👤</Text>
              </View>
              <View>
                <Text style={styles.faceIdTitle}>Sign in with Face ID</Text>
                <Text style={styles.faceIdSub}>Instant, secure access</Text>
              </View>
            </View>
            <TouchableOpacity
              style={styles.faceIdBtn}
              activeOpacity={0.85}
              onPress={handleSignIn}
            >
              <Text style={styles.faceIdBtnLabel}>Use Face ID</Text>
            </TouchableOpacity>
            {/* Decorative */}
            <View style={styles.faceIdDecor1} />
            <View style={styles.faceIdDecor2} />
          </LinearGradient>

          {/* Divider */}
          <View style={styles.dividerRow}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerLabel}>or use email</Text>
            <View style={styles.dividerLine} />
          </View>

          {/* Form */}
          <Field
            label="Email"
            placeholder="priya@example.com"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            returnKeyType="next"
          />
          <Field
            label="Password"
            placeholder="Enter your password"
            value={password}
            onChangeText={setPassword}
            isPassword
            returnKeyType="done"
            onSubmitEditing={handleSignIn}
          />

          <TouchableOpacity style={styles.forgotWrap} activeOpacity={0.7}>
            <Text style={styles.forgotText}>Forgot password?</Text>
          </TouchableOpacity>

          <View style={styles.ctaSection}>
            <Btn label="Sign In" onPress={handleSignIn} loading={loading} />

            {/* Social sign-in */}
            <View style={styles.socialRow}>
              <TouchableOpacity style={styles.socialBtn} activeOpacity={0.8}>
                <Text style={styles.socialIcon}>🍎</Text>
                <Text style={styles.socialLabel}>Apple</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.socialBtn} activeOpacity={0.8}>
                <Text style={styles.socialIcon}>G</Text>
                <Text style={styles.socialLabel}>Google</Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              onPress={() => navigation.navigate('SignUp')}
              activeOpacity={0.7}
            >
              <Text style={styles.signUpLink}>
                Don't have an account?{' '}
                <Text style={styles.signUpLinkBold}>Sign up free</Text>
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: Colors.canvas,
  },
  keyboardView: {
    flex: 1,
  },
  scroll: {
    paddingHorizontal: 24,
    paddingBottom: 40,
  },
  backBtn: {
    paddingTop: 8,
    paddingBottom: 8,
    alignSelf: 'flex-start',
  },
  backText: {
    fontSize: FontSizes.base,
    fontFamily: 'Inter_500Medium',
    color: Colors.teal,
  },
  header: {
    marginBottom: 28,
    gap: 6,
  },
  heading: {
    fontSize: FontSizes['3xl'],
    fontFamily: 'SpaceGrotesk_700Bold',
    color: Colors.ink,
    letterSpacing: -0.5,
  },
  subheading: {
    fontSize: FontSizes.base,
    fontFamily: 'Inter_400Regular',
    color: Colors.muted,
  },
  faceIdCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 20,
    padding: 20,
    marginBottom: 24,
    overflow: 'hidden',
    position: 'relative',
  },
  faceIdLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
    zIndex: 2,
  },
  faceIdIconWrap: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  faceIdEmoji: {
    fontSize: 24,
  },
  faceIdTitle: {
    fontSize: FontSizes.base,
    fontFamily: 'Inter_700Bold',
    color: Colors.white,
  },
  faceIdSub: {
    fontSize: FontSizes.xs,
    fontFamily: 'Inter_400Regular',
    color: 'rgba(255,255,255,0.75)',
    marginTop: 2,
  },
  faceIdBtn: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 12,
    zIndex: 2,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.3)',
  },
  faceIdBtnLabel: {
    fontSize: FontSizes.sm,
    fontFamily: 'Inter_600SemiBold',
    color: Colors.white,
  },
  faceIdDecor1: {
    position: 'absolute',
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: 'rgba(255,255,255,0.07)',
    top: -40,
    right: -30,
  },
  faceIdDecor2: {
    position: 'absolute',
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255,255,255,0.05)',
    bottom: -20,
    left: 40,
  },
  dividerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    gap: 10,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: Colors.border,
  },
  dividerLabel: {
    fontSize: FontSizes.xs,
    fontFamily: 'Inter_400Regular',
    color: Colors.muted,
  },
  forgotWrap: {
    alignSelf: 'flex-end',
    marginTop: -8,
    marginBottom: 24,
  },
  forgotText: {
    fontSize: FontSizes.sm,
    fontFamily: 'Inter_500Medium',
    color: Colors.teal,
  },
  ctaSection: {
    gap: 16,
  },
  socialRow: {
    flexDirection: 'row',
    gap: 12,
  },
  socialBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    height: 52,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: Colors.border,
    backgroundColor: Colors.white,
  },
  socialIcon: {
    fontSize: 18,
    fontFamily: 'SpaceGrotesk_700Bold',
    color: Colors.ink,
  },
  socialLabel: {
    fontSize: FontSizes.base,
    fontFamily: 'Inter_600SemiBold',
    color: Colors.ink,
  },
  signUpLink: {
    fontSize: FontSizes.sm,
    fontFamily: 'Inter_400Regular',
    color: Colors.muted,
    textAlign: 'center',
  },
  signUpLinkBold: {
    fontFamily: 'Inter_600SemiBold',
    color: Colors.teal,
  },
});
