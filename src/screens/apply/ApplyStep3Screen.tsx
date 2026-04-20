import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors } from '../../constants/colors';
import { FontSizes } from '../../constants/typography';
import { ScreenHeader } from '../../components/ui/ScreenHeader';
import { Btn } from '../../components/ui/Btn';
import { Pill } from '../../components/ui/Pill';
import { BankIcon } from '../../components/ui/Icons';

const STEPS = ['Route', 'Profile', 'Plan'];

const PLANS = [
  {
    id: 'essential',
    name: 'Essential',
    price: '₹999',
    priceNote: '/application',
    tag: null,
    tagTone: 'gray' as const,
    color: Colors.slate,
    features: [
      'AI document check',
      'Application tracking',
      'Email support',
      '5-7 business days',
    ],
    cta: 'Choose Essential',
  },
  {
    id: 'pro',
    name: 'Pro',
    price: '₹2,499',
    priceNote: '/application',
    tag: 'Most Popular',
    tagTone: 'teal' as const,
    color: Colors.teal,
    features: [
      'All Essential features',
      'Dedicated specialist',
      'Document preparation',
      'Priority processing',
      '3-5 business days',
      'WhatsApp support',
    ],
    cta: 'Choose Pro',
  },
  {
    id: 'concierge',
    name: 'Concierge',
    price: '₹5,999',
    priceNote: '/application',
    tag: 'Premium',
    tagTone: 'amber' as const,
    color: '#D97706',
    features: [
      'All Pro features',
      'Same-day processing',
      'Embassy appointment',
      'Travel insurance',
      'Hotel booking assist',
      '24/7 phone support',
    ],
    cta: 'Choose Concierge',
  },
];

