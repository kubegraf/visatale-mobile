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
import { Pill } from '../../components/ui/Pill';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { MainTabsParams } from '../../navigation/MainTabs';

type Props = BottomTabScreenProps<MainTabsParams, 'Track'>;

const FILTERS = ['All', 'Active', 'Approved', 'Pending', 'Rejected'];

const APPLICATIONS = [
  {
    id: 'VT-2024-08421',
    country: 'UAE',
    flag: '🇦🇪',
    visaType: 'Tourist · 30 days',
    status: 'In Progress',
    statusTone: 'amber' as const,
    progress: 0.65,
    submittedDate: 'Jun 3, 2025',
    expectedDate: 'Jun 8–10',
    travellers: 2,
  },
  {
    id: 'VT-2024-06112',
    country: 'France',
    flag: '🇫🇷',
    visaType: 'Schengen · 90 days',
    status: 'Approved',
    statusTone: 'emerald' as const,
    progress: 1,
    submittedDate: 'May 10, 2025',
    expectedDate: 'May 18, 2025',
    travellers: 1,
  },
  {
    id: 'VT-2024-04339',
    country: 'UK',
    flag: '🇬🇧',
    visaType: 'Tourist · 6 months',
    status: 'Under Review',
    statusTone: 'teal' as const,
    progress: 0.4,
    submittedDate: 'Apr 28, 2025',
    expectedDate: 'May 20–25',
    travellers: 3,
  },
  {
    id: 'VT-2024-03001',
    country: 'USA',
    flag: '🇺🇸',
    visaType: 'B1/B2 · 10 years',
    status: 'Rejected',
    statusTone: 'error' as const,
    progress: 1,
    submittedDate: 'Mar 12, 2025',
    expectedDate: 'Apr 2, 2025',
    travellers: 1,
  },
  {
    id: 'VT-2024-01500',
    country: 'Singapore',
    flag: '🇸🇬',
    visaType: 'Tourist · 30 days',
    status: 'Draft',
    statusTone: 'gray' as const,
    progress: 0.1,
    submittedDate: '—',
    expectedDate: '—',
    travellers: 2,
  },
];

