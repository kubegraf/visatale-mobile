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
import { Pill } from '../../components/ui/Pill';
import { Ring } from '../../components/ui/Ring';
import { Btn } from '../../components/ui/Btn';

const TIMELINE = [
  {
    step: 1,
    title: 'Application Submitted',
    sub: 'All details verified',
    date: 'Jun 3, 09:14 AM',
    done: true,
  },
  {
    step: 2,
    title: 'Documents Uploaded',
    sub: 'Passport, photo, bank statement',
    date: 'Jun 3, 11:32 AM',
    done: true,
  },
  {
    step: 3,
    title: 'Under Embassy Review',
    sub: 'Processing in progress',
    date: 'Jun 4, 10:00 AM',
    done: true,
    active: true,
  },
  {
    step: 4,
    title: 'Visa Decision',
    sub: 'Expected Jun 8–10',
    date: null,
    done: false,
  },
  {
    step: 5,
    title: 'Visa Issued',
    sub: 'Sent to your email',
    date: null,
    done: false,
  },
];

const DOCS = [
  { name: 'Passport Copy', status: 'Verified', icon: '📗' },
  { name: 'Passport Photo', status: 'Verified', icon: '📷' },
  { name: 'Bank Statement', status: 'Under Review', icon: '🏦' },
  { name: 'Flight Itinerary', status: 'Pending', icon: '✈️' },
  { name: 'Hotel Booking', status: 'Pending', icon: '🏨' },
];

const TABS = ['Timeline', 'Documents', 'Specialist'];

