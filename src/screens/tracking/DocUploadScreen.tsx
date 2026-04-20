import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Animated,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '../../constants/colors';
import { FontSizes } from '../../constants/typography';
import { Pill } from '../../components/ui/Pill';
import { Btn } from '../../components/ui/Btn';
import {
  UploadIcon,
  CheckIcon,
  WarningIcon,
  ClockIcon,
  InfoIcon,
} from '../../components/ui/Icons';

const DOC_TYPES = [
  { id: 'passport', name: 'Passport (bio page)', required: true, hint: 'Clear scan, all 4 corners visible' },
  { id: 'photo', name: 'Passport Photo', required: true, hint: 'White background, 35×45 mm' },
  { id: 'bank', name: 'Bank Statement', required: true, hint: 'Last 3 months, stamped' },
  { id: 'itinerary', name: 'Flight Itinerary', required: true, hint: 'Booking confirmation' },
  { id: 'hotel', name: 'Hotel Booking', required: false, hint: 'Confirmation email' },
  { id: 'noc', name: 'NOC Letter', required: false, hint: 'If employed' },
];

interface UploadedFile {
  id: string;
  name: string;
  size: string;
  progress: number;
  status: 'uploading' | 'scanning' | 'passed' | 'failed';
  issues?: string[];
}

const MOCK_FILES: UploadedFile[] = [
  {
    id: 'passport',
    name: 'passport_scan.pdf',
    size: '2.3 MB',
    progress: 1,
    status: 'passed',
  },
  {
    id: 'photo',
    name: 'photo.jpg',
    size: '450 KB',
    progress: 0.8,
    status: 'scanning',
  },
  {
    id: 'bank',
    name: 'bank_statement.pdf',
    size: '1.1 MB',
    progress: 1,
    status: 'failed',
    issues: ['Stamp not visible', 'Date range insufficient (need 3 months)'],
  },
];