export const TrackerScreen: React.FC<Props> = ({ navigation }) => {
  const [activeFilter, setActiveFilter] = useState('All');

  const filtered = APPLICATIONS.filter((app) => {
    if (activeFilter === 'All') return true;
    if (activeFilter === 'Active')
      return ['In Progress', 'Under Review'].includes(app.status);
    if (activeFilter === 'Approved') return app.status === 'Approved';
    if (activeFilter === 'Pending') return app.status === 'Draft';
    if (activeFilter === 'Rejected') return app.status === 'Rejected';
    return true;
  });

  const progressColor = (p: number) => {
    if (p === 1) return Colors.emerald;
    if (p > 0.5) return Colors.teal;
    if (p > 0.2) return Colors.amber;
    return Colors.muted;
  };

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.heading}>My Applications</Text>
        {/* Live banner */}
        <View style={styles.liveBanner}>
          <View style={styles.liveDot} />
          <Text style={styles.liveBannerText}>
            1 application receiving live embassy updates
          </Text>
        </View>
      </View>

      {/* Filter chips */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.filterScroll}
      >
        {FILTERS.map((f) => (
          <TouchableOpacity
            key={f}
            style={[
              styles.filterChip,
              activeFilter === f && styles.filterChipActive,
            ]}
            onPress={() => setActiveFilter(f)}
            activeOpacity={0.8}
          >
            <Text
              style={[
                styles.filterLabel,
                activeFilter === f && styles.filterLabelActive,
              ]}
            >
              {f}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        {filtered.map((app) => (
          <TouchableOpacity key={app.id} style={styles.appCard} activeOpacity={0.85}>
            {/* Card header */}
            <View style={styles.cardHeader}>
              <View style={styles.flagWrap}>
                <Text style={styles.flagText}>{app.flag}</Text>
              </View>
              <View style={styles.cardHeaderInfo}>
                <Text style={styles.cardCountry}>{app.country}</Text>
                <Text style={styles.cardVisaType}>{app.visaType}</Text>
              </View>
              <Pill label={app.status} tone={app.statusTone} dot size="sm" />
            </View>

            {/* Progress bar */}
            {app.progress > 0 && app.progress < 1 && (
              <View style={styles.progressSection}>
                <View style={styles.progressTrack}>
                  <View
                    style={[
                      styles.progressFill,
                      {
                        width: `${app.progress * 100}%`,
                        backgroundColor: progressColor(app.progress),
                      },
                    ]}
                  />
                </View>
                <Text
                  style={[styles.progressPct, { color: progressColor(app.progress) }]}
                >
                  {Math.round(app.progress * 100)}%
                </Text>
              </View>
            )}

            {/* Meta row */}
            <View style={styles.metaRow}>
              <View style={styles.metaItem}>
                <Text style={styles.metaLabel}>Submitted</Text>
                <Text style={styles.metaValue}>{app.submittedDate}</Text>
              </View>
              <View style={styles.metaItem}>
                <Text style={styles.metaLabel}>Expected</Text>
                <Text style={styles.metaValue}>{app.expectedDate}</Text>
              </View>
              <View style={styles.metaItem}>
                <Text style={styles.metaLabel}>Travellers</Text>
                <Text style={styles.metaValue}>{app.travellers}</Text>
              </View>
            </View>

            {/* ID */}
            <Text style={styles.appId}>{app.id}</Text>
          </TouchableOpacity>
        ))}

        {filtered.length === 0 && (
          <View style={styles.emptyState}>
            <Text style={styles.emptyIcon}>📋</Text>
            <Text style={styles.emptyTitle}>No applications found</Text>
            <Text style={styles.emptySub}>
              {activeFilter !== 'All' ? `No ${activeFilter.toLowerCase()} applications` : 'Start your first application'}
            </Text>
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
  header: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 12,
    gap: 10,
  },
  heading: {
    fontSize: FontSizes['2xl'],
    fontFamily: 'SpaceGrotesk_700Bold',
    color: Colors.ink,
  },
  liveBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#F0FDF4',
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: '#A7F3D0',
  },
  liveDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.emerald,
  },
  liveBannerText: {
    fontSize: FontSizes.xs,
    fontFamily: 'Inter_500Medium',
    color: Colors.emerald,
  },
  filterScroll: {
    paddingHorizontal: 20,
    gap: 8,
    paddingBottom: 12,
  },
  filterChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 100,
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  filterChipActive: {
    backgroundColor: Colors.teal,
    borderColor: Colors.teal,
  },
  filterLabel: {
    fontSize: FontSizes.xs,
    fontFamily: 'Inter_600SemiBold',
    color: Colors.slate,
  },
  filterLabelActive: {
    color: Colors.white,
  },
  scroll: {
    paddingHorizontal: 20,
    paddingBottom: 24,
    gap: 12,
  },
  appCard: {
    backgroundColor: Colors.white,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: Colors.border,
    gap: 10,
    shadowColor: Colors.ink,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  flagWrap: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: Colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: Colors.border,
  },
  flagText: {
    fontSize: 24,
  },
  cardHeaderInfo: {
    flex: 1,
  },
  cardCountry: {
    fontSize: FontSizes.md,
    fontFamily: 'SpaceGrotesk_600SemiBold',
    color: Colors.ink,
  },
  cardVisaType: {
    fontSize: FontSizes.xs,
    fontFamily: 'Inter_400Regular',
    color: Colors.muted,
    marginTop: 2,
  },
  progressSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  progressTrack: {
    flex: 1,
    height: 6,
    backgroundColor: Colors.border,
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 3,
  },
  progressPct: {
    fontSize: FontSizes.xs,
    fontFamily: 'Inter_600SemiBold',
    width: 32,
    textAlign: 'right',
  },
  metaRow: {
    flexDirection: 'row',
  },
  metaItem: {
    flex: 1,
  },
  metaLabel: {
    fontSize: FontSizes.xs,
    fontFamily: 'Inter_400Regular',
    color: Colors.muted,
    marginBottom: 2,
  },
  metaValue: {
    fontSize: FontSizes.xs,
    fontFamily: 'Inter_600SemiBold',
    color: Colors.ink,
  },
  appId: {
    fontSize: FontSizes.xs,
    fontFamily: 'JetBrainsMono_400Regular',
    color: Colors.muted,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 60,
    gap: 10,
  },
  emptyIcon: {
    fontSize: 48,
  },
  emptyTitle: {
    fontSize: FontSizes.lg,
    fontFamily: 'SpaceGrotesk_700Bold',
    color: Colors.ink,
  },
  emptySub: {
    fontSize: FontSizes.sm,
    fontFamily: 'Inter_400Regular',
    color: Colors.muted,
    textAlign: 'center',
  },
});
