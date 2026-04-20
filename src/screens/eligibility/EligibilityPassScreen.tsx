import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '../../constants/colors';
import { FontSizes } from '../../constants/typography';
import { ScreenHeader } from '../../components/ui/ScreenHeader';
import { Btn } from '../../components/ui/Btn';
import { Pill } from '../../components/ui/Pill';

const REQUIREMENTS = [
  { label: 'Valid Indian passport (6+ months remaining)', met: true },
  { label: 'Return/onward ticket', met: true },
  { label: 'Bank balance ≥ AED 5,000', met: true },
  { label: 'Hotel booking or host invitation', met: false, required: false },
  { label: 'No prior UAE visa refusals', met: true },
];

export const EligibilityPassScreen: React.FC = () => {
  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScreenHeader title="Eligibility Check" />
      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        {/* Handle indicator (bottom sheet style) */}
        <View style={styles.handle} />

        {/* Check icon */}
        <View style={styles.iconSection}>
          <View style={styles.checkOuter}>
            <View style={styles.checkInner}>
              <Text style={styles.checkEmoji}>✓</Text>
            </View>
          </View>
          <Pill label="Eligible" tone="emerald" dot />
        </View>

        {/* Heading */}
        <View style={styles.textSection}>
          <Text style={styles.heading}>You're eligible!</Text>
          <Text style={styles.sub}>
            Based on your profile, you can apply for a UAE Tourist Visa (30 days, eVisa).
            Our AI checked 18 eligibility criteria.
          </Text>
        </View>

        {/* Stats row */}
        <View style={styles.statsRow}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>98%</Text>
            <Text style={styles.statLabel}>Approval Rate</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statValue}>4–5</Text>
            <Text style={styles.statLabel}>Days processing</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statValue}>30</Text>
            <Text style={styles.statLabel}>Days validity</Text>
          </View>
        </View>

        {/* Requirements */}
        <View style={styles.reqSection}>
          <Text style={styles.reqTitle}>Requirements Checklist</Text>
          {REQUIREMENTS.map((req, i) => (
            <View key={i} style={styles.reqRow}>
              <View
                style={[
                  styles.reqDot,
                  req.met ? styles.reqDotMet : styles.reqDotOptional,
                ]}
              >
                <Text style={styles.reqDotText}>{req.met ? '✓' : '○'}</Text>
              </View>
              <Text
                style={[styles.reqLabel, !req.met && styles.reqLabelOptional]}
              >
                {req.label}
              </Text>
              {req.required === false && !req.met && (
                <Pill label="Optional" tone="gray" size="sm" />
              )}
            </View>
          ))}
        </View>

        {/* Pricing preview */}
        <View style={styles.pricingCard}>
          <Text style={styles.pricingTitle}>Pricing Overview</Text>
          <View style={styles.pricingRow}>
            <Text style={styles.pricingLabel}>Government visa fee</Text>
            <Text style={styles.pricingValue}>AED 300 (~₹6,700)</Text>
          </View>
          <View style={styles.pricingRow}>
            <Text style={styles.pricingLabel}>Service fee (Pro)</Text>
            <Text style={styles.pricingValue}>₹2,499</Text>
          </View>
          <View style={styles.pricingDivider} />
          <View style={styles.pricingRow}>
            <Text style={styles.pricingTotal}>Total estimate</Text>
            <Text style={styles.pricingTotalValue}>₹9,199</Text>
          </View>
          <Text style={styles.pricingNote}>
            Government fee is paid separately at checkout. Money-back guarantee on service fee.
          </Text>
        </View>

        {/* CTAs */}
        <View style={styles.ctaSection}>
          <Btn label="Apply Now →" onPress={() => {}} />
          <Btn label="Compare Plans" kind="outline" onPress={() => {}} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  scroll: {
    paddingHorizontal: 24,
    paddingBottom: 40,
  },
  handle: {
    width: 40,
    height: 4,
    borderRadius: 2,
    backgroundColor: Colors.border,
    alignSelf: 'center',
    marginTop: 12,
    marginBottom: 20,
  },
  iconSection: {
    alignItems: 'center',
    gap: 12,
    marginBottom: 20,
  },
  checkOuter: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: '#DCFCE7',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkInner: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: Colors.emerald,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkEmoji: {
    fontSize: 30,
    color: Colors.white,
    fontFamily: 'SpaceGrotesk_700Bold',
  },
  textSection: {
    alignItems: 'center',
    gap: 8,
    marginBottom: 20,
  },
  heading: {
    fontSize: FontSizes['3xl'],
    fontFamily: 'SpaceGrotesk_700Bold',
    color: Colors.ink,
    letterSpacing: -0.5,
  },
  sub: {
    fontSize: FontSizes.sm,
    fontFamily: 'Inter_400Regular',
    color: Colors.slate,
    textAlign: 'center',
    lineHeight: 22,
  },
  statsRow: {
    flexDirection: 'row',
    backgroundColor: Colors.surface,
    borderRadius: 14,
    paddingVertical: 16,
    paddingHorizontal: 10,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
    gap: 4,
  },
  statValue: {
    fontSize: FontSizes.xl,
    fontFamily: 'SpaceGrotesk_700Bold',
    color: Colors.teal,
  },
  statLabel: {
    fontSize: FontSizes.xs,
    fontFamily: 'Inter_400Regular',
    color: Colors.muted,
    textAlign: 'center',
  },
  statDivider: {
    width: 1,
    height: 36,
    backgroundColor: Colors.border,
  },
  reqSection: {
    gap: 10,
    marginBottom: 20,
  },
  reqTitle: {
    fontSize: FontSizes.md,
    fontFamily: 'SpaceGrotesk_600SemiBold',
    color: Colors.ink,
    marginBottom: 2,
  },
  reqRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  reqDot: {
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  reqDotMet: {
    backgroundColor: '#DCFCE7',
  },
  reqDotOptional: {
    backgroundColor: Colors.border,
  },
  reqDotText: {
    fontSize: 12,
    color: Colors.emerald,
    fontFamily: 'Inter_700Bold',
  },
  reqLabel: {
    flex: 1,
    fontSize: FontSizes.sm,
    fontFamily: 'Inter_400Regular',
    color: Colors.slate,
  },
  reqLabelOptional: {
    color: Colors.muted,
  },
  pricingCard: {
    backgroundColor: Colors.canvas,
    borderRadius: 14,
    padding: 16,
    gap: 10,
    borderWidth: 1,
    borderColor: Colors.border,
    marginBottom: 20,
  },
  pricingTitle: {
    fontSize: FontSizes.base,
    fontFamily: 'SpaceGrotesk_600SemiBold',
    color: Colors.ink,
    marginBottom: 2,
  },
  pricingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  pricingLabel: {
    fontSize: FontSizes.sm,
    fontFamily: 'Inter_400Regular',
    color: Colors.slate,
  },
  pricingValue: {
    fontSize: FontSizes.sm,
    fontFamily: 'Inter_600SemiBold',
    color: Colors.ink,
  },
  pricingDivider: {
    height: 1,
    backgroundColor: Colors.border,
  },
  pricingTotal: {
    fontSize: FontSizes.base,
    fontFamily: 'Inter_600SemiBold',
    color: Colors.ink,
  },
  pricingTotalValue: {
    fontSize: FontSizes.lg,
    fontFamily: 'SpaceGrotesk_700Bold',
    color: Colors.teal,
  },
  pricingNote: {
    fontSize: FontSizes.xs,
    fontFamily: 'Inter_400Regular',
    color: Colors.muted,
    lineHeight: 17,
  },
  ctaSection: {
    gap: 12,
  },
});
