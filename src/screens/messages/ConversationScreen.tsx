import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '../../constants/colors';
import { FontSizes } from '../../constants/typography';
import { ChevronLeft, PhoneIcon, PaperclipIcon } from '../../components/ui/Icons';

interface Message {
  id: string;
  text: string;
  type: 'incoming' | 'outgoing' | 'system';
  time: string;
  attachment?: { name: string; type: string };
}

const INITIAL_MESSAGES: Message[] = [
  {
    id: '1',
    text: "Hi Priya! I've reviewed your application for UAE Tourist Visa. Everything looks great so far.",
    type: 'incoming',
    time: '10:02 AM',
  },
  {
    id: '2',
    text: 'Thank you! Is there anything else I need to submit?',
    type: 'outgoing',
    time: '10:04 AM',
  },
  {
    id: '3',
    text: 'Yes — your bank statement needs to show the last 3 months with a bank stamp. The current one only covers 2 months.',
    type: 'incoming',
    time: '10:05 AM',
  },
  {
    id: '4',
    text: "Got it. I'll get a new one from the bank today.",
    type: 'outgoing',
    time: '10:07 AM',
  },
  {
    id: '5',
    text: 'Application submitted to embassy',
    type: 'system',
    time: '11:00 AM',
  },
  {
    id: '6',
    text: "Perfect! Once you upload it, I'll immediately push your application to the embassy. Expected decision in 3–5 business days.",
    type: 'incoming',
    time: '10:08 AM',
  },
  {
    id: '7',
    text: '',
    type: 'outgoing',
    time: '10:12 AM',
    attachment: { name: 'bank_statement_june.pdf', type: 'PDF' },
  },
  {
    id: '8',
    text: 'Received! Running AI scan now… ✅ Document verified. Submitting to embassy.',
    type: 'incoming',
    time: '10:14 AM',
  },
];

