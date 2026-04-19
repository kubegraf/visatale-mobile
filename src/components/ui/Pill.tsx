import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors } from '../../constants/colors';
import { FontSizes } from '../../constants/typography';

type PillTone = 'teal' | 'emerald' | 'amber' | 'gray' | 'error' | 'white';

interface PillProps {
  label: string;
  tone?: PillTone;
  dot?: boolean;
  size?: 'sm' | 'md';
}

const toneStyles: Record<PillTone, { bg: string; text: string; dot: string }> = {
  teal: { bg: '#CCFBF1', text: Colors.tealDark, dot: Colors.teal },
  emerald: { bg: '#D1FAE5', text: Colors.emerald, dot: Colors.emeraldLight },
  amber: { bg: '#FEF3C7', text: '#92400E', dot: Colors.amber },
  gray: { bg: '#F1F5F9', text: Colors.slate, dot: Colors.muted },
  error: { bg: Colors.errorLight, text: Colors.error, dot: Colors.error },
  white: { bg: 'rgba(255,255,255,0.2)', text: Colors.white, dot: Colors.white },
};

export const Pill: React.FC<PillProps> = ({ label, tone = 'teal', dot = false, size = 'md' }) => {
  const ts = toneStyles[tone];
  const isSmall = size === 'sm';

  return (
    <View style={[styles.pill, { backgroundColor: ts.bg }, isSmall && styles.pillSm]}>
      {dot && (
        <View style={[styles.dot, { backgroundColor: ts.dot }]} />
      )}
      <Text style={[styles.label, { color: ts.text }, isSmall && styles.labelSm]}>
        {label}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  pill: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 100,
    gap: 5,
  },
  pillSm: {
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  label: {
    fontSize: FontSizes.xs,
    fontFamily: 'Inter_600SemiBold',
    letterSpacing: 0.2,
  },
  labelSm: {
    fontSize: 10,
  },
});
