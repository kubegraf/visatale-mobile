import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '../../constants/colors';
import { FontSizes } from '../../constants/typography';
import { Ring } from '../../components/ui/Ring';
import { AreaChart } from '../../components/ui/AreaChart';
import { BarChart } from '../../components/ui/BarChart';
import { Heatmap } from '../../components/ui/Heatmap';
import { Stat } from '../../components/ui/Stat';

const MONTHLY_DATA = [3, 5, 4, 8, 6, 9];
const MONTHLY_LABELS = ['Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr'];

const COUNTRY_BARS = [
  { flag: '🇦🇪', label: 'UAE', value: 42 },
  { flag: '🇫🇷', label: 'France', value: 28 },
  { flag: '🇬🇧', label: 'UK', value: 19 },
  { flag: '🇸🇬', label: 'Singapore', value: 15 },
  { flag: '🇺🇸', label: 'USA', value: 11 },
];

// Generate 12x7 heatmap data (12 weeks, 7 days each)
const HEATMAP_DATA = Array.from({ length: 12 }, (_, w) =>
  Array.from({ length: 7 }, (_, d) => {
    const weekActivity = [0, 2, 3, 1, 4, 5, 2, 3, 1, 0, 2, 4][w];
    const dayWeight = d === 1 || d === 3 ? 1.5 : 1;
    return Math.round(weekActivity * dayWeight * (0.5 + Math.random() * 0.5));
  })
);

export const StatsDashboardScreen: React.FC = () => {
  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text style={styles.heading}>My Stats</Text>
          <Text style={styles.subheading}>All-time application analytics</Text>
        </View>

        {/* Ring + success rate */}
        <View style={styles.successCard}>
          <Ring
            size={140}
            strokeWidth={14}
            progress={0.78}
            color={Colors.teal}
            trackColor={Colors.border}
            label="98%"
            sublabel="success rate"
          />
          <View style={styles.successInfo}>
            <Text style={styles.successTitle}>Approval Rate</Text>
            <Text style={styles.successSub}>
              39 of 40 applications approved across 8 countries
            </Text>
            <View style={styles.legendList}>
              {[
                { color: Colors.teal, label: 'Approved (39)' },
                { color: Colors.error, label: 'Rejected (1)' },
              ].map((l, i) => (
                <View key={i} style={styles.legendItem}>
                  <View style={[styles.legendDot, { backgroundColor: l.color }]} />
                  <Text style={styles.legendLabel}>{l.label}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>

        {/* Stat cards row */}
        <View style={styles.statsRow}>
          <Stat
            label="Total Applications"
            value="40"
            delta="+9 this year"
            deltaPositive
            sparkData={[5, 8, 10, 14, 22, 40]}
            accent={Colors.ink}
          />
          <Stat
            label="Countries Visited"
            value="8"
            delta="+2 this year"
            deltaPositive
            sparkData={[2, 3, 4, 5, 6, 8]}
            sparkColor={Colors.amber}
            accent={Colors.amber}
          />
        </View>

        {/* Area chart */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Applications per Month</Text>
          <Text style={styles.cardSub}>Last 6 months</Text>
          <View style={styles.chartWrap}>
            <AreaChart
              data={MONTHLY_DATA}
              labels={MONTHLY_LABELS}
              width={styles.chartWrap.width as number}
              height={130}
              color={Colors.teal}
            />
          </View>
        </View>

        {/* Bar chart */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Applications by Country</Text>
          <Text style={styles.cardSub}>Top 5 destinations</Text>
          <BarChart data={COUNTRY_BARS} color={Colors.teal} />
        </View>

        {/* Heatmap */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Activity Heatmap</Text>
          <Text style={styles.cardSub}>Last 12 weeks</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <Heatmap data={HEATMAP_DATA} color={Colors.teal} />
          </ScrollView>
        </View>

        {/* Processing time card */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Average Processing Times</Text>
          <View style={styles.timeList}>
            {[
              { flag: '🇦🇪', country: 'UAE', avg: '4.2', unit: 'days' },
              { flag: '🇫🇷', country: 'France (Schengen)', avg: '11', unit: 'days' },
              { flag: '🇬🇧', country: 'UK', avg: '18', unit: 'days' },
              { flag: '🇸🇬', country: 'Singapore', avg: '3', unit: 'days' },
            ].map((t, i) => (
              <View key={i} style={styles.timeRow}>
                <Text style={styles.timeFlag}>{t.flag}</Text>
                <Text style={styles.timeCountry}>{t.country}</Text>
                <Text style={styles.timeValue}>
                  {t.avg}{' '}
                  <Text style={styles.timeUnit}>{t.unit}</Text>
                </Text>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: Colors.canvas,
  },
  scroll: {
    padding: 20,
    paddingBottom: 40,
    gap: 16,
  },
  header: {
    gap: 4,
  },
  heading: {
    fontSize: FontSizes['2xl'],
    fontFamily: 'SpaceGrotesk_700Bold',
    color: Colors.ink,
  },
  subheading: {
    fontSize: FontSizes.sm,
    fontFamily: 'Inter_400Regular',
    color: Colors.muted,
  },
  successCard: {
    backgroundColor: Colors.white,
    borderRadius: 20,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  successInfo: {
    flex: 1,
    gap: 6,
  },
  successTitle: {
    fontSize: FontSizes.lg,
    fontFamily: 'SpaceGrotesk_700Bold',
    color: Colors.ink,
  },
  successSub: {
    fontSize: FontSizes.xs,
    fontFamily: 'Inter_400Regular',
    color: Colors.muted,
    lineHeight: 18,
  },
  legendList: {
    gap: 5,
    marginTop: 4,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
  },
  legendDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  legendLabel: {
    fontSize: FontSizes.xs,
    fontFamily: 'Inter_500Medium',
    color: Colors.slate,
  },
  statsRow: {
    flexDirection: 'row',
    gap: 12,
  },
  card: {
    backgroundColor: Colors.white,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: Colors.border,
    gap: 10,
  },
  cardTitle: {
    fontSize: FontSizes.md,
    fontFamily: 'SpaceGrotesk_600SemiBold',
    color: Colors.ink,
  },
  cardSub: {
    fontSize: FontSizes.xs,
    fontFamily: 'Inter_400Regular',
    color: Colors.muted,
    marginTop: -6,
  },
  chartWrap: {
    width: 320,
  },
  timeList: {
    gap: 10,
  },
  timeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  timeFlag: {
    fontSize: 18,
  },
  timeCountry: {
    flex: 1,
    fontSize: FontSizes.sm,
    fontFamily: 'Inter_500Medium',
    color: Colors.slate,
  },
  timeValue: {
    fontSize: FontSizes.base,
    fontFamily: 'SpaceGrotesk_700Bold',
    color: Colors.teal,
  },
  timeUnit: {
    fontSize: FontSizes.xs,
    fontFamily: 'Inter_400Regular',
    color: Colors.muted,
  },
});