export const ConversationScreen: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [input, setInput] = useState('');
  const listRef = useRef<FlatList>(null);

  const sendMessage = () => {
    if (!input.trim()) return;
    const newMsg: Message = {
      id: String(Date.now()),
      text: input.trim(),
      type: 'outgoing',
      time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
    };
    setMessages((prev) => [...prev, newMsg]);
    setInput('');
    setTimeout(() => {
      listRef.current?.scrollToEnd({ animated: true });
    }, 100);
  };

  return (
    <SafeAreaView style={styles.safe} edges={['top', 'bottom']}>
      {/* Chat header */}
      <View style={styles.chatHeader}>
        <TouchableOpacity style={styles.backBtn} activeOpacity={0.7}>
          <ChevronLeft size={24} color={Colors.teal} />
        </TouchableOpacity>
        <View style={styles.headerAvatar}>
          <View style={styles.headerAvatarCircle}>
            <Text style={styles.headerAvatarText}>AP</Text>
          </View>
          <View style={styles.onlineDot} />
        </View>
        <View style={styles.headerInfo}>
          <Text style={styles.headerName}>Ananya Patel</Text>
          <Text style={styles.headerStatus}>Online · UAE Specialist</Text>
        </View>
        <TouchableOpacity style={styles.callBtn} activeOpacity={0.8}>
          <PhoneIcon size={18} color={Colors.slate} />
        </TouchableOpacity>
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.flex}
        keyboardVerticalOffset={0}
      >
        <FlatList
          ref={listRef}
          data={messages}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.messageList}
          showsVerticalScrollIndicator={false}
          onContentSizeChange={() => listRef.current?.scrollToEnd({ animated: false })}
          renderItem={({ item, index }) => {
            if (item.type === 'system') {
              return (
                <View style={styles.systemMsgRow}>
                  <Text style={styles.systemMsg}>{item.text}</Text>
                </View>
              );
            }

            const isOut = item.type === 'outgoing';

            return (
              <View
                style={[
                  styles.bubbleRow,
                  isOut ? styles.bubbleRowOut : styles.bubbleRowIn,
                ]}
              >
                {!isOut && (
                  <View style={styles.bubbleAvatar}>
                    <Text style={styles.bubbleAvatarText}>A</Text>
                  </View>
                )}
                <View style={styles.bubbleWrap}>
                  {item.attachment && (
                    <View
                      style={[
                        styles.attachmentChip,
                        isOut ? styles.attachmentChipOut : styles.attachmentChipIn,
                      ]}
                    >
                      <PaperclipIcon size={16} color={Colors.slate} />
                      <Text style={styles.attachmentName}>{item.attachment.name}</Text>
                      <View style={styles.attachmentTypeBadge}>
                        <Text style={styles.attachmentType}>{item.attachment.type}</Text>
                      </View>
                    </View>
                  )}
                  {item.text.length > 0 && (
                    <View
                      style={[
                        styles.bubble,
                        isOut ? styles.bubbleOut : styles.bubbleIn,
                      ]}
                    >
                      <Text style={[styles.bubbleText, isOut && styles.bubbleTextOut]}>
                        {item.text}
                      </Text>
                    </View>
                  )}
                  <Text
                    style={[styles.bubbleTime, isOut && styles.bubbleTimeOut]}
                  >
                    {item.time}
                  </Text>
                </View>
              </View>
            );
          }}
        />

        {/* Input bar */}
        <View style={styles.inputBar}>
          <TouchableOpacity style={styles.attachBtn} activeOpacity={0.8}>
            <PaperclipIcon size={18} color={Colors.slate} />
          </TouchableOpacity>
          <TextInput
            style={styles.inputField}
            placeholder="Type a message…"
            placeholderTextColor={Colors.muted}
            value={input}
            onChangeText={setInput}
            multiline
            returnKeyType="send"
            onSubmitEditing={sendMessage}
          />
          <TouchableOpacity
            style={[styles.sendBtn, input.trim().length > 0 && styles.sendBtnActive]}
            onPress={sendMessage}
            activeOpacity={0.8}
          >
            <Text style={styles.sendBtnIcon}>↑</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: Colors.canvas,
  },
  flex: {
    flex: 1,
  },
  chatHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: Colors.white,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
    gap: 10,
  },
  backBtn: {
    padding: 4,
  },
  headerAvatar: {
    position: 'relative',
    width: 42,
    height: 42,
  },
  headerAvatarCircle: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: Colors.teal,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerAvatarText: {
    fontSize: FontSizes.sm,
    fontFamily: 'SpaceGrotesk_700Bold',
    color: Colors.white,
  },
  onlineDot: {
    position: 'absolute',
    bottom: 1,
    right: 1,
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#4ADE80',
    borderWidth: 2,
    borderColor: Colors.white,
  },
  headerInfo: {
    flex: 1,
  },
  headerName: {
    fontSize: FontSizes.base,
    fontFamily: 'Inter_700Bold',
    color: Colors.ink,
  },
  headerStatus: {
    fontSize: FontSizes.xs,
    fontFamily: 'Inter_400Regular',
    color: Colors.emerald,
  },
  callBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: Colors.border,
  },
  messageList: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 12,
    paddingBottom: 20,
  },
  systemMsgRow: {
    alignItems: 'center',
    marginVertical: 4,
  },
  systemMsg: {
    fontSize: FontSizes.xs,
    fontFamily: 'Inter_500Medium',
    color: Colors.muted,
    backgroundColor: Colors.border,
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 100,
    overflow: 'hidden',
  },
  bubbleRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 8,
    maxWidth: '88%',
  },
  bubbleRowIn: {
    alignSelf: 'flex-start',
  },
  bubbleRowOut: {
    alignSelf: 'flex-end',
    flexDirection: 'row-reverse',
  },
  bubbleAvatar: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: Colors.teal,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bubbleAvatarText: {
    fontSize: 11,
    fontFamily: 'SpaceGrotesk_700Bold',
    color: Colors.white,
  },
  bubbleWrap: {
    flex: 1,
    gap: 3,
  },
  attachmentChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderWidth: 1,
  },
  attachmentChipIn: {
    backgroundColor: Colors.white,
    borderColor: Colors.border,
  },
  attachmentChipOut: {
    backgroundColor: Colors.teal,
    borderColor: Colors.tealDark,
  },
  attachmentName: {
    flex: 1,
    fontSize: FontSizes.xs,
    fontFamily: 'Inter_500Medium',
    color: Colors.slate,
  },
  attachmentTypeBadge: {
    backgroundColor: Colors.border,
    borderRadius: 4,
    paddingHorizontal: 5,
    paddingVertical: 2,
  },
  attachmentType: {
    fontSize: 9,
    fontFamily: 'JetBrainsMono_400Regular',
    color: Colors.slate,
  },
  bubble: {
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 18,
    maxWidth: '100%',
  },
  bubbleIn: {
    backgroundColor: Colors.white,
    borderBottomLeftRadius: 4,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  bubbleOut: {
    backgroundColor: Colors.teal,
    borderBottomRightRadius: 4,
  },
  bubbleText: {
    fontSize: FontSizes.sm,
    fontFamily: 'Inter_400Regular',
    color: Colors.ink,
    lineHeight: 20,
  },
  bubbleTextOut: {
    color: Colors.white,
  },
  bubbleTime: {
    fontSize: 10,
    fontFamily: 'Inter_400Regular',
    color: Colors.muted,
    alignSelf: 'flex-start',
    marginHorizontal: 4,
  },
  bubbleTimeOut: {
    alignSelf: 'flex-end',
  },
  inputBar: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: Colors.white,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    gap: 10,
  },
  attachBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: Colors.border,
  },
  inputField: {
    flex: 1,
    maxHeight: 100,
    backgroundColor: Colors.canvas,
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 10,
    fontSize: FontSizes.sm,
    fontFamily: 'Inter_400Regular',
    color: Colors.ink,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  sendBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sendBtnActive: {
    backgroundColor: Colors.teal,
  },
  sendBtnIcon: {
    fontSize: 18,
    color: Colors.white,
    fontFamily: 'Inter_700Bold',
  },
});