export const ApplyStep3Screen: React.FC = () => {
  const [selected, setSelected] = useState('pro');

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScreenHeader title="New Application" />
      <View style={styles.header}>
        <Text style={styles.heading}>Choose Your Plan</Text>
        <View style={styles.stepper}>
          {STEPS.map((step, i) => (
            <React.Fragment key={i}>
              <View style={styles.stepItem}>
                <View
                  style={[
                    styles.stepCircle,
                    i < 2
                      ? styles.stepCircleDone
                      : styles.stepCircleActive,
                  ]}
                >
                  <Text style={[styles.stepNum, styles.stepNumActive]}>
                    {i < 2 ? '✓' : i + 1}
                  </Text>
                </View>
                <Text
                  style={[
                    styles.stepLabel,
                    i === 2 ? styles.stepLabelActive : styles.stepLabelDone,
                  ]}
                >
                  {step}
                </Text>
              </View>
              {i < STEPS.length - 1 && (
                <View style={[styles.stepConnector, styles.stepConnectorDone]} />
              )}
            </React.Fragment>
          ))}
        </View>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        {PLANS.map((plan) => (
          <TouchableOpacity
            key={plan.id}
            activeOpacity={0.9}
            onPress={() => setSelected(plan.id)}
            style={[
              styles.planCard,
              selected === plan.id && styles.planCardSelected,
              selected === plan.id && { borderColor: plan.color },
            ]}
          >
            {/* Plan header */}
            <View style={styles.planHeader}>
              <View>
                <View style={styles.planNameRow}>
                  <Text style={[styles.planName, selected === plan.id && { color: plan.color }]}>
                    {plan.name}
                  </Text>
                  {plan.tag && (
                    <Pill label={plan.tag} tone={plan.tagTone} size="sm" />
                  )}
                </View>
                <View style={styles.priceRow}>
                  <Text style={[styles.price, { color: plan.color }]}>{plan.price}</Text>
                  <Text style={styles.priceNote}>{plan.priceNote}</Text>
                </View>
              </View>
              <View
                style={[
                  styles.radioOuter,
                  selected === plan.id && { borderColor: plan.color },
                ]}
              >
                {selected === plan.id && (
                  <View style={[styles.radioInner, { backgroundColor: plan.color }]} />
                )}
              </View>
            </View>

            {/* Divider */}
            <View style={styles.divider} />

            {/* Features */}
            <View style={styles.featureList}>
              {plan.features.map((f, i) => (
                <View key={i} style={styles.featureRow}>
                  <Text style={[styles.featureCheck, { color: plan.color }]}>✓</Text>
                  <Text style={styles.featureText}>{f}</Text>
                </View>
              ))}
            </View>
          </TouchableOpacity>
        ))}

        {/* Government fee note */}
        <View style={styles.govNote}>
          <BankIcon size={16} color={Colors.slate} />
          <Text style={styles.govNoteText}>
            Government visa fee (AED 300 ≈ ₹6,700) is charged separately and paid directly to the UAE embassy.
          </Text>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <Btn
          label={`Continue with ${PLANS.find((p) => p.id === selected)?.name} →`}
          onPress={() => {}}
        />
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
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
    gap: 16,
  },
  heading: {
    fontSize: FontSizes['2xl'],
    fontFamily: 'SpaceGrotesk_700Bold',
    color: Colors.ink,
  },
  stepper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  stepItem: {
    alignItems: 'center',
    gap: 4,
  },
  stepCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepCircleDone: {
    backgroundColor: Colors.emerald,
  },
  stepCircleActive: {
    backgroundColor: Colors.teal,
  },
  stepNum: {
    fontSize: FontSizes.sm,
    fontFamily: 'Inter_700Bold',
  },
  stepNumActive: {
    color: Colors.white,
  },
  stepLabel: {
    fontSize: FontSizes.xs,
    fontFamily: 'Inter_500Medium',
  },
  stepLabelActive: {
    color: Colors.teal,
    fontFamily: 'Inter_600SemiBold',
  },
  stepLabelDone: {
    color: Colors.emerald,
  },
  stepConnector: {
    flex: 1,
    height: 2,
    backgroundColor: Colors.border,
    marginBottom: 20,
    marginHorizontal: 4,
  },
  stepConnectorDone: {
    backgroundColor: Colors.emerald,
  },
  scrollView: {
    flex: 1,
  },
  scroll: {
    padding: 20,
    paddingBottom: 20,
    gap: 12,
  },
  planCard: {
    backgroundColor: Colors.white,
    borderRadius: 16,
    padding: 18,
    borderWidth: 1.5,
    borderColor: Colors.border,
  },
  planCardSelected: {
    borderWidth: 2,
    shadowColor: Colors.teal,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 4,
  },
  planHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  planNameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 4,
  },
  planName: {
    fontSize: FontSizes.lg,
    fontFamily: 'SpaceGrotesk_700Bold',
    color: Colors.ink,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 4,
  },
  price: {
    fontSize: FontSizes['2xl'],
    fontFamily: 'SpaceGrotesk_700Bold',
  },
  priceNote: {
    fontSize: FontSizes.xs,
    fontFamily: 'Inter_400Regular',
    color: Colors.muted,
  },
  radioOuter: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: Colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  divider: {
    height: 1,
    backgroundColor: Colors.border,
    marginVertical: 14,
  },
  featureList: {
    gap: 8,
  },
  featureRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  featureCheck: {
    fontSize: 14,
    fontFamily: 'Inter_700Bold',
    width: 16,
  },
  featureText: {
    fontSize: FontSizes.sm,
    fontFamily: 'Inter_400Regular',
    color: Colors.slate,
    flex: 1,
  },
  govNote: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
    backgroundColor: Colors.surface,
    borderRadius: 10,
    padding: 12,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  govNoteText: {
    flex: 1,
    fontSize: FontSizes.xs,
    fontFamily: 'Inter_400Regular',
    color: Colors.slate,
    lineHeight: 18,
  },
  footer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    backgroundColor: Colors.white,
  },
});