export const AppDetailScreen: React.FC = () => {
  const [activeTab, setActiveTab] = useState('Timeline');

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      {/* Header gradient */}
      <LinearGradient
        colors={[Colors.teal, Colors.tealDark]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.heroHeader}
      >
        <View style={styles.heroTop}>
          <View>
            <Pill label="In Progress" tone="white" dot />
            <Text style={styles.heroTitle}>UAE Tourist Visa</Text>
            <Text style={styles.heroId}>#VT-2024-08421</Text>
          </View>
          <Ring
            size={80}
            strokeWidth={7}
            progress={0.65}
            color={Colors.white}
            trackColor="rgba(255,255,255,0.2)"
            label="65%"
            sublabel="complete"
            labelColor={Colors.white}
          />
        </View>
        <View style={styles.heroMeta}>
          <View style={styles.heroMetaItem}>
            <Text style={styles.heroMetaLabel}>Submitted</Text>
            <Text style={styles.heroMetaValue}>Jun 3, 2025</Text>
          </View>
          <View style={styles.heroMetaDivider} />
          <View style={styles.heroMetaItem}>
            <Text style={styles.heroMetaLabel}>Expected</Text>
            <Text style={styles.heroMetaValue}>Jun 8–10</Text>
          </View>
          <View style={styles.heroMetaDivider} />
          <View style={styles.heroMetaItem}>
            <Text style={styles.heroMetaLabel}>Travellers</Text>
            <Text style={styles.heroMetaValue}>2 adults</Text>
          </View>
        </View>
        <View style={styles.heroDecor} />
      </LinearGradient>

      {/* Tab bar */}
      <View style={styles.tabRow}>
        {TABS.map((tab) => (
          <TouchableOpacity
            key={tab}
            style={[styles.tabItem, activeTab === tab && styles.tabItemActive]}
            onPress={() => setActiveTab(tab)}
            activeOpacity={0.7}
          >
            <Text
              style={[styles.tabLabel, activeTab === tab && styles.tabLabelActive]}
            >
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        {activeTab === 'Timeline' && (
          <View style={styles.timeline}>
            {TIMELINE.map((item, i) => (
              <View key={i} style={styles.timelineRow}>
                {/* Connector line */}
                <View style={styles.timelineLeft}>
                  <View
                    style={[
                      styles.timelineDot,
                      item.done
                        ? item.active
                          ? styles.timelineDotActive
                          : styles.timelineDotDone
                        : styles.timelineDotPending,
                    ]}
                  >
                    {item.done && !item.active && (
                      <Text style={styles.timelineDotCheck}>✓</Text>
                    )}
                    {item.active && (
                      <View style={styles.timelinePulse} />
                    )}
                    {!item.done && (
                      <Text style={styles.timelineDotNum}>{item.step}</Text>
                    )}
                  </View>
                  {i < TIMELINE.length - 1 && (
                    <View
                      style={[
                        styles.timelineLine,
                        i < 2 ? styles.timelineLineDone : styles.timelineLinePending,
                      ]}
                    />
                  )}
                </View>
                {/* Content */}
                <View style={styles.timelineContent}>
                  <Text
                    style={[
                      styles.timelineTitle,
                      item.active && styles.timelineTitleActive,
                    ]}
                  >
                    {item.title}
                  </Text>
                  <Text style={styles.timelineSub}>{item.sub}</Text>
                  {item.date && (
                    <Text style={styles.timelineDate}>{item.date}</Text>
                  )}
                  {item.active && (
                    <Pill label="In Progress" tone="amber" dot size="sm" />
                  )}
                </View>
              </View>
            ))}
          </View>
        )}

        {activeTab === 'Documents' && (
          <View style={styles.docList}>
            {DOCS.map((doc, i) => (
              <View key={i} style={styles.docRow}>
                <Text style={styles.docIcon}>{doc.icon}</Text>
                <View style={styles.docInfo}>
                  <Text style={styles.docName}>{doc.name}</Text>
                </View>
                <Pill
                  label={doc.status}
                  tone={
                    doc.status === 'Verified'
                      ? 'emerald'
                      : doc.status === 'Under Review'
                      ? 'amber'
                      : 'gray'
                  }
                  size="sm"
                />
              </View>
            ))}
            <Btn label="Upload Missing Docs" kind="outline" size="md" onPress={() => {}} />
          </View>
        )}

        {activeTab === 'Specialist' && (
          <View style={styles.specialistSection}>
            <View style={styles.specialistCard}>
              <View style={styles.specAvatar}>
                <Text style={styles.specAvatarEmoji}>👩</Text>
              </View>
              <View style={styles.specInfo}>
                <Text style={styles.specName}>Ananya Patel</Text>
                <Text style={styles.specRole}>Senior Visa Specialist · UAE Expert</Text>
                <View style={styles.onlineRow}>
                  <View style={styles.onlineDot} />
                  <Text style={styles.onlineText}>Online · Available now</Text>
                </View>
              </View>
            </View>
            <View style={styles.specStats}>
              {[
                { label: 'Applications handled', value: '2,400+' },
                { label: 'Success rate', value: '99.1%' },
                { label: 'Avg. response', value: '< 5 min' },
              ].map((s, i) => (
                <View key={i} style={styles.specStat}>
                  <Text style={styles.specStatValue}>{s.value}</Text>
                  <Text style={styles.specStatLabel}>{s.label}</Text>
                </View>
              ))}
            </View>
            <Btn label="💬 Chat with Ananya" onPress={() => {}} />
            <Btn label="📞 Call Now" kind="outline" onPress={() => {}} />
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: Colors.canvas,
  },
  heroHeader: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 20,
    overflow: 'hidden',
    position: 'relative',
  },
  heroTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  heroTitle: {
    fontSize: FontSizes['2xl'],
    fontFamily: 'SpaceGrotesk_700Bold',
    color: Colors.white,
    marginTop: 8,
    letterSpacing: -0.3,
  },
  heroId: {
    fontSize: FontSizes.xs,
    fontFamily: 'JetBrainsMono_400Regular',
    color: 'rgba(255,255,255,0.65)',
    marginTop: 4,
  },
  heroMeta: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255,255,255,0.12)',
    borderRadius: 12,
    padding: 12,
    alignItems: 'center',
  },
  heroMetaItem: {
    flex: 1,
    alignItems: 'center',
  },
  heroMetaLabel: {
    fontSize: FontSizes.xs,
    fontFamily: 'Inter_400Regular',
    color: 'rgba(255,255,255,0.65)',
    marginBottom: 2,
  },
  heroMetaValue: {
    fontSize: FontSizes.sm,
    fontFamily: 'Inter_600SemiBold',
    color: Colors.white,
  },
  heroMetaDivider: {
    width: 1,
    height: 28,
    backgroundColor: 'rgba(255,255,255,0.2)',
  },
  heroDecor: {
    position: 'absolute',
    width: 160,
    height: 160,
    borderRadius: 80,
    backgroundColor: 'rgba(255,255,255,0.05)',
    top: -50,
    right: -40,
  },
  tabRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
    backgroundColor: Colors.white,
  },
  tabItem: {
    flex: 1,
    paddingVertical: 14,
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  tabItemActive: {
    borderBottomColor: Colors.teal,
  },
  tabLabel: {
    fontSize: FontSizes.sm,
    fontFamily: 'Inter_500Medium',
    color: Colors.muted,
  },
  tabLabelActive: {
    fontFamily: 'Inter_600SemiBold',
    color: Colors.teal,
  },
  scroll: {
    padding: 20,
    paddingBottom: 40,
  },
  timeline: {
    gap: 0,
  },
  timelineRow: {
    flexDirection: 'row',
    gap: 14,
    minHeight: 70,
  },
  timelineLeft: {
    alignItems: 'center',
    width: 32,
  },
  timelineDot: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
  },
  timelineDotDone: {
    backgroundColor: Colors.emerald,
  },
  timelineDotActive: {
    backgroundColor: Colors.amber,
  },
  timelineDotPending: {
    backgroundColor: Colors.border,
  },
  timelineDotCheck: {
    fontSize: 14,
    color: Colors.white,
    fontFamily: 'Inter_700Bold',
  },
  timelineDotNum: {
    fontSize: FontSizes.sm,
    fontFamily: 'Inter_700Bold',
    color: Colors.muted,
  },
  timelinePulse: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: Colors.white,
  },
  timelineLine: {
    width: 2,
    flex: 1,
    marginTop: 4,
  },
  timelineLineDone: {
    backgroundColor: Colors.emerald,
  },
  timelineLinePending: {
    backgroundColor: Colors.border,
  },
  timelineContent: {
    flex: 1,
    paddingBottom: 24,
    gap: 3,
  },
  timelineTitle: {
    fontSize: FontSizes.base,
    fontFamily: 'Inter_600SemiBold',
    color: Colors.ink,
  },
  timelineTitleActive: {
    color: Colors.amber,
  },
  timelineSub: {
    fontSize: FontSizes.xs,
    fontFamily: 'Inter_400Regular',
    color: Colors.muted,
  },
  timelineDate: {
    fontSize: FontSizes.xs,
    fontFamily: 'JetBrainsMono_400Regular',
    color: Colors.muted,
    marginTop: 2,
  },
  docList: {
    gap: 12,
  },
  docRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: Colors.white,
    borderRadius: 12,
    padding: 14,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  docIcon: {
    fontSize: 24,
  },
  docInfo: {
    flex: 1,
  },
  docName: {
    fontSize: FontSizes.sm,
    fontFamily: 'Inter_600SemiBold',
    color: Colors.ink,
  },
  specialistSection: {
    gap: 16,
  },
  specialistCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    backgroundColor: Colors.white,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  specAvatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: Colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: Colors.teal,
  },
  specAvatarEmoji: {
    fontSize: 32,
  },
  specInfo: {
    flex: 1,
    gap: 3,
  },
  specName: {
    fontSize: FontSizes.md,
    fontFamily: 'SpaceGrotesk_700Bold',
    color: Colors.ink,
  },
  specRole: {
    fontSize: FontSizes.xs,
    fontFamily: 'Inter_400Regular',
    color: Colors.slate,
  },
  onlineRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    marginTop: 2,
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
  specStats: {
    flexDirection: 'row',
    backgroundColor: Colors.white,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  specStat: {
    flex: 1,
    alignItems: 'center',
    gap: 3,
  },
  specStatValue: {
    fontSize: FontSizes.lg,
    fontFamily: 'SpaceGrotesk_700Bold',
    color: Colors.ink,
  },
  specStatLabel: {
    fontSize: FontSizes.xs,
    fontFamily: 'Inter_400Regular',
    color: Colors.muted,
    textAlign: 'center',
  },
});
