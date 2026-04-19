import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors } from '../../constants/colors';
import { FontSizes } from '../../constants/typography';

interface BarItem {
  label: string;
  value: number;
  flag?: string;
}

interface BarChartProps {
  data: BarItem[];
  color?: string;
  maxValue?: number;
}

export const BarChart: React.FC<BarChartProps> = ({
  data,
  color = Colors.teal,
  maxValue,
}) => {
  const max = maxValue || Math.max(...data.map((d) => d.value));

  return (
    <View style={styles.container}>
      {data.map((item, i) => {
        const pct = (item.value / max) * 100;
        return (
          <View key={i} style={styles.row}>
            <View style={styles.labelWrap}>
              {item.flag && <Text style={styles.flag}>{item.flag}</Text>}
              <Text style={styles.label} numberOfLines={1}>
                {item.label}
              </Text>
            </View>
            <View style={styles.barWrap}>
              <View style={[styles.barTrack]}>
                <View
                  style={[
                    styles.barFill,
                    { width: `${pct}%`, backgroundColor: color },
                  ]}
                />
              </View>
              <Text style={styles.value}>{item.value}</Text>
            </View>
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 10,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  labelWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    width: 100,
    gap: 4,
  },
  flag: {
    fontSize: 14,
  },
  label: {
    fontSize: FontSizes.xs,
    fontFamily: 'Inter_500Medium',
    color: Colors.slate,
    flex: 1,
  },
  barWrap: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  barTrack: {
    flex: 1,
    height: 8,
    backgroundColor: Colors.border,
    borderRadius: 4,
    overflow: 'hidden',
  },
  barFill: {
    height: '100%',
    borderRadius: 4,
  },
  value: {
    fontSize: FontSizes.xs,
    fontFamily: 'Inter_600SemiBold',
    color: Colors.slate,
    width: 28,
    textAlign: 'right',
  },
});
