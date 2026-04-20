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
import Svg, { Path, Circle, G } from 'react-native-svg';
import { Colors } from '../../constants/colors';
import { FontSizes } from '../../constants/typography';
import { Btn } from '../../components/ui/Btn';
import { Field } from '../../components/ui/Field';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { OnboardingStackParams } from '../../navigation/OnboardingStack';

type Props = NativeStackScreenProps<OnboardingStackParams, 'SignIn'>;

function AppleLogo({ size = 20, color = '#000' }: { size?: number; color?: string }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 814 1000">
      <Path
        d="M788.1 340.9c-5.8 4.5-108.2 62.2-108.2 190.5 0 148.4 130.3 200.9 134.2 202.2-.6 3.2-20.7 71.9-68.7 141.9-42.8 61.6-87.5 123.1-155.5 123.1s-85.5-39.5-164-39.5c-76 0-103.7 40.8-165.9 40.8s-105-57.8-155.5-127.4C46 336.7 0 208.3 0 85.5 0 38.4 17.3 0 51.4 0c64.9 0 110.8 82.6 126.2 116.5 0 0 12.1 28 18.2 41.8 42.6 93.9 145.9 140.6 162.3 140.6 20.6 0 28.7-3.6 33.6-5.5 17.5-6.9 35.4-34.9 35.4-59.2s-12.7-41.4-26.3-54c-19.6-17.7-60.9-51.9-60.9-114.6 0-57.9 42.5-106.1 109.5-106.1 57.8 0 103 40.8 103 105.4 0 62.3-32.4 95.8-32.4 95.8s16.6 7.2 37.3 7.2c28.7 0 66-22.3 66-22.3 5.3-3 14.5-8.4 14.5-8.4z"
        fill={color}
      />
    </Svg>
  );
}

function GoogleLogo({ size = 20 }: { size?: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 48 48">
      <Path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
      <Path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
      <Path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
      <Path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.18 1.48-4.97 2.31-8.16 2.31-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
      <Path fill="none" d="M0 0h48v48H0z"/>
    </Svg>
  );
}

function FaceIdSvg({ size = 52, color = '#fff' }: { size?: number; color?: string }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path d="M4 7V5a1 1 0 0 1 1-1h2" stroke={color} strokeWidth="1.6" strokeLinecap="round"/>
      <Path d="M20 7V5a1 1 0 0 0-1-1h-2" stroke={color} strokeWidth="1.6" strokeLinecap="round"/>
      <Path d="M4 17v2a1 1 0 0 0 1 1h2" stroke={color} strokeWidth="1.6" strokeLinecap="round"/>
      <Path d="M20 17v2a1 1 0 0 1-1 1h-2" stroke={color} strokeWidth="1.6" strokeLinecap="round"/>
      <Circle cx="9" cy="10" r="1" fill={color}/>
      <Circle cx="15" cy="10" r="1" fill={color}/>
      <Path d="M9 15c.83 1 2.17 1.5 3 1.5s2.17-.5 3-1.5" stroke={color} strokeWidth="1.6" strokeLinecap="round"/>
    </Svg>
  );
}

