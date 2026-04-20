import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Switch,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Svg, { Path, Circle, G } from 'react-native-svg';
import { Colors } from '../../constants/colors';
import { FontSizes } from '../../constants/typography';
import { Btn } from '../../components/ui/Btn';
import { Field } from '../../components/ui/Field';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { OnboardingStackParams } from '../../navigation/OnboardingStack';

type Props = NativeStackScreenProps<OnboardingStackParams, 'SignUp'>;

// Realistic Apple logo SVG
function AppleLogo({ size = 20 }: { size?: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 814 1000">
      <Path
        d="M788.1 340.9c-5.8 4.5-108.2 62.2-108.2 190.5 0 148.4 130.3 200.9 134.2 202.2-.6 3.2-20.7 71.9-68.7 141.9-42.8 61.6-87.5 123.1-155.5 123.1s-85.5-39.5-164-39.5c-76 0-103.7 40.8-165.9 40.8s-105-57.8-155.5-127.4C46 336.7
        0 208.3 0 85.5 0 38.4 17.3 0 51.4 0c64.9 0 110.8 82.6 126.2 116.5 0 0 12.1 28 18.2 41.8 42.6 93.9 145.9 140.6 162.3
        140.6 20.6 0 28.7-3.6 33.6-5.5 17.5-6.9 35.4-34.9 35.4-59.2s-12.7-41.4-26.3-54c-19.6-17.7-60.9-51.9-60.9-114.6
        0-57.9 42.5-106.1 109.5-106.1 57.8 0 103 40.8 103 105.4 0 62.3-32.4 95.8-32.4 95.8s16.6 7.2 37.3 7.2c28.7 0
        66-22.3 66-22.3 5.3-3 14.5-8.4 14.5-8.4z"
        fill="#000"
      />
    </Svg>
  );
}

// Realistic Google "G" logo SVG
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

// Face ID SVG icon
function FaceIdIcon({ size = 28, color = Colors.teal }: { size?: number; color?: string }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path d="M4 7V5a1 1 0 0 1 1-1h2" stroke={color} strokeWidth="1.8" strokeLinecap="round"/>
      <Path d="M20 7V5a1 1 0 0 0-1-1h-2" stroke={color} strokeWidth="1.8" strokeLinecap="round"/>
      <Path d="M4 17v2a1 1 0 0 0 1 1h2" stroke={color} strokeWidth="1.8" strokeLinecap="round"/>
      <Path d="M20 17v2a1 1 0 0 1-1 1h-2" stroke={color} strokeWidth="1.8" strokeLinecap="round"/>
      <Circle cx="9" cy="10" r="1" fill={color}/>
      <Circle cx="15" cy="10" r="1" fill={color}/>
      <Path d="M9 15c.83 1 2.17 1.5 3 1.5s2.17-.5 3-1.5" stroke={color} strokeWidth="1.8" strokeLinecap="round"/>
    </Svg>
  );
}

// Eye / Eye-off SVG icon
export function EyeIcon({ size = 20, color = Colors.muted, off = false }: { size?: number; color?: string; off?: boolean }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      {off ? (
        <>
          <Path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
          <Path d="M1 1l22 22" stroke={color} strokeWidth="1.8" strokeLinecap="round"/>
        </>
      ) : (
        <>
          <Path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
          <Circle cx="12" cy="12" r="3" stroke={color} strokeWidth="1.8"/>
        </>
      )}
    </Svg>
  );
}

const getPasswordStrength = (pw: string) => {
  let score = 0;
  if (pw.length >= 8) score++;
  if (/[A-Z]/.test(pw)) score++;
  if (/[0-9]/.test(pw)) score++;
  if (/[^A-Za-z0-9]/.test(pw)) score++;
  return score;
};

const STRENGTH_LABELS = ['', 'Weak', 'Fair', 'Good', 'Strong'];
const STRENGTH_COLORS = ['', Colors.error, Colors.amber, Colors.teal, Colors.emerald];

