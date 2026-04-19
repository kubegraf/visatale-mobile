import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SectionList,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '../../constants/colors';
import { FontSizes } from '../../constants/typography';
import { Pill } from '../../components/ui/Pill';

interface NotifItem {
  id: string;
  icon: string;
  title: string;
  body: string;
  time: string;
  unread: boolean;
  cta?: string;
  ctaTone?: 'teal' | 'amber' | 'error';
  tag?: string;
  tagTone?: 'teal' | 'emerald' | 'amber' | 'error' | 'gray';
}

const TODAY: NotifItem[] = [
  {
    id: '1',
    icon: '✅',
    title: 'Document Verified',
    body: 'Your passport scan for UAE Tourist Visa has been verified successfully.',
    time: '2m ago',
    unread: true,
    tag: 'UAE Visa',
    tagTone: 'teal',
  },
  {
    id: '2',
    icon: '⚠️',
    title: 'Action Required',
    body: 'Re-upload your bank statement with the last 3 months and a bank stamp.',
    time: '1h ago',
    unread: true,
    cta: 'Upload Now',
    ctaTone: 'amber',
    tag: 'UAE Visa',
    tagTone: 'amber',
  },
  {
    id: '3',
    icon: '💬',
    title: 'New message from Ananya',
    body: 'Your documents look great! Just need the bank statement re-uploaded.',
    time: '2h ago',
    unread: true,
    cta: 'Reply',
    ctaTone: 'teal',
  },
];

const THIS_WEEK: NotifItem[] = [
  {
    id: '4',
    icon: '🏛️',
    title: 'Application Received by Embassy',
    body: 'UAE Embassy has confirmed receipt of your application #VT-2024-08421.',
    time: 'Yesterday',
    unread: false,
    tag: 'UAE Visa',
    tagTone: 'teal',
  },
  {
    id: '5',
    icon: '💳',
    title: 'Payment Successful',
    body: '₹2,499 charged for Pro Plan — UAE Tourist Visa application.',
    time: '2 days ago',
    unread: false,
  },
  {
    id: '6',
    icon: '🎉',
    title: 'France Visa Approved!',
    body: 'Congratulations! Your Schengen visa is approved. Download your visa from the app.',
    time: '3 days ago',
    unread: false,
    cta: 'Download Visa',
    ctaTone: 'teal',
    tag: 'France Visa',
    tagTone: 'emerald',
  },
  {
    id: '7',
    icon: '📋',
    title: 'Reminder: Upload Hotel Booking',
    body: 'Your UAE application is missing a hotel booking confirmation.',
    time: '4 days ago',
    unread: false,
    cta: 'Upload',
    ctaTone: 'amber',
  },
];

const SECTIONS = [
  { title: 'Today', data: TODAY },
  { title: 'This Week', data: THIS_WEEK },
];

export const NotificationsScreen: React.FC = () => {
  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <View style={styles.header}>
        <Text style={styles.heading}>Notifications</Text>
        <TouchableOpacity activeOpacity={0.7}>
          <Text style={styles.markAll}>Mark all read</Text>
        </TouchableOpacity>
      </View>

      <SectionList
        sections={SECTIONS}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.list}
        renderSectionHeader={({ section }) => (
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>{section.title}</Text>
          </View>
        )}
        renderItem={({ item }) => (
          <View
            style={[
              styles.notifCard,
              item.unread && styles.notifCardUnread,
            ]}
          >
            {/* Unread indicator */}
            {item.unread && <View style={styles.unreadBar} />}

            <View style={styles.cardInner}>
              {/* Icon */}
              <View
                style={[
                  styles.iconWrap,
                  {
                    backgroundColor: item.unread ? Colors.surface : '#F8FAFC',
                  },
                ]}
              >
                <Text style={styles.icon}>{item.icon}</Text>
              </View>

              {/* Content */}
              <View style={styles.content}>
                <View style={styles.titleRow}>
                  <Text
                    style={[styles.title, item.unread && styles.titleUnread]}
                    numberOfLines={1}
                  >
                    {item.title}
                  </Text>
                  <Text style={styles.time}>{item.time}</Text>
                </View>

                {item.tag && (
                  <Pill label={item.tag} tone={item.tagTone || 'gray'} size="sm" />
                )}

                <Text style={styles.body} numberOfLines={2}>
                  {item.body}
                </Text>

                {item.cta && (
                  <TouchableOpacity
                    style={[
                      styles.ctaBtn,
                      {
                        backgroundColor:
                          item.ctaTone === 'amber'
                            ? '#FEF3C7'
                            : item.ctaTone === 'error'
                            ? Colors.errorLight
                            : Colors.surface,
                      },
                    ]}
                    activeOpacity={0.8}
                  >
                    <Text
                      style={[
                        styles.ctaLabel,
                        {
                          color:
                            item.ctaTone === 'amber'
                              ? '#92400E'
                              : item.ctaTone === 'error'
                              ? Colors.error
                              : Colors.teal,
                        },
                      ]}
                    >
                      {item.cta} →
                    </Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>
          </View>
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: Colors.canvas,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 12,
  },
  heading: {
    fontSize: FontSizes['2xl'],
    fontFamily: 'SpaceGrotesk_700Bold',
    color: Colors.ink,
  },
  markAll: {
    fontSize: FontSizes.sm,
    fontFamily: 'Inter_500Medium',
    color: Colors.teal,
  },
  list: {
    paddingBottom: 24,
  },
  sectionHeader: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    backgroundColor: Colors.canvas,
  },
  sectionTitle: {
    fontSize: FontSizes.xs,
    fontFamily: 'Inter_700Bold',
    color: Colors.muted,
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  notifCard: {
    backgroundColor: Colors.white,
    marginHorizontal: 16,
    marginBottom: 8,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: Colors.border,
    overflow: 'hidden',
    flexDirection: 'row',
  },
  notifCardUnread: {
    borderColor: Colors.teal,
    backgroundColor: '#FAFFFE',
  },
  unreadBar: {
    width: 4,
    backgroundColor: Colors.teal,
    borderRadius: 4,
  },
  cardInner: {
    flex: 1,
    flexDirection: 'row',
    padding: 14,
    gap: 12,
  },
  iconWrap: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: Colors.border,
    flexShrink: 0,
  },
  icon: {
    fontSize: 20,
  },
  content: {
    flex: 1,
    gap: 5,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: 8,
  },
  title: {
    flex: 1,
    fontSize: FontSizes.sm,
    fontFamily: 'Inter_500Medium',
    color: Colors.ink,
  },
  titleUnread: {
    fontFamily: 'Inter_700Bold',
  },
  time: {
    fontSize: FontSizes.xs,
    fontFamily: 'Inter_400Regular',
    color: Colors.muted,
    flexShrink: 0,
  },
  body: {
    fontSize: FontSizes.xs,
    fontFamily: 'Inter_400Regular',
    color: Colors.slate,
    lineHeight: 17,
  },
  ctaBtn: {
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    marginTop: 2,
  },
  ctaLabel: {
    fontSize: FontSizes.xs,
    fontFamily: 'Inter_600SemiBold',
  },
});