export const SignInScreen: React.FC<Props> = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSignIn = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 1200);
  };

  return (
    <SafeAreaView style={styles.safe}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.flex}>
        <ScrollView
          contentContainerStyle={styles.scroll}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()} activeOpacity={0.7}>
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
                <FaceIdSvg size={32} color="#fff" />
              </View>
              <View>
                <Text style={styles.faceIdTitle}>Sign in with Face ID</Text>
                <Text style={styles.faceIdSub}>Instant, secure access</Text>
              </View>
            </View>
            <TouchableOpacity style={styles.faceIdBtn} activeOpacity={0.85} onPress={handleSignIn}>
              <Text style={styles.faceIdBtnLabel}>Use Face ID</Text>
            </TouchableOpacity>
            <View style={styles.faceIdDecor1} />
            <View style={styles.faceIdDecor2} />
          </LinearGradient>

          <View style={styles.dividerRow}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerLabel}>or use email</Text>
            <View style={styles.dividerLine} />
          </View>

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
                <AppleLogo size={18} color="#000" />
                <Text style={styles.socialLabel}>Apple</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.socialBtn} activeOpacity={0.8}>
                <GoogleLogo size={18} />
                <Text style={styles.socialLabel}>Google</Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity onPress={() => navigation.navigate('SignUp')} activeOpacity={0.7}>
              <Text style={styles.signUpLink}>
                {"Don't have an account? "}
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
  safe: { flex: 1, backgroundColor: Colors.canvas },
  flex: { flex: 1 },
  scroll: { paddingHorizontal: 24, paddingBottom: 40 },
  backBtn: { paddingTop: 8, paddingBottom: 8, alignSelf: 'flex-start' },
  backText: { fontSize: FontSizes.base, fontFamily: 'Inter_500Medium', color: Colors.teal },
  header: { marginBottom: 28, gap: 6 },
  heading: { fontSize: FontSizes['3xl'], fontFamily: 'SpaceGrotesk_700Bold', color: Colors.ink, letterSpacing: -0.5 },
  subheading: { fontSize: FontSizes.base, fontFamily: 'Inter_400Regular', color: Colors.muted },
  faceIdCard: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    borderRadius: 20, padding: 20, marginBottom: 24, overflow: 'hidden', position: 'relative',
  },
  faceIdLeft: { flexDirection: 'row', alignItems: 'center', gap: 12, flex: 1, zIndex: 2 },
  faceIdIconWrap: {
    width: 52, height: 52, borderRadius: 16,
    backgroundColor: 'rgba(255,255,255,0.18)', alignItems: 'center', justifyContent: 'center',
  },
  faceIdTitle: { fontSize: FontSizes.base, fontFamily: 'Inter_700Bold', color: '#fff' },
  faceIdSub: { fontSize: FontSizes.xs, fontFamily: 'Inter_400Regular', color: 'rgba(255,255,255,0.75)', marginTop: 2 },
  faceIdBtn: {
    backgroundColor: 'rgba(255,255,255,0.2)', paddingHorizontal: 16, paddingVertical: 10,
    borderRadius: 12, zIndex: 2, borderWidth: 1, borderColor: 'rgba(255,255,255,0.3)',
  },
  faceIdBtnLabel: { fontSize: FontSizes.sm, fontFamily: 'Inter_600SemiBold', color: '#fff' },
  faceIdDecor1: { position: 'absolute', width: 120, height: 120, borderRadius: 60, backgroundColor: 'rgba(255,255,255,0.07)', top: -40, right: -30 },
  faceIdDecor2: { position: 'absolute', width: 80, height: 80, borderRadius: 40, backgroundColor: 'rgba(255,255,255,0.05)', bottom: -20, left: 40 },
  dividerRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 20, gap: 10 },
  dividerLine: { flex: 1, height: 1, backgroundColor: Colors.border },
  dividerLabel: { fontSize: FontSizes.xs, fontFamily: 'Inter_400Regular', color: Colors.muted },
  forgotWrap: { alignSelf: 'flex-end', marginTop: -8, marginBottom: 24 },
  forgotText: { fontSize: FontSizes.sm, fontFamily: 'Inter_500Medium', color: Colors.teal },
  ctaSection: { gap: 16 },
  socialRow: { flexDirection: 'row', gap: 12 },
  socialBtn: {
    flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    gap: 8, height: 52, borderRadius: 12, borderWidth: 1.5,
    borderColor: Colors.border, backgroundColor: Colors.white,
  },
  socialLabel: { fontSize: FontSizes.base, fontFamily: 'Inter_600SemiBold', color: Colors.ink },
  signUpLink: { fontSize: FontSizes.sm, fontFamily: 'Inter_400Regular', color: Colors.muted, textAlign: 'center' },
  signUpLinkBold: { fontFamily: 'Inter_600SemiBold', color: Colors.teal },
});
