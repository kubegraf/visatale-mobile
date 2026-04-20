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
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { MainTabsParams } from '../../navigation/MainTabs';
import {
  DocumentIcon,
  PassportIcon,
  BankIcon,
  GlobeIcon,
  CurrencyRupeeIcon,
  BellIcon,
  SettingsIcon,
  EmailIcon,
  PhoneIcon,
  LockIcon,
  FaceIdIcon,
  StarIcon,
  ShieldIcon,
  ChecklistIcon,
  ChevronRight,
} from '../../components/ui/Icons';

type Props = BottomTabScreenProps<MainTabsParams, 'Profile'>;

type SettingsIconKey =
  | 'document' | 'passport' | 'bank' | 'globe' | 'currency' | 'bell'
  | 'settings' | 'email' | 'phone' | 'lock' | 'faceid' | 'shield'
  | 'checklist' | 'star';

function SettingsItemIcon({ iconKey }: { iconKey: SettingsIconKey }) {
  const color = Colors.slate;
  const size = 18;
  switch (iconKey) {
    case 'document': return <DocumentIcon size={size} color={color} />;
    case 'passport': return <PassportIcon size={size} color={color} />;
    case 'bank': return <BankIcon size={size} color={color} />;
    case 'globe': return <GlobeIcon size={size} color={color} />;
    case 'currency': return <CurrencyRupeeIcon size={size} color={color} />;
    case 'bell': return <BellIcon size={size} color={color} />;
    case 'settings': return <SettingsIcon size={size} color={color} />;
    case 'email': return <EmailIcon size={size} color={color} />;
    case 'phone': return <PhoneIcon size={size} color={color} />;
    case 'lock': return <LockIcon size={size} color={color} />;
    case 'faceid': return <FaceIdIcon size={size} color={color} />;
    case 'shield': return <ShieldIcon size={size} color={color} />;
    case 'checklist': return <ChecklistIcon size={size} color={color} />;
    case 'star': return <StarIcon size={size} color={color} />;
  }
}

const SETTINGS_GROUPS: {
  title: string;
  iconKey: SettingsIconKey;
  items: { iconKey: SettingsIconKey; label: string; value: string }[];
}[] = [
  {
    title: 'Documents',
    iconKey: 'document',
    items: [
      { iconKey: 'passport', label: 'Passports', value: '2 saved' },
      { iconKey: 'checklist', label: 'Travel Documents', value: '5 files' },
      { iconKey: 'bank', label: 'Financial Documents', value: '3 files' },
    ],
  },
  {
    title: 'Preferences',
    iconKey: 'settings',
    items: [
      { iconKey: 'globe', label: 'Home Country', value: 'India 🇮🇳' },
      { iconKey: 'currency', label: 'Currency', value: 'INR' },
      { iconKey: 'bell', label: 'Notifications', value: 'All on' },
      { iconKey: 'globe', label: 'Language', value: 'English' },
    ],
  },
  {
    title: 'Account',
    iconKey: 'star',
    items: [
      { iconKey: 'email', label: 'Email', value: 'priya@example.com' },
      { iconKey: 'phone', label: 'Phone', value: '+91 98765 43210' },
      { iconKey: 'lock', label: 'Password', value: 'Change' },
      { iconKey: 'faceid', label: 'Face ID', value: 'Enabled' },
    ],
  },
  {
    title: 'Legal',
    iconKey: 'shield',
    items: [
      { iconKey: 'document', label: 'Terms of Service', value: '' },
      { iconKey: 'shield', label: 'Privacy Policy', value: '' },
      { iconKey: 'settings', label: 'Cookie Settings', value: '' },
    ],
  },
];

