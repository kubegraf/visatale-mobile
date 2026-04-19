import React from 'react';
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
import { Stat } from '../../components/ui/Stat';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { MainTabsParams } from '../../navigation/MainTabs';

type Props = BottomTabScreenProps<MainTabsParams, 'Home'>;

const QUICK_ACTIONS = [
  { icon: '✈️', label: 'New Application', color: Colors.teal },
  { icon: '📄', label: 'Upload Docs', color: Colors.emerald },
  { icon: '💬', label: 'Chat Expert', color: '#6366F1' },
  { icon: '🗺️', label: 'Country Guide', color: Colors.amber },
];

const TRENDING = [
  { flag: '🇦🇪', name: 'Dubai', tag: 'Free', tone: 'emerald' as const },
  { flag: '🇫🇷', name: 'France', tag: '14d', tone: 'teal' as const },
  { flag: '🇬🇧', name: 'UK', tag: 'New', tone: 'amber' as const },
  { flag: '🇸🇬', name: 'Singapore', tag: 'Fast', tone: 'teal' as const },
  { flag: '🇺🇸', name: 'USA', tag: 'B1/B2', tone: 'gray' as const },
];

const RECENT_ACTIVITY = [
  {
    icon: '✅',
    title: 'Document verified',
    sub: 'Passport scan accepted',
    time: '2m ago',
    positive: true,
  },
  {
    icon: '📋',
    title: 'Form 11A submitted',
    sub: 'UAE Tourist Visa',
    time: '1h ago',
    positive: true,
  },
  {
    icon: '⚠️',
    title: 'Action required',
    sub: 'Upload bank statement',
    time: '3h ago',
    positive: false,
  },
];

