import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '../../constants/colors';
import { FontSizes } from '../../constants/typography';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { MainTabsParams } from '../../navigation/MainTabs';

type Props = BottomTabScreenProps<MainTabsParams, 'Messages'>;

const CONVERSATIONS = [
  {
    id: '1',
    name: 'Ananya Patel',
    role: 'UAE Specialist',
    avatar: '👩',
    lastMsg: 'Your documents look great! Just need the bank statement re-uploaded.',
    time: '2m ago',
    unread: 2,
    online: true,
  },
  {
    id: '2',
    name: 'Rajesh Kumar',
    role: 'Schengen Specialist',
    avatar: '👨',
    lastMsg: 'The consulate confirmed receipt of your application.',
    time: '1h ago',
    unread: 0,
    online: true,
  },
  {
    id: '3',
    name: 'Sarah Chen',
    role: 'UK Visa Expert',
    avatar: '👩',
    lastMsg: 'I'll follow up with the VFS center tomorrow morning.',
    time: '3h ago',
    unread: 1,
    online: false,
  },
  {
    id: '4',
    name: 'Visatale Support',
    role: 'General Support',
    avatar: '🤖',
    lastMsg: 'Your payment has been confirmed. Reference: PAY-884321',
    time: 'Yesterday',
    unread: 0,
    online: true,
  },
  {
    id: '5',
    name: 'Mohammed Al Rashid',
    role: 'UAE/GCC Specialist',
    avatar: '👨',
    lastMsg: 'Visa approved! Sending to your email now.',
    time: 'May 20',
    unread: 0,
    online: false,
  },
];

export const MessagesListScreen: React.FC<Props> = ({ navigation }) => {
  const [search, setSearch] = useState('');

  const filtered = CONVERSATIONS.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.lastMsg.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <View style={styles.header}>
        <Text style={styles.heading}>Messages</Text>
        <View style={styles.searchBar}>
          <Text style={styles.searchIcon}>🔍</Text>
          <TextInput
            style={styles.searchInput}
            placeholder="Search conversations…"
            placeholderTextColor={Colors.muted}
            value={search}
            onChangeText={setSearch}
          />
        </View>
      </View>

      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.row} activeOpacity={0.8}>
            {/* Avatar */}
            <View style={styles.avatarWrap}>
              <View style={styles.avatar}>
                <Text style={styles.avatarEmoji}>{item.avatar}</Text>
              </View>
              {item.online && <View style={styles.onlineBadge} />}
            </View>

            {/* Content */}
            <View style={styles.rowContent}>
              <View style={styles.rowTop}>
                <Text style={[styles.name, item.unread > 0 && styles.nameBold]}>
                  {item.name}
                </Text>
                <Text style={[styles.time, item.unread > 0 && styles.timeBold]}>
                  {item.time}
                </Text>
              </View>
              <Text style={styles.role}>{item.role}</Text>
              <Text
                style={[styles.lastMsg, item.unread > 0 && styles.lastMsgBold]}
                numberOfLines={1}
              >
                {item.lastMsg}
              </Text>
            </View>

            {/* Unread badge */}
            {item.unread > 0 && (
              <View style={styles.unreadBadge}>
                <Text style={styles.unreadCount}>{item.unread}</Text>
              </View>
            )}
          </TouchableOpacity>
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
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 12,
    gap: 12,
  },
  heading: {
    fontSize: FontSizes['2xl'],
    fontFamily: 'SpaceGrotesk_700Bold',
    color: Colors.ink,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderRadius: 12,
    paddingHorizontal: 14,
    borderWidth: 1,
    borderColor: Colors.border,
    height: 44,
    gap: 8,
  },
  searchIcon: {
    fontSize: 16,
  },
  searchInput: {
    flex: 1,
    fontSize: FontSizes.sm,
    fontFamily: 'Inter_400Regular',
    color: Colors.ink,
  },
  list: {
    paddingBottom: 24,
  },
  separator: {
    height: 1,
    backgroundColor: Colors.border,
    marginLeft: 82,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 14,
    gap: 12,
    backgroundColor: Colors.white,
  },
  avatarWrap: {
    position: 'relative',
  },
  avatar: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: Colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: Colors.border,
  },
  avatarEmoji: {
    fontSize: 26,
  },
  onlineBadge: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#4ADE80',
    borderWidth: 2,
    borderColor: Colors.white,
  },
  rowContent: {
    flex: 1,
    gap: 2,
  },
  rowTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  name: {
    fontSize: FontSizes.base,
    fontFamily: 'Inter_500Medium',
    color: Colors.ink,
  },
  nameBold: {
    fontFamily: 'Inter_700Bold',
  },
  time: {
    fontSize: FontSizes.xs,
    fontFamily: 'Inter_400Regular',
    color: Colors.muted,
  },
  timeBold: {
    color: Colors.teal,
    fontFamily: 'Inter_600SemiBold',
  },
  role: {
    fontSize: FontSizes.xs,
    fontFamily: 'Inter_400Regular',
    color: Colors.muted,
  },
  lastMsg: {
    fontSize: FontSizes.sm,
    fontFamily: 'Inter_400Regular',
    color: Colors.muted,
  },
  lastMsgBold: {
    fontFamily: 'Inter_500Medium',
    color: Colors.slate,
  },
  unreadBadge: {
    backgroundColor: Colors.teal,
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 5,
  },
  unreadCount: {
    fontSize: FontSizes.xs,
    fontFamily: 'Inter_700Bold',
    color: Colors.white,
  },
});
