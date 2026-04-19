import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Spark } from './Spark';
import { Colors } from '../../constants/colors';
import { FontSizes } from '../../constants/typography';

interface StatProps {
  label: string;
  value: string;
  delta?: string;
  deltaPositive?: boolean;
  sparkData?: number[];
  sparkColor?: string;
  accent?: string;
}

export const Stat: React.FC<StatProps> = ({
  label,
  value,
  delta,
  deltaPositive = true,
  sparkData,
  sparkColor = Colors.teal,
  accent = Colors.teal,
}) => {
  return (
    <View style={styles.card}>
      <View style={styles.top}>
        <Text style={styles.label}>{label}</Text>
        {delta && (
          <View
            style={[
              styles.deltaPill,
              { backgroundColor: deltaPositive ? '#D1FAE5' : Colors.errorLight },
            ]}
          >
            <Text
              style={[
                styles.deltaText,
                { color: deltaPositive ? Colors.emerald : Colors.error },
              ]}
            >
              {deltaPositive ? '↑' : '↓'} {delta}
            </Text>
          </View>
        )}
      </View>
      <Text style={[styles.value, { color: accent }]}>{value}</Text>
      {sparkData && (
        <View style={styles.spark}>
          <Spark data={sparkData} color={sparkColor} width={72} height={28} />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: Colors.white,
    borderRadius: 16,
    padding: 14,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  top: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  label: {
    fontSize: FontSizes.xs,
    fontFamily: 'Inter_500Medium',
    color: Colors.muted,
  },
  deltaPill: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 100,
  },
  deltaText: {
    fontSize: 10,
    fontFamily: 'Inter_600SemiBold',
  },
  value: {
    fontSize: FontSizes['2xl'],
    fontFamily: 'SpaceGrotesk_700Bold',
    marginBottom: 4,
  },
  spark: {
    marginTop: 4,
  },
});
