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
import { Colors } from '../../constants/colors';
import { FontSizes } from '../../constants/typography';
import { Btn } from '../../components/ui/Btn';
import { Field } from '../../components/ui/Field';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { OnboardingStackParams } from '../../navigation/OnboardingStack';

type Props = NativeStackScreenProps<OnboardingStackParams, 'SignUp'>;

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
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);

  const pwStrength = getPasswordStrength(form.password);

  const handleSignUp = async () => {
    setLoading(true);
    // Simulated registration
    setTimeout(() => {
      setLoading(false);
      // Navigate to main tabs would happen here after actual auth
      navigation.navigate('SignIn');
    }, 1500);
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
            <Text style={styles.heading}>Create account</Text>
            <Text style={styles.subheading}>
              Join 2M+ travellers who get their visas faster
            </Text>
          </View>

          {/* Social sign-up */}
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

          {/* Divider */}
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
          <Field
            label="Password"
            placeholder="Min 8 characters"
            value={form.password}
            onChangeText={(t) => setForm({ ...form, password: t })}
            isPassword
            returnKeyType="done"
          />

          {/* Password strength bar */}
          {form.password.length > 0 && (
            <View style={styles.strengthWrap}>
              <View style={styles.strengthBars}>
                {[1, 2, 3, 4].map((s) => (
                  <View
                    key={s}
                    style={[
                      styles.strengthBar,
                      {
                        backgroundColor:
                          s <= pwStrength
                            ? STRENGTH_COLORS[pwStrength]
                            : Colors.border,
                      },
                    ]}
                  />
                ))}
              </View>
              <Text
                style={[
                  styles.strengthLabel,
                  { color: STRENGTH_COLORS[pwStrength] },
                ]}
              >
                {STRENGTH_LABELS[pwStrength]}
              </Text>
            </View>
          )}

          {/* Face ID info */}
          <View style={styles.faceIdCard}>
            <Text style={styles.faceIdIcon}>🔐</Text>
            <View style={styles.faceIdText}>
              <Text style={styles.faceIdTitle}>Enable Face ID / Touch ID</Text>
              <Text style={styles.faceIdSub}>
                Sign in instantly with biometrics after setup
              </Text>
            </View>
          </View>

          <View style={styles.ctaSection}>
            <Btn label="Create Account" onPress={handleSignUp} loading={loading} />

            <Text style={styles.terms}>
              By continuing, you agree to our{' '}
              <Text style={styles.termsLink}>Terms of Service</Text> and{' '}
              <Text style={styles.termsLink}>Privacy Policy</Text>
            </Text>

            <TouchableOpacity
              onPress={() => navigation.navigate('SignIn')}
              activeOpacity={0.7}
            >
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
  socialRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 20,
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
  strengthWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginTop: -8,
    marginBottom: 16,
  },
  strengthBars: {
    flexDirection: 'row',
    gap: 4,
    flex: 1,
  },
  strengthBar: {
    flex: 1,
    height: 4,
    borderRadius: 2,
  },
  strengthLabel: {
    fontSize: FontSizes.xs,
    fontFamily: 'Inter_600SemiBold',
    width: 40,
    textAlign: 'right',
  },
  faceIdCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: Colors.surface,
    borderRadius: 12,
    padding: 14,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  faceIdIcon: {
    fontSize: 28,
  },
  faceIdText: {
    flex: 1,
    gap: 2,
  },
  faceIdTitle: {
    fontSize: FontSizes.base,
    fontFamily: 'Inter_600SemiBold',
    color: Colors.ink,
  },
  faceIdSub: {
    fontSize: FontSizes.xs,
    fontFamily: 'Inter_400Regular',
    color: Colors.muted,
  },
  ctaSection: {
    gap: 16,
  },
  terms: {
    fontSize: FontSizes.xs,
    fontFamily: 'Inter_400Regular',
    color: Colors.muted,
    textAlign: 'center',
    lineHeight: 18,
  },
  termsLink: {
    color: Colors.teal,
    fontFamily: 'Inter_500Medium',
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