export const DocUploadScreen: React.FC = () => {
  const [activeDoc, setActiveDoc] = useState<string | null>(null);

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <View style={styles.header}>
        <Text style={styles.heading}>Upload Documents</Text>
        <Text style={styles.subheading}>UAE Tourist Visa · 6 documents required</Text>
        {/* Progress */}
        <View style={styles.progressWrap}>
          <View style={styles.progressTrack}>
            <View style={[styles.progressFill, { width: '33%' }]} />
          </View>
          <Text style={styles.progressLabel}>2 of 6 verified</Text>
        </View>
      </View>

      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        {/* Dashed upload zone */}
        <TouchableOpacity
          style={styles.uploadZone}
          activeOpacity={0.8}
          onPress={() => {}}
        >
          <View style={styles.uploadIconWrap}>
            <UploadIcon size={32} color={Colors.teal} />
          </View>
          <Text style={styles.uploadTitle}>Tap to upload or take photo</Text>
          <Text style={styles.uploadSub}>PDF, JPG, PNG · Max 10 MB per file</Text>
          <View style={styles.uploadBadges}>
            <Text style={styles.uploadBadge}>PDF</Text>
            <Text style={styles.uploadBadge}>JPG</Text>
            <Text style={styles.uploadBadge}>PNG</Text>
          </View>
        </TouchableOpacity>

        {/* AI scan note */}
        <View style={styles.aiNote}>
          <InfoIcon size={18} color={Colors.teal} />
          <Text style={styles.aiNoteText}>
            Documents are scanned by AI for clarity, validity dates, and completeness.
          </Text>
        </View>

        {/* Uploaded files */}
        {MOCK_FILES.length > 0 && (
          <>
            <Text style={styles.sectionTitle}>Uploaded Files</Text>
            {MOCK_FILES.map((file) => (
              <View key={file.id} style={styles.fileCard}>
                <View style={styles.fileRow}>
                  <View
                    style={[
                      styles.fileIconWrap,
                      {
                        backgroundColor:
                          file.status === 'passed'
                            ? '#D1FAE5'
                            : file.status === 'failed'
                            ? Colors.errorLight
                            : '#FEF3C7',
                      },
                    ]}
                  >
                    {file.status === 'passed' ? (
                      <CheckIcon size={18} color={Colors.emerald} />
                    ) : file.status === 'failed' ? (
                      <WarningIcon size={18} color={Colors.error} />
                    ) : (
                      <ClockIcon size={18} color={Colors.amber} />
                    )}
                  </View>
                  <View style={styles.fileInfo}>
                    <Text style={styles.fileName}>{file.name}</Text>
                    <Text style={styles.fileSize}>{file.size}</Text>
                  </View>
                  <Pill
                    label={
                      file.status === 'passed'
                        ? 'Verified'
                        : file.status === 'failed'
                        ? 'Failed'
                        : 'Scanning'
                    }
                    tone={
                      file.status === 'passed'
                        ? 'emerald'
                        : file.status === 'failed'
                        ? 'error'
                        : 'amber'
                    }
                    size="sm"
                    dot={file.status === 'scanning'}
                  />
                </View>

                {/* Progress bar */}
                {file.status === 'scanning' && (
                  <View style={styles.fileProgress}>
                    <View style={styles.fileProgressTrack}>
                      <View
                        style={[
                          styles.fileProgressFill,
                          { width: `${file.progress * 100}%` },
                        ]}
                      />
                    </View>
                    <Text style={styles.fileProgressLabel}>
                      {Math.round(file.progress * 100)}%
                    </Text>
                  </View>
                )}

                {/* AI scan result */}
                {file.status === 'passed' && (
                  <View style={styles.scanResult}>
                    <View style={styles.scanResultTitleRow}>
                      <CheckIcon size={16} color={Colors.emerald} />
                      <Text style={styles.scanResultTitle}>AI Scan Passed</Text>
                    </View>
                    {['Document readable', 'Expiry date valid', 'All data fields detected'].map(
                      (c, i) => (
                        <View key={i} style={styles.scanCheck}>
                          <CheckIcon size={14} color={Colors.emerald} />
                          <Text style={styles.scanCheckText}>{c}</Text>
                        </View>
                      )
                    )}
                  </View>
                )}

                {/* Issues */}
                {file.status === 'failed' && file.issues && (
                  <View style={styles.scanFailed}>
                    <View style={styles.scanResultTitleRow}>
                      <WarningIcon size={16} color={Colors.error} />
                      <Text style={styles.scanFailedTitle}>Issues Found</Text>
                    </View>
                    {file.issues.map((issue, i) => (
                      <View key={i} style={styles.issueRow}>
                        <View style={styles.issueDot} />
                        <Text style={styles.issueText}>{issue}</Text>
                      </View>
                    ))}
                    <TouchableOpacity style={styles.reuploadBtn} activeOpacity={0.8}>
                      <Text style={styles.reuploadLabel}>Re-upload</Text>
                    </TouchableOpacity>
                  </View>
                )}
              </View>
            ))}
          </>
        )}

        {/* Required documents list */}
        <Text style={styles.sectionTitle}>Required Documents</Text>
        {DOC_TYPES.map((doc) => {
          const uploaded = MOCK_FILES.find((f) => f.id === doc.id);
          return (
            <View key={doc.id} style={styles.reqRow}>
              <View
                style={[
                  styles.reqDot,
                  uploaded?.status === 'passed'
                    ? styles.reqDotDone
                    : styles.reqDotPending,
                ]}
              />
              <View style={styles.reqInfo}>
                <Text style={styles.reqName}>{doc.name}</Text>
                <Text style={styles.reqHint}>{doc.hint}</Text>
              </View>
              {doc.required ? (
                <Pill label="Required" tone="gray" size="sm" />
              ) : (
                <Pill label="Optional" tone="gray" size="sm" />
              )}
            </View>
          );
        })}
      </ScrollView>

      <View style={styles.footer}>
        <Btn label="Save & Continue" onPress={() => {}} />
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
    paddingTop: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
    gap: 8,
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
  progressWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginTop: 4,
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
    backgroundColor: Colors.teal,
    borderRadius: 3,
  },
  progressLabel: {
    fontSize: FontSizes.xs,
    fontFamily: 'Inter_600SemiBold',
    color: Colors.teal,
    width: 80,
  },
  scroll: {
    padding: 20,
    paddingBottom: 20,
    gap: 16,
  },
  uploadZone: {
    borderWidth: 2,
    borderColor: Colors.teal,
    borderStyle: 'dashed',
    borderRadius: 16,
    padding: 28,
    alignItems: 'center',
    backgroundColor: Colors.surface,
    gap: 8,
  },
  uploadIconWrap: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: Colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 4,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  uploadTitle: {
    fontSize: FontSizes.md,
    fontFamily: 'Inter_600SemiBold',
    color: Colors.teal,
    textAlign: 'center',
  },
  uploadSub: {
    fontSize: FontSizes.xs,
    fontFamily: 'Inter_400Regular',
    color: Colors.muted,
    textAlign: 'center',
  },
  uploadBadges: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 4,
  },
  uploadBadge: {
    fontSize: FontSizes.xs,
    fontFamily: 'Inter_500Medium',
    color: Colors.slate,
    backgroundColor: Colors.white,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  aiNote: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
    backgroundColor: Colors.surface,
    borderRadius: 10,
    padding: 12,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  aiNoteText: {
    flex: 1,
    fontSize: FontSizes.xs,
    fontFamily: 'Inter_400Regular',
    color: Colors.slate,
    lineHeight: 18,
  },
  sectionTitle: {
    fontSize: FontSizes.md,
    fontFamily: 'SpaceGrotesk_600SemiBold',
    color: Colors.ink,
    marginTop: 4,
  },
  fileCard: {
    backgroundColor: Colors.white,
    borderRadius: 14,
    padding: 14,
    borderWidth: 1,
    borderColor: Colors.border,
    gap: 10,
  },
  fileRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  fileIconWrap: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  fileInfo: {
    flex: 1,
  },
  fileName: {
    fontSize: FontSizes.sm,
    fontFamily: 'Inter_600SemiBold',
    color: Colors.ink,
  },
  fileSize: {
    fontSize: FontSizes.xs,
    fontFamily: 'Inter_400Regular',
    color: Colors.muted,
    marginTop: 2,
  },
  fileProgress: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  fileProgressTrack: {
    flex: 1,
    height: 6,
    backgroundColor: Colors.border,
    borderRadius: 3,
    overflow: 'hidden',
  },
  fileProgressFill: {
    height: '100%',
    backgroundColor: Colors.amber,
    borderRadius: 3,
  },
  fileProgressLabel: {
    fontSize: FontSizes.xs,
    fontFamily: 'Inter_600SemiBold',
    color: Colors.amber,
    width: 32,
  },
  scanResult: {
    backgroundColor: '#F0FDF4',
    borderRadius: 10,
    padding: 10,
    gap: 5,
  },
  scanResultTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 3,
  },
  scanResultTitle: {
    fontSize: FontSizes.sm,
    fontFamily: 'Inter_600SemiBold',
    color: Colors.emerald,
  },
  scanCheck: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  scanCheckText: {
    fontSize: FontSizes.xs,
    fontFamily: 'Inter_400Regular',
    color: Colors.emerald,
  },
  scanFailed: {
    backgroundColor: Colors.errorLight,
    borderRadius: 10,
    padding: 10,
    gap: 4,
  },
  scanFailedTitle: {
    fontSize: FontSizes.sm,
    fontFamily: 'Inter_600SemiBold',
    color: Colors.error,
  },
  issueRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 6,
  },
  issueDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: Colors.error,
    marginTop: 4,
    flexShrink: 0,
  },
  issueText: {
    fontSize: FontSizes.xs,
    fontFamily: 'Inter_400Regular',
    color: Colors.error,
    flex: 1,
  },
  reuploadBtn: {
    backgroundColor: Colors.error,
    borderRadius: 8,
    paddingVertical: 8,
    alignItems: 'center',
    marginTop: 6,
  },
  reuploadLabel: {
    fontSize: FontSizes.sm,
    fontFamily: 'Inter_600SemiBold',
    color: Colors.white,
  },
  reqRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: Colors.white,
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  reqDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  reqDotDone: {
    backgroundColor: Colors.emerald,
  },
  reqDotPending: {
    backgroundColor: Colors.border,
  },
  reqInfo: {
    flex: 1,
  },
  reqName: {
    fontSize: FontSizes.sm,
    fontFamily: 'Inter_600SemiBold',
    color: Colors.ink,
  },
  reqHint: {
    fontSize: FontSizes.xs,
    fontFamily: 'Inter_400Regular',
    color: Colors.muted,
    marginTop: 2,
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
