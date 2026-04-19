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
import { Btn } from '../../components/ui/Btn';
import { Pill } from '../../components/ui/Pill';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { MainTabsParams } from '../../navigation/MainTabs';

type Props = BottomTabScreenProps<MainTabsParams, 'Apply'>;

const STEPS = ['Route', 'Profile', 'Plan'];
const ORIGINS = [
  { flag: '🇮🇳', name: 'India', code: 'IN' },
  { flag: '🇦🇪', name: 'UAE', code: 'AE' },
  { flag: '🇸🇬', name: 'Singapore', code: 'SG' },
];
const DESTINATIONS = [
  { flag: '🇦🇪', name: 'UAE', code: 'AE', days: 30, status: 'eVisa' },
  { flag: '🇬🇧', name: 'UK', code: 'GB', days: 180, status: 'Embassy' },
  { flag: '🇫🇷', name: 'France', code: 'FR', days: 90, status: 'Schengen' },
  { flag: '🇺🇸', name: 'USA', code: 'US', days: 180, status: 'Embassy' },
  { flag: '🇸🇬', name: 'Singapore', code: 'SG', days: 30, status: 'eVisa' },
];

export const ApplyStep1Screen: React.FC<Props> = ({ navigation }) => {
  const [selectedOrigin, setSelectedOrigin] = useState('IN');
  const [selectedDest, setSelectedDest] = useState('AE');
  const [aiChecking, setAiChecking] = useState(false);
  const [eligibility, setEligibility] = useState<null | boolean>(null);
  const [travelDate, setTravelDate] = useState('');

  const handleAiCheck = () => {
    setAiChecking(true);
    setEligibility(null);
    setTimeout(() => {
      setAiChecking(false);
      setEligibility(true);
    }, 2000);
  };

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.heading}>New Application</Text>
        {/* Stepper */}
        <View style={styles.stepper}>
          {STEPS.map((step, i) => (
            <React.Fragment key={i}>
              <View style={styles.stepItem}>
                <View
                  style={[
                    styles.stepCircle,
                    i === 0 ? styles.stepCircleActive : styles.stepCirclePending,
                  ]}
                >
                  <Text
                    style={[
                      styles.stepNum,
                      i === 0 ? styles.stepNumActive : styles.stepNumPending,
                    ]}
                  >
                    {i + 1}
                  </Text>
                </View>
                <Text
                  style={[
                    styles.stepLabel,
                    i === 0 ? styles.stepLabelActive : styles.stepLabelPending,
                  ]}
                >
                  {step}
                </Text>
              </View>
              {i < STEPS.length - 1 && (
                <View style={styles.stepConnector} />
              )}
            </React.Fragment>
          ))}
        </View>
      </View>

      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        {/* Origin */}
        <Text style={styles.sectionLabel}>Travelling from</Text>
        <View style={styles.rowCards}>
          {ORIGINS.map((o) => (
            <TouchableOpacity
              key={o.code}
              style={[
                styles.countryCard,
                selectedOrigin === o.code && styles.countryCardActive,
              ]}
              onPress={() => setSelectedOrigin(o.code)}
              activeOpacity={0.8}
            >
              <Text style={styles.countryFlag}>{o.flag}</Text>
              <Text
                style={[
                  styles.countryName,
                  selectedOrigin === o.code && styles.countryNameActive,
                ]}
              >
                {o.name}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Destination */}
        <Text style={styles.sectionLabel}>Travelling to</Text>
        <View style={styles.destList}>
          {DESTINATIONS.map((d) => (
            <TouchableOpacity
              key={d.code}
              style={[
                styles.destCard,
                selectedDest === d.code && styles.destCardActive,
              ]}
              onPress={() => setSelectedDest(d.code)}
              activeOpacity={0.8}
            >
              <Text style={styles.destFlag}>{d.flag}</Text>
              <View style={styles.destInfo}>
                <Text
                  style={[
                    styles.destName,
                    selectedDest === d.code && styles.destNameActive,
                  ]}
                >
                  {d.name}
                </Text>
                <Text style={styles.destDays}>Up to {d.days} days</Text>
              </View>
              <Pill
                label={d.status}
                tone={d.status === 'eVisa' ? 'emerald' : d.status === 'Schengen' ? 'teal' : 'gray'}
                size="sm"
              />
              {selectedDest === d.code && (
                <Text style={styles.checkMark}>✓</Text>
              )}
            </TouchableOpacity>
          ))}
        </View>

        {/* Travel dates */}
        <Text style={styles.sectionLabel}>Travel Dates</Text>
        <View style={styles.datesRow}>
          <TouchableOpacity style={styles.dateCard} activeOpacity={0.8}>
            <Text style={styles.dateIcon}>📅</Text>
            <View>
              <Text style={styles.dateLabelSm}>Departure</Text>
              <Text style={styles.dateValue}>Jun 15, 2025</Text>
            </View>
          </TouchableOpacity>
          <Text style={styles.dateDash}>→</Text>
          <TouchableOpacity style={styles.dateCard} activeOpacity={0.8}>
            <Text style={styles.dateIcon}>📅</Text>
            <View>
              <Text style={styles.dateLabelSm}>Return</Text>
              <Text style={styles.dateValue}>Jun 29, 2025</Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* AI Eligibility */}
        <View style={styles.aiCard}>
          <View style={styles.aiHeader}>
            <Text style={styles.aiIcon}>🤖</Text>
            <View style={styles.aiHeaderText}>
              <Text style={styles.aiTitle}>AI Eligibility Check</Text>
              <Text style={styles.aiSub}>Instant check based on your profile</Text>
            </View>
          </View>

          {eligibility === null && (
            <Btn
              label={aiChecking ? 'Checking eligibility…' : 'Check Eligibility'}
              onPress={handleAiCheck}
              loading={aiChecking}
              size="md"
            />
          )}

          {eligibility === true && (
            <View style={styles.eligResult}>
              <View style={styles.eligPass}>
                <Text style={styles.eligPassIcon}>✅</Text>
                <View>
                  <Text style={styles.eligPassTitle}>You're eligible!</Text>
                  <Text style={styles.eligPassSub}>
                    UAE Tourist Visa · 30 days · eVisa
                  </Text>
                </View>
              </View>
              <View style={styles.eligDetails}>
                {['Valid passport (6+ months)', 'Return ticket required', 'Hotel booking needed'].map((req, i) => (
                  <View key={i} style={styles.eligReq}>
                    <Text style={styles.eligReqCheck}>✓</Text>
                    <Text style={styles.eligReqText}>{req}</Text>
                  </View>
                ))}
              </View>
            </View>
          )}
        </View>
      </ScrollView>

      {/* CTA */}
      <View style={styles.footer}>
        <Btn label="Continue to Profile →" onPress={() => {}} />
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
  stepCircleActive: {
    backgroundColor: Colors.teal,
  },
  stepCirclePending: {
    backgroundColor: Colors.border,
  },
  stepNum: {
    fontSize: FontSizes.sm,
    fontFamily: 'Inter_700Bold',
  },
  stepNumActive: {
    color: Colors.white,
  },
  stepNumPending: {
    color: Colors.muted,
  },
  stepLabel: {
    fontSize: FontSizes.xs,
    fontFamily: 'Inter_500Medium',
  },
  stepLabelActive: {
    color: Colors.teal,
  },
  stepLabelPending: {
    color: Colors.muted,
  },
  stepConnector: {
    flex: 1,
    height: 2,
    backgroundColor: Colors.border,
    marginBottom: 20,
    marginHorizontal: 4,
  },
  scroll: {
    padding: 20,
    gap: 0,
    paddingBottom: 20,
  },
  sectionLabel: {
    fontSize: FontSizes.sm,
    fontFamily: 'Inter_600SemiBold',
    color: Colors.slate,
    marginBottom: 10,
    marginTop: 16,
  },
  rowCards: {
    flexDirection: 'row',
    gap: 10,
  },
  countryCard: {
    flex: 1,
    alignItems: 'center',
    gap: 6,
    paddingVertical: 14,
    borderRadius: 14,
    backgroundColor: Colors.white,
    borderWidth: 1.5,
    borderColor: Colors.border,
  },
  countryCardActive: {
    borderColor: Colors.teal,
    backgroundColor: Colors.surface,
  },
  countryFlag: {
    fontSize: 24,
  },
  countryName: {
    fontSize: FontSizes.xs,
    fontFamily: 'Inter_600SemiBold',
    color: Colors.slate,
  },
  countryNameActive: {
    color: Colors.teal,
  },
  destList: {
    gap: 8,
  },
  destCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 14,
    borderRadius: 14,
    backgroundColor: Colors.white,
    borderWidth: 1.5,
    borderColor: Colors.border,
  },
  destCardActive: {
    borderColor: Colors.teal,
    backgroundColor: Colors.surface,
  },
  destFlag: {
    fontSize: 24,
  },
  destInfo: {
    flex: 1,
  },
  destName: {
    fontSize: FontSizes.base,
    fontFamily: 'Inter_600SemiBold',
    color: Colors.ink,
  },
  destNameActive: {
    color: Colors.teal,
  },
  destDays: {
    fontSize: FontSizes.xs,
    fontFamily: 'Inter_400Regular',
    color: Colors.muted,
  },
  checkMark: {
    fontSize: 16,
    color: Colors.teal,
    fontFamily: 'Inter_700Bold',
  },
  datesRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  dateCard: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    padding: 14,
    borderRadius: 14,
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  dateIcon: {
    fontSize: 20,
  },
  dateLabelSm: {
    fontSize: FontSizes.xs,
    fontFamily: 'Inter_400Regular',
    color: Colors.muted,
  },
  dateValue: {
    fontSize: FontSizes.sm,
    fontFamily: 'Inter_600SemiBold',
    color: Colors.ink,
  },
  dateDash: {
    fontSize: FontSizes.lg,
    color: Colors.muted,
  },
  aiCard: {
    backgroundColor: Colors.white,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: Colors.border,
    marginTop: 16,
    gap: 12,
  },
  aiHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  aiIcon: {
    fontSize: 28,
  },
  aiHeaderText: {
    flex: 1,
  },
  aiTitle: {
    fontSize: FontSizes.base,
    fontFamily: 'Inter_600SemiBold',
    color: Colors.ink,
  },
  aiSub: {
    fontSize: FontSizes.xs,
    fontFamily: 'Inter_400Regular',
    color: Colors.muted,
  },
  eligResult: {
    gap: 10,
  },
  eligPass: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: '#D1FAE5',
    borderRadius: 10,
    padding: 12,
  },
  eligPassIcon: {
    fontSize: 24,
  },
  eligPassTitle: {
    fontSize: FontSizes.base,
    fontFamily: 'Inter_700Bold',
    color: Colors.emerald,
  },
  eligPassSub: {
    fontSize: FontSizes.xs,
    fontFamily: 'Inter_400Regular',
    color: Colors.emerald,
    marginTop: 2,
  },
  eligDetails: {
    gap: 6,
  },
  eligReq: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  eligReqCheck: {
    fontSize: 14,
    color: Colors.emerald,
  },
  eligReqText: {
    fontSize: FontSizes.sm,
    fontFamily: 'Inter_400Regular',
    color: Colors.slate,
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
