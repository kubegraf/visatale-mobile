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
import { ChatBubbleIcon, GlobeIcon, WarningIcon, PassportIcon } from '../../components/ui/Icons';

type NextStepIconKey = 'chat' | 'passport' | 'globe';

const REASONS = [
  {
    title: 'Previous visa refusal on record',
    detail: 'A UK visa refusal from 2022 may affect your UAE application. Contact our specialist for guidance.',
  },
  {
    title: 'Passport validity concern',
    detail: 'Your passport expires on Dec 14, 2025. UAE requires 6 months validity beyond your return date.',
  },
];

const NEXT_STEPS: { iconKey: NextStepIconKey; label: string; sub: string; cta: string }[] = [
  {
    iconKey: 'chat',
    label: 'Speak to a specialist',
    sub: 'Get expert advice on improving your profile',
    cta: 'Chat Now',
  },
  {
    iconKey: 'passport',
    label: 'Renew your passport',
    sub: 'Apply for a passport renewal before your next trip',
    cta: 'Learn how',
  },
  {
    iconKey: 'globe',
    label: 'Try a different destination',
    sub: 'Check eligibility for 150+ countries',
    cta: 'Explore',
  },
];

function NextStepIcon({ iconKey }: { iconKey: NextStepIconKey }) {
  switch (iconKey) {
    case 'chat': return <ChatBubbleIcon size={22} color={Colors.teal} />;
    case 'passport': return <PassportIcon size={22} color={Colors.teal} />;
    case 'globe': return <GlobeIcon size={22} color={Colors.teal} />;
  }
}

export const EligibilityFailScreen: React.FC = () => {
  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScreenHeader title="Eligibility Check" />
      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.handle} />

        {/* Warning art */}
        <View style={styles.artSection}>
          <View style={styles.warningOuter}>
            <View style={styles.warningInner}>
              <WarningIcon size={30} color={Colors.white} />
            </View>
          </View>
          <Pill label="Not Eligible Yet" tone="amber" dot />
        </View>

        {/* Heading */}
        <View style={styles.textSection}>
          <Text style={styles.heading}>A few hurdles found</Text>
          <Text style={styles.sub}>
            Don't worry — most issues can be resolved. Our specialists can guide you through the next steps.
          </Text>
        </View>

        {/* Reasons */}
        <View style={styles.reasonsSection}>
          <Text style={styles.sectionTitle}>Issues Identified</Text>
          {REASONS.map((reason, i) => (
            <View key={i} style={styles.reasonCard}>
              <View style={styles.reasonHeader}>
                <View style={styles.reasonDot} />
                <Text style={styles.reasonTitle}>{reason.title}</Text>
              </View>
              <Text style={styles.reasonDetail}>{reason.detail}</Text>
            </View>
          ))}
        </View>

        {/* Next steps */}
        <View style={styles.stepsSection}>
          <Text style={styles.sectionTitle}>Next Steps</Text>
          {NEXT_STEPS.map((step, i) => (
            <View key={i} style={styles.stepCard}>
              <View style={styles.stepIconWrap}>
                <NextStepIcon iconKey={step.iconKey} />
              </View>
              <View style={styles.stepInfo}>
                <Text style={styles.stepLabel}>{step.label}</Text>
                <Text style={styles.stepSub}>{step.sub}</Text>
              </View>
              <TouchableOpacity style={styles.stepCta} activeOpacity={0.8}>
                <Text style={styles.stepCtaLabel}>{step.cta}</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>

        {/* Specialist card */}
        <View style={styles.specCard}>
          <View style={styles.specAvatar}>
            <Text style={styles.specAvatarText}>A</Text>
          </View>
          <View style={styles.specInfo}>
            <Text style={styles.specName}>Talk to Ananya</Text>
            <Text style={styles.specSub}>UAE Visa Specialist · Free consultation</Text>
          </View>
          <View style={styles.onlineRow}>
            <View style={styles.onlineDot} />
            <Text style={styles.onlineText}>Online</Text>
          </View>
        </View>

        {/* CTAs */}
        <View style={styles.ctaSection}>
          <Btn label="Chat with Specialist" onPress={() => {}} />
          <Btn label="Try Another Country" kind="outline" onPress={() => {}} />
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
  artSection: {
    alignItems: 'center',
    gap: 12,
    marginBottom: 20,
  },
  warningOuter: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: '#FEF3C7',
    alignItems: 'center',
    justifyContent: 'center',
  },
  warningInner: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: Colors.amber,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textSection: {
    alignItems: 'center',
    gap: 8,
    marginBottom: 24,
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
  sectionTitle: {
    fontSize: FontSizes.md,
    fontFamily: 'SpaceGrotesk_600SemiBold',
    color: Colors.ink,
    marginBottom: 10,
  },
  reasonsSection: {
    gap: 0,
    marginBottom: 24,
  },
  reasonCard: {
    backgroundColor: Colors.errorLight,
    borderRadius: 12,
    padding: 14,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#FECACA',
    gap: 6,
  },
  reasonHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  reasonDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.error,
    flexShrink: 0,
  },
  reasonTitle: {
    fontSize: FontSizes.sm,
    fontFamily: 'Inter_600SemiBold',
    color: Colors.error,
    flex: 1,
  },
  reasonDetail: {
    fontSize: FontSizes.xs,
    fontFamily: 'Inter_400Regular',
    color: '#991B1B',
    lineHeight: 18,
    paddingLeft: 16,
  },
  stepsSection: {
    gap: 0,
    marginBottom: 20,
  },
  stepCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: Colors.canvas,
    borderRadius: 12,
    padding: 14,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  stepIconWrap: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: Colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: Colors.border,
  },
  stepInfo: {
    flex: 1,
  },
  stepLabel: {
    fontSize: FontSizes.sm,
    fontFamily: 'Inter_600SemiBold',
    color: Colors.ink,
  },
  stepSub: {
    fontSize: FontSizes.xs,
    fontFamily: 'Inter_400Regular',
    color: Colors.muted,
    marginTop: 2,
  },
  stepCta: {
    backgroundColor: Colors.surface,
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.teal,
  },
  stepCtaLabel: {
    fontSize: FontSizes.xs,
    fontFamily: 'Inter_600SemiBold',
    color: Colors.teal,
  },
  specCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: Colors.surface,
    borderRadius: 14,
    padding: 14,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  specAvatar: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: Colors.teal,
    alignItems: 'center',
    justifyContent: 'center',
  },
  specAvatarText: {
    fontSize: FontSizes.xl,
    fontFamily: 'SpaceGrotesk_700Bold',
    color: Colors.white,
  },
  specInfo: {
    flex: 1,
  },
  specName: {
    fontSize: FontSizes.base,
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
    gap: 5,
  },
  onlineDot: {
    width: 7,
    height: 7,
    borderRadius: 3.5,
    backgroundColor: '#4ADE80',
  },
  onlineText: {
    fontSize: FontSizes.xs,
    fontFamily: 'Inter_500Medium',
    color: Colors.emerald,
  },
  ctaSection: {
    gap: 12,
  },
});