export const HomeScreen: React.FC<Props> = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scroll}
      >
        {/* Top bar */}
        <View style={styles.topBar}>
          <View>
            <Text style={styles.greeting}>Good morning 👋</Text>
            <Text style={styles.userName}>Priya Sharma</Text>
          </View>
          <TouchableOpacity style={styles.notifBtn} activeOpacity={0.8}>
            <Text style={styles.notifIcon}>🔔</Text>
            <View style={styles.notifBadge} />
          </TouchableOpacity>
        </View>

        {/* Hero card */}
        <LinearGradient
          colors={[Colors.teal, Colors.tealDark, '#064E3B']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.heroCard}
        >
          {/* Top row */}
          <View style={styles.heroTop}>
            <View>
              <Pill label="Active Application" tone="white" dot />
              <Text style={styles.heroTitle}>UAE Tourist Visa</Text>
              <Text style={styles.heroSub}>Application #VT-2024-08421</Text>
            </View>
            <Ring
              size={76}
              strokeWidth={7}
              progress={0.65}
              color={Colors.white}
              trackColor="rgba(255,255,255,0.2)"
              label="65%"
              labelColor={Colors.white}
              sublabel="done"
            />
          </View>

          {/* Step progress bar */}
          <View style={styles.stepRow}>
            {['Documents', 'Review', 'Payment', 'Submit'].map((step, i) => (
              <View key={i} style={styles.stepItem}>
                <View
                  style={[
                    styles.stepDot,
                    i < 3
                      ? styles.stepDotDone
                      : i === 3
                      ? styles.stepDotActive
                      : styles.stepDotPending,
                  ]}
                />
                <Text style={styles.stepLabel} numberOfLines={1}>
                  {step}
                </Text>
              </View>
            ))}
          </View>

          {/* Specialist row */}
          <View style={styles.specialistRow}>
            <View style={styles.specialistAvatar}>
              <Text style={{ fontSize: 18 }}>👩</Text>
            </View>
            <View style={styles.specialistInfo}>
              <Text style={styles.specialistName}>Ananya — your specialist</Text>
              <View style={styles.onlineRow}>
                <View style={styles.onlineDot} />
                <Text style={styles.onlineText}>online · typing…</Text>
              </View>
            </View>
            <TouchableOpacity style={styles.chatBtn} activeOpacity={0.85}>
              <Text style={styles.chatBtnLabel}>Chat</Text>
            </TouchableOpacity>
          </View>

          {/* Decorative */}
          <View style={styles.heroDecor1} />
          <View style={styles.heroDecor2} />
        </LinearGradient>

        {/* Stats pair */}
        <View style={styles.statsRow}>
          <Stat
            label="Applications"
            value="8"
            delta="2 this month"
            deltaPositive
            sparkData={[3, 5, 4, 6, 7, 8]}
            sparkColor={Colors.teal}
            accent={Colors.ink}
          />
          <Stat
            label="Success Rate"
            value="98%"
            delta="↑ 2%"
            deltaPositive
            sparkData={[88, 90, 93, 95, 96, 98]}
            sparkColor={Colors.emerald}
            accent={Colors.emerald}
          />
        </View>

        {/* Quick actions */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
        </View>
        <View style={styles.quickGrid}>
          {QUICK_ACTIONS.map((action, i) => (
            <TouchableOpacity key={i} style={styles.quickCard} activeOpacity={0.8}>
              <View
                style={[
                  styles.quickIconWrap,
                  { backgroundColor: action.color + '18' },
                ]}
              >
                <Text style={styles.quickIcon}>{action.icon}</Text>
              </View>
              <Text style={styles.quickLabel}>{action.label}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Trending destinations */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Trending Destinations</Text>
          <TouchableOpacity activeOpacity={0.7}>
            <Text style={styles.seeAll}>See all</Text>
          </TouchableOpacity>
        </View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.trendingScroll}
        >
          {TRENDING.map((d, i) => (
            <TouchableOpacity key={i} style={styles.destCard} activeOpacity={0.8}>
              <Text style={styles.destFlag}>{d.flag}</Text>
              <Text style={styles.destName}>{d.name}</Text>
              <Pill label={d.tag} tone={d.tone} size="sm" />
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Recent activity */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Recent Activity</Text>
        </View>
        <View style={styles.activityCard}>
          {RECENT_ACTIVITY.map((item, i) => (
            <View
              key={i}
              style={[
                styles.activityRow,
                i < RECENT_ACTIVITY.length - 1 && styles.activityRowBorder,
              ]}
            >
              <View
                style={[
                  styles.activityIconWrap,
                  {
                    backgroundColor: item.positive
                      ? '#D1FAE5'
                      : '#FEF3C7',
                  },
                ]}
              >
                <Text style={styles.activityIcon}>{item.icon}</Text>
              </View>
              <View style={styles.activityContent}>
                <Text style={styles.activityTitle}>{item.title}</Text>
                <Text style={styles.activitySub}>{item.sub}</Text>
              </View>
              <Text style={styles.activityTime}>{item.time}</Text>
            </View>
          ))}
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
    paddingBottom: 24,
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 16,
  },
  greeting: {
    fontSize: FontSizes.sm,
    fontFamily: 'Inter_400Regular',
    color: Colors.muted,
  },
  userName: {
    fontSize: FontSizes.xl,
    fontFamily: 'SpaceGrotesk_700Bold',
    color: Colors.ink,
  },
  notifBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: Colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: Colors.border,
    position: 'relative',
  },
  notifIcon: {
    fontSize: 20,
  },
  notifBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.error,
    borderWidth: 1.5,
    borderColor: Colors.white,
  },
  heroCard: {
    marginHorizontal: 20,
    borderRadius: 24,
    padding: 20,
    marginBottom: 16,
    overflow: 'hidden',
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
  heroSub: {
    fontSize: FontSizes.xs,
    fontFamily: 'Inter_400Regular',
    color: 'rgba(255,255,255,0.65)',
    marginTop: 2,
    fontFamily: 'JetBrainsMono_400Regular',
  },
  stepRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 4,
    marginBottom: 16,
  },
  stepItem: {
    flex: 1,
    alignItems: 'center',
    gap: 4,
  },
  stepDot: {
    width: '100%',
    height: 4,
    borderRadius: 2,
  },
  stepDotDone: {
    backgroundColor: Colors.white,
  },
  stepDotActive: {
    backgroundColor: Colors.amberLight,
  },
  stepDotPending: {
    backgroundColor: 'rgba(255,255,255,0.25)',
  },
  stepLabel: {
    fontSize: 9,
    fontFamily: 'Inter_400Regular',
    color: 'rgba(255,255,255,0.65)',
    textAlign: 'center',
  },
  specialistRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.12)',
    borderRadius: 12,
    padding: 12,
    gap: 10,
  },
  specialistAvatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  specialistInfo: {
    flex: 1,
  },
  specialistName: {
    fontSize: FontSizes.sm,
    fontFamily: 'Inter_600SemiBold',
    color: Colors.white,
  },
  onlineRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    marginTop: 2,
  },
  onlineDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#4ADE80',
  },
  onlineText: {
    fontSize: FontSizes.xs,
    fontFamily: 'Inter_400Regular',
    color: 'rgba(255,255,255,0.7)',
  },
  chatBtn: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.3)',
  },
  chatBtnLabel: {
    fontSize: FontSizes.xs,
    fontFamily: 'Inter_600SemiBold',
    color: Colors.white,
  },
  heroDecor1: {
    position: 'absolute',
    width: 160,
    height: 160,
    borderRadius: 80,
    backgroundColor: 'rgba(255,255,255,0.05)',
    top: -40,
    right: -40,
  },
  heroDecor2: {
    position: 'absolute',
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'rgba(255,255,255,0.04)',
    bottom: -30,
    left: 20,
  },
  statsRow: {
    flexDirection: 'row',
    gap: 12,
    marginHorizontal: 20,
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: FontSizes.md,
    fontFamily: 'SpaceGrotesk_600SemiBold',
    color: Colors.ink,
  },
  seeAll: {
    fontSize: FontSizes.sm,
    fontFamily: 'Inter_500Medium',
    color: Colors.teal,
  },
  quickGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  quickCard: {
    width: '47%',
    backgroundColor: Colors.white,
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  quickIconWrap: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  quickIcon: {
    fontSize: 20,
  },
  quickLabel: {
    fontSize: FontSizes.sm,
    fontFamily: 'Inter_600SemiBold',
    color: Colors.ink,
    flex: 1,
  },
  trendingScroll: {
    paddingHorizontal: 20,
    gap: 10,
    marginBottom: 24,
  },
  destCard: {
    backgroundColor: Colors.white,
    borderRadius: 16,
    padding: 14,
    alignItems: 'center',
    gap: 6,
    borderWidth: 1,
    borderColor: Colors.border,
    minWidth: 88,
  },
  destFlag: {
    fontSize: 28,
  },
  destName: {
    fontSize: FontSizes.xs,
    fontFamily: 'Inter_600SemiBold',
    color: Colors.ink,
  },
  activityCard: {
    marginHorizontal: 20,
    backgroundColor: Colors.white,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: Colors.border,
    overflow: 'hidden',
  },
  activityRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    gap: 12,
  },
  activityRowBorder: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  activityIconWrap: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  activityIcon: {
    fontSize: 18,
  },
  activityContent: {
    flex: 1,
  },
  activityTitle: {
    fontSize: FontSizes.sm,
    fontFamily: 'Inter_600SemiBold',
    color: Colors.ink,
  },
  activitySub: {
    fontSize: FontSizes.xs,
    fontFamily: 'Inter_400Regular',
    color: Colors.muted,
    marginTop: 2,
  },
  activityTime: {
    fontSize: FontSizes.xs,
    fontFamily: 'Inter_400Regular',
    color: Colors.muted,
  },
});