export const ProfileScreen: React.FC<Props> = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        {/* Hero */}
        <LinearGradient
          colors={[Colors.teal, Colors.tealDark, '#064E3B']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.hero}
        >
          {/* Settings button */}
          <TouchableOpacity style={styles.settingsBtn} activeOpacity={0.8}>
            <SettingsIcon size={18} color={Colors.white} />
          </TouchableOpacity>

          {/* Avatar */}
          <View style={styles.avatarOuter}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>P</Text>
            </View>
            <View style={styles.onlineDot} />
          </View>
          <Text style={styles.heroName}>Priya Sharma</Text>
          <Text style={styles.heroEmail}>priya.sharma@gmail.com</Text>

          {/* Membership */}
          <View style={styles.membershipBadge}>
            <StarIcon size={14} color={Colors.amberLight} />
            <Text style={styles.membershipText}>Pro Member · Joined Jan 2024</Text>
          </View>

          {/* Stats row */}
          <View style={styles.statsRow}>
            {[
              { label: 'Applications', value: '8' },
              { label: 'Approved', value: '7' },
              { label: 'Countries', value: '5' },
            ].map((s, i) => (
              <React.Fragment key={i}>
                <View style={styles.heroStat}>
                  <Text style={styles.heroStatValue}>{s.value}</Text>
                  <Text style={styles.heroStatLabel}>{s.label}</Text>
                </View>
                {i < 2 && <View style={styles.statDivider} />}
              </React.Fragment>
            ))}
          </View>

          {/* Decor */}
          <View style={styles.heroDecor1} />
          <View style={styles.heroDecor2} />
        </LinearGradient>

        {/* Verification strip */}
        <View style={styles.verifyStrip}>
          {[
            { met: true, label: 'Email verified' },
            { met: true, label: 'Phone verified' },
            { met: false, label: 'KYC pending' },
          ].map((v, i) => (
            <View key={i} style={styles.verifyItem}>
              <View style={[styles.verifyDot, { backgroundColor: v.met ? Colors.emerald : Colors.amber }]} />
              <Text style={styles.verifyLabel}>{v.label}</Text>
            </View>
          ))}
        </View>

        {/* Settings groups */}
        {SETTINGS_GROUPS.map((group, gi) => (
          <View key={gi} style={styles.settingsGroup}>
            <View style={styles.groupTitleRow}>
              <SettingsItemIcon iconKey={group.iconKey} />
              <Text style={styles.groupTitle}>{group.title}</Text>
            </View>
            <View style={styles.groupCard}>
              {group.items.map((item, ii) => (
                <TouchableOpacity
                  key={ii}
                  style={[
                    styles.settingsRow,
                    ii < group.items.length - 1 && styles.settingsRowBorder,
                  ]}
                  activeOpacity={0.7}
                >
                  <View style={styles.settingsRowIconWrap}>
                    <SettingsItemIcon iconKey={item.iconKey} />
                  </View>
                  <Text style={styles.settingsLabel}>{item.label}</Text>
                  <View style={styles.settingsRight}>
                    {item.value ? (
                      <Text style={styles.settingsValue}>{item.value}</Text>
                    ) : null}
                    <ChevronRight size={16} color={Colors.muted} />
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        ))}

        {/* Sign out */}
        <TouchableOpacity style={styles.signOutBtn} activeOpacity={0.8}>
          <Text style={styles.signOutLabel}>Sign Out</Text>
        </TouchableOpacity>

        <Text style={styles.version}>Visatale v1.0.0 · Made with ❤️ for travellers</Text>
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
    paddingBottom: 40,
  },
  hero: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 24,
    alignItems: 'center',
    overflow: 'hidden',
    position: 'relative',
  },
  settingsBtn: {
    position: 'absolute',
    top: 16,
    right: 20,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.15)',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2,
  },
  avatarOuter: {
    position: 'relative',
    marginBottom: 12,
    marginTop: 8,
  },
  avatar: {
    width: 88,
    height: 88,
    borderRadius: 44,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: 'rgba(255,255,255,0.4)',
  },
  avatarText: {
    fontSize: FontSizes['4xl'],
    fontFamily: 'SpaceGrotesk_700Bold',
    color: Colors.white,
  },
  onlineDot: {
    position: 'absolute',
    bottom: 4,
    right: 4,
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: '#4ADE80',
    borderWidth: 2.5,
    borderColor: Colors.teal,
  },
  heroName: {
    fontSize: FontSizes['2xl'],
    fontFamily: 'SpaceGrotesk_700Bold',
    color: Colors.white,
    marginBottom: 4,
  },
  heroEmail: {
    fontSize: FontSizes.sm,
    fontFamily: 'Inter_400Regular',
    color: 'rgba(255,255,255,0.7)',
    marginBottom: 10,
  },
  membershipBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: 100,
    paddingHorizontal: 14,
    paddingVertical: 6,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.25)',
  },
  membershipText: {
    fontSize: FontSizes.xs,
    fontFamily: 'Inter_600SemiBold',
    color: Colors.white,
  },
  statsRow: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255,255,255,0.12)',
    borderRadius: 16,
    paddingVertical: 14,
    paddingHorizontal: 20,
    alignItems: 'center',
    width: '100%',
  },
  heroStat: {
    flex: 1,
    alignItems: 'center',
    gap: 3,
  },
  heroStatValue: {
    fontSize: FontSizes['2xl'],
    fontFamily: 'SpaceGrotesk_700Bold',
    color: Colors.white,
  },
  heroStatLabel: {
    fontSize: FontSizes.xs,
    fontFamily: 'Inter_400Regular',
    color: 'rgba(255,255,255,0.65)',
  },
  statDivider: {
    width: 1,
    height: 32,
    backgroundColor: 'rgba(255,255,255,0.2)',
  },
  heroDecor1: {
    position: 'absolute',
    width: 180,
    height: 180,
    borderRadius: 90,
    backgroundColor: 'rgba(255,255,255,0.05)',
    top: -60,
    right: -60,
  },
  heroDecor2: {
    position: 'absolute',
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: 'rgba(255,255,255,0.04)',
    bottom: -30,
    left: 20,
  },
  verifyStrip: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 12,
    gap: 0,
    backgroundColor: Colors.white,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  verifyItem: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  verifyDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  verifyLabel: {
    fontSize: FontSizes.xs,
    fontFamily: 'Inter_400Regular',
    color: Colors.slate,
  },
  settingsGroup: {
    paddingHorizontal: 20,
    marginTop: 20,
    gap: 8,
  },
  groupTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  groupTitle: {
    fontSize: FontSizes.xs,
    fontFamily: 'Inter_700Bold',
    color: Colors.muted,
    letterSpacing: 0.8,
    textTransform: 'uppercase',
  },
  groupCard: {
    backgroundColor: Colors.white,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: Colors.border,
    overflow: 'hidden',
  },
  settingsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
    gap: 12,
  },
  settingsRowBorder: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  settingsRowIconWrap: {
    width: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  settingsLabel: {
    flex: 1,
    fontSize: FontSizes.sm,
    fontFamily: 'Inter_400Regular',
    color: Colors.ink,
  },
  settingsRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  settingsValue: {
    fontSize: FontSizes.xs,
    fontFamily: 'Inter_400Regular',
    color: Colors.muted,
  },
  signOutBtn: {
    marginHorizontal: 20,
    marginTop: 24,
    height: 52,
    borderRadius: 14,
    backgroundColor: Colors.white,
    borderWidth: 1.5,
    borderColor: Colors.error,
    alignItems: 'center',
    justifyContent: 'center',
  },
  signOutLabel: {
    fontSize: FontSizes.base,
    fontFamily: 'Inter_600SemiBold',
    color: Colors.error,
  },
  version: {
    fontSize: FontSizes.xs,
    fontFamily: 'Inter_400Regular',
    color: Colors.muted,
    textAlign: 'center',
    marginTop: 20,
  },
});