export const SignUpScreen: React.FC<Props> = ({ navigation }) => {
  const [form, setForm] = useState({ name: '', email: '', phone: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [biometricEnabled, setBiometricEnabled] = useState(true);
  const [loading, setLoading] = useState(false);

  const pwStrength = getPasswordStrength(form.password);
  const pwTooShort = form.password.length > 0 && form.password.length < 8;

  const handleSignUp = async () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigation.navigate('SignIn');
    }, 1500);
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
            <Text style={styles.heading}>Create account</Text>
            <Text style={styles.subheading}>Join 2M+ travellers who get their visas faster</Text>
          </View>

          {/* Social buttons */}
          <View style={styles.socialRow}>
            <TouchableOpacity style={styles.socialBtn} activeOpacity={0.8}>
              <AppleLogo size={18} />
              <Text style={styles.socialLabel}>Apple</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.socialBtn} activeOpacity={0.8}>
              <GoogleLogo size={18} />
              <Text style={styles.socialLabel}>Google</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.dividerRow}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerLabel}>or sign up with email</Text>
            <View style={styles.dividerLine} />
          </View>

          {/* Form */}
          <Field
            label="Full Name"
            placeholder="Priya Sharma"
            value={form.name}
            onChangeText={(t) => setForm({ ...form, name: t })}
            autoCapitalize="words"
            returnKeyType="next"
          />
          <Field
            label="Email"
            placeholder="priya@example.com"
            value={form.email}
            onChangeText={(t) => setForm({ ...form, email: t })}
            keyboardType="email-address"
            autoCapitalize="none"
            returnKeyType="next"
          />
          <Field
            label="Phone Number"
            placeholder="+91 98765 43210"
            value={form.phone}
            onChangeText={(t) => setForm({ ...form, phone: t })}
            keyboardType="phone-pad"
            returnKeyType="next"
          />

          {/* Password field with eye toggle */}
          <View style={styles.passwordWrap}>
            <Field
              label="Password"
              placeholder="Min 8 characters"
              value={form.password}
              onChangeText={(t) => setForm({ ...form, password: t })}
              secureTextEntry={!showPassword}
              returnKeyType="done"
              iconRight={
                <EyeIcon size={20} color={Colors.muted} off={showPassword} />
              }
              onIconRightPress={() => setShowPassword(!showPassword)}
            />
            {pwTooShort && (
              <Text style={styles.pwHint}>Min 8 characters</Text>
            )}
          </View>

          {/* Strength bar */}
          {form.password.length >= 8 && (
            <View style={styles.strengthWrap}>
              <View style={styles.strengthBars}>
                {[1, 2, 3, 4].map((s) => (
                  <View key={s} style={[styles.strengthBar, { backgroundColor: s <= pwStrength ? STRENGTH_COLORS[pwStrength] : Colors.border }]} />
                ))}
              </View>
              <Text style={[styles.strengthLabel, { color: STRENGTH_COLORS[pwStrength] }]}>
                {STRENGTH_LABELS[pwStrength]}
              </Text>
            </View>
          )}

          {/* Face ID / Touch ID toggle */}
          <View style={styles.biometricCard}>
            <View style={styles.biometricLeft}>
              <View style={styles.biometricIconWrap}>
                <FaceIdIcon size={26} color={Colors.teal} />
              </View>
              <View style={styles.biometricText}>
                <Text style={styles.biometricTitle}>Enable Face ID / Touch ID</Text>
                <Text style={styles.biometricSub}>Sign in instantly with biometrics after setup and lock</Text>
              </View>
            </View>
            <Switch
              value={biometricEnabled}
              onValueChange={setBiometricEnabled}
              trackColor={{ false: Colors.border, true: Colors.teal }}
              thumbColor={Colors.white}
            />
          </View>

          <View style={styles.ctaSection}>
            <Btn label="Create Account" onPress={handleSignUp} loading={loading} />
            <Text style={styles.terms}>
              By continuing, you agree to our{' '}
              <Text style={styles.termsLink}>Terms of Service</Text> and{' '}
              <Text style={styles.termsLink}>Privacy Policy</Text>
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate('SignIn')} activeOpacity={0.7}>
              <Text style={styles.signInLink}>
                Already have an account?{' '}
                <Text style={styles.signInLinkBold}>Sign in</Text>
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
  socialRow: { flexDirection: 'row', gap: 12, marginBottom: 20 },
  socialBtn: {
    flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    gap: 8, height: 52, borderRadius: 12, borderWidth: 1.5,
    borderColor: Colors.border, backgroundColor: Colors.white,
  },
  socialLabel: { fontSize: FontSizes.base, fontFamily: 'Inter_600SemiBold', color: Colors.ink },
  dividerRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 20, gap: 10 },
  dividerLine: { flex: 1, height: 1, backgroundColor: Colors.border },
  dividerLabel: { fontSize: FontSizes.xs, fontFamily: 'Inter_400Regular', color: Colors.muted },
  passwordWrap: { position: 'relative' },
  eyeBtn: { padding: 4 },
  pwHint: { fontSize: FontSizes.xs, fontFamily: 'Inter_400Regular', color: Colors.error, marginTop: -10, marginBottom: 8, marginLeft: 2 },
  strengthWrap: { flexDirection: 'row', alignItems: 'center', gap: 10, marginTop: -8, marginBottom: 16 },
  strengthBars: { flexDirection: 'row', gap: 4, flex: 1 },
  strengthBar: { flex: 1, height: 4, borderRadius: 2 },
  strengthLabel: { fontSize: FontSizes.xs, fontFamily: 'Inter_600SemiBold', width: 40, textAlign: 'right' },
  biometricCard: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: Colors.surface, borderRadius: 14, padding: 14,
    marginBottom: 24, borderWidth: 1, borderColor: Colors.border, gap: 12,
  },
  biometricLeft: { flex: 1, flexDirection: 'row', alignItems: 'center', gap: 12 },
  biometricIconWrap: {
    width: 44, height: 44, borderRadius: 12,
    backgroundColor: 'rgba(13,148,136,0.1)', alignItems: 'center', justifyContent: 'center',
  },
  biometricText: { flex: 1, gap: 3 },
  biometricTitle: { fontSize: FontSizes.sm, fontFamily: 'Inter_600SemiBold', color: Colors.ink },
  biometricSub: { fontSize: FontSizes.xs, fontFamily: 'Inter_400Regular', color: Colors.muted, lineHeight: 16 },
  ctaSection: { gap: 16 },
  terms: { fontSize: FontSizes.xs, fontFamily: 'Inter_400Regular', color: Colors.muted, textAlign: 'center', lineHeight: 18 },
  termsLink: { color: Colors.teal, fontFamily: 'Inter_500Medium' },
  signInLink: { fontSize: FontSizes.sm, fontFamily: 'Inter_400Regular', color: Colors.muted, textAlign: 'center' },
  signInLinkBold: { fontFamily: 'Inter_600SemiBold', color: Colors.teal },
});
