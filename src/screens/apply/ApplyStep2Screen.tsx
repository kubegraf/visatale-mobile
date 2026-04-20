import React, { useState } from 'react';
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

const STEPS = ['Route', 'Profile', 'Plan'];

interface Traveller {
  id: string;
  name: string;
  type: string;
  passport: string;
  dob: string;
  expiry: string;
}

const PRIMARY: Traveller = {
  id: '1',
  name: 'Priya Sharma',
  type: 'Primary',
  passport: 'Z1234567',
  dob: '12 Mar 1990',
  expiry: '10 Jun 2028',
};

export const ApplyStep2Screen: React.FC = () => {
  const [travellers, setTravellers] = useState<Traveller[]>([PRIMARY]);

  const addTraveller = () => {
    setTravellers((prev) => [
      ...prev,
      {
        id: String(Date.now()),
        name: `Traveller ${prev.length + 1}`,
        type: 'Additional',
        passport: 'A' + Math.floor(Math.random() * 9000000 + 1000000),
        dob: '01 Jan 1995',
        expiry: '01 Jan 2029',
      },
    ]);
  };

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScreenHeader title="New Application" />
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.heading}>Traveller Profile</Text>
        <View style={styles.stepper}>
          {STEPS.map((step, i) => (
            <React.Fragment key={i}>
              <View style={styles.stepItem}>
                <View
                  style={[
                    styles.stepCircle,
                    i === 0
                      ? styles.stepCircleDone
                      : i === 1
                      ? styles.stepCircleActive
                      : styles.stepCirclePending,
                  ]}
                >
                  <Text
                    style={[
                      styles.stepNum,
                      i < 2 ? styles.stepNumActive : styles.stepNumPending,
                    ]}
                  >
                    {i === 0 ? '✓' : i + 1}
                  </Text>
                </View>
                <Text
                  style={[
                    styles.stepLabel,
                    i === 1 ? styles.stepLabelActive : styles.stepLabelPending,
                  ]}
                >
                  {step}
                </Text>
              </View>
              {i < STEPS.length - 1 && (
                <View
                  style={[
                    styles.stepConnector,
                    i === 0 && styles.stepConnectorDone,
                  ]}
                />
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
        <Text style={styles.sectionLabel}>Travellers ({travellers.length})</Text>

        {travellers.map((t, i) => (
          <View key={t.id} style={[styles.profileCard, i === 0 && styles.primaryCard]}>
            {/* Card header */}
            <View style={styles.cardHeader}>
              <View style={styles.avatarWrap}>
                <Text style={styles.avatarText}>{t.name.charAt(0)}</Text>
              </View>
              <View style={styles.cardHeaderInfo}>
                <Text style={styles.cardName}>{t.name}</Text>
                <Text style={styles.cardType}>
                  {t.type === 'Primary' ? 'Primary traveller' : 'Additional traveller'}
                </Text>
              </View>
              {i > 0 && (
                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={() =>
                    setTravellers((prev) => prev.filter((tr) => tr.id !== t.id))
                  }
                >
                  <Text style={styles.removeBtn}>✕</Text>
                </TouchableOpacity>
              )}
            </View>

            {/* Details grid */}
            <View style={styles.detailsGrid}>
              <View style={styles.detailItem}>
                <Text style={styles.detailLabel}>Passport No.</Text>
                <Text style={styles.detailValue}>{t.passport}</Text>
              </View>
              <View style={styles.detailItem}>
                <Text style={styles.detailLabel}>Date of Birth</Text>
                <Text style={styles.detailValue}>{t.dob}</Text>
              </View>
              <View style={styles.detailItem}>
                <Text style={styles.detailLabel}>Passport Expiry</Text>
                <Text style={styles.detailValue}>{t.expiry}</Text>
              </View>
              <View style={styles.detailItem}>
                <Text style={styles.detailLabel}>Nationality</Text>
                <Text style={styles.detailValue}>🇮🇳 Indian</Text>
              </View>
            </View>

            {/* Edit row */}
            <TouchableOpacity style={styles.editBtn} activeOpacity={0.7}>
              <Text style={styles.editBtnLabel}>Edit details</Text>
            </TouchableOpacity>
          </View>
        ))}

        {/* Add traveller */}
        <TouchableOpacity
          style={styles.addCard}
          activeOpacity={0.8}
          onPress={addTraveller}
        >
          <View style={styles.addIconWrap}>
            <Text style={styles.addIcon}>+</Text>
          </View>
          <Text style={styles.addLabel}>Add another traveller</Text>
        </TouchableOpacity>

        {/* Passport validity note */}
        <View style={styles.noteCard}>
          <View style={styles.noteDot} />
          <Text style={styles.noteText}>
            All passports must be valid for at least 6 months beyond the intended stay.
          </Text>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <Btn label="Continue to Plan →" onPress={() => {}} />
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
  stepConnectorDone: {
    backgroundColor: Colors.emerald,
  },
  scrollView: {
    flex: 1,
  },
  scroll: {
    padding: 20,
    paddingBottom: 20,
  },
  sectionLabel: {
    fontSize: FontSizes.sm,
    fontFamily: 'Inter_600SemiBold',
    color: Colors.slate,
    marginBottom: 14,
  },
  profileCard: {
    backgroundColor: Colors.white,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: Colors.border,
    marginBottom: 12,
  },
  primaryCard: {
    borderColor: Colors.teal,
    borderWidth: 1.5,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 14,
  },
  avatarWrap: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: Colors.teal,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    fontSize: FontSizes.xl,
    fontFamily: 'SpaceGrotesk_700Bold',
    color: Colors.white,
  },
  cardHeaderInfo: {
    flex: 1,
  },
  cardName: {
    fontSize: FontSizes.md,
    fontFamily: 'Inter_700Bold',
    color: Colors.ink,
  },
  cardType: {
    fontSize: FontSizes.xs,
    fontFamily: 'Inter_400Regular',
    color: Colors.muted,
    marginTop: 2,
  },
  removeBtn: {
    fontSize: FontSizes.base,
    color: Colors.error,
    fontFamily: 'Inter_600SemiBold',
    padding: 4,
  },
  detailsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 12,
  },
  detailItem: {
    width: '47%',
  },
  detailLabel: {
    fontSize: FontSizes.xs,
    fontFamily: 'Inter_400Regular',
    color: Colors.muted,
    marginBottom: 2,
  },
  detailValue: {
    fontSize: FontSizes.sm,
    fontFamily: 'JetBrainsMono_400Regular',
    color: Colors.ink,
  },
  editBtn: {
    backgroundColor: Colors.surface,
    borderRadius: 10,
    paddingVertical: 10,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.border,
  },
  editBtnLabel: {
    fontSize: FontSizes.sm,
    fontFamily: 'Inter_600SemiBold',
    color: Colors.teal,
  },
  addCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 16,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: Colors.border,
    borderStyle: 'dashed',
    backgroundColor: Colors.white,
    marginBottom: 16,
  },
  addIconWrap: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: Colors.teal,
  },
  addIcon: {
    fontSize: 22,
    color: Colors.teal,
    fontFamily: 'Inter_700Bold',
  },
  addLabel: {
    fontSize: FontSizes.base,
    fontFamily: 'Inter_600SemiBold',
    color: Colors.teal,
  },
  noteCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
    backgroundColor: '#FEF3C7',
    borderRadius: 10,
    padding: 12,
  },
  noteDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.amber,
    marginTop: 4,
    flexShrink: 0,
  },
  noteText: {
    flex: 1,
    fontSize: FontSizes.xs,
    fontFamily: 'Inter_400Regular',
    color: '#92400E',
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
