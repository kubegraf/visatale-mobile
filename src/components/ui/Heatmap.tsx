import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors } from '../../constants/colors';

interface HeatmapProps {
  data: number[][]; // rows=days(7), cols=weeks(12)
  color?: string;
}

const CELL = 18;
const GAP = 3;
const DAYS = ['Mon', '', 'Wed', '', 'Fri', '', 'Sun'];

export const Heatmap: React.FC<HeatmapProps> = ({
  data,
  color = Colors.teal,
}) => {
  const maxVal = Math.max(...data.flat(), 1);

  const getOpacity = (v: number) => {
    if (v === 0) return 0.06;
    return 0.15 + (v / maxVal) * 0.85;
  };

  return (
    <View style={styles.container}>
      <View style={styles.grid}>
        {/* Day labels */}
        <View style={styles.dayLabels}>
          {DAYS.map((d, i) => (
            <Text key={i} style={[styles.dayLabel, { height: CELL + GAP }]}>
              {d}
            </Text>
          ))}
        </View>
        {/* Cells */}
        <View style={styles.cells}>
          {data.map((week, wi) => (
            <View key={wi} style={[styles.weekCol, { marginRight: wi < data.length - 1 ? GAP : 0 }]}>
              {week.map((val, di) => (
                <View
                  key={di}
                  style={[
                    styles.cell,
                    {
                      backgroundColor: color,
                      opacity: getOpacity(val),
                      marginBottom: di < week.length - 1 ? GAP : 0,
                    },
                  ]}
                />
              ))}
            </View>
          ))}
        </View>
      </View>
      {/* Legend */}
      <View style={styles.legend}>
        <Text style={styles.legendLabel}>Less</Text>
        {[0.06, 0.25, 0.5, 0.75, 1].map((op, i) => (
          <View
            key={i}
            style={[
              styles.legendCell,
              { backgroundColor: color, opacity: op },
            ]}
          />
        ))}
        <Text style={styles.legendLabel}>More</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 8,
  },
  grid: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  dayLabels: {
    marginRight: 6,
    justifyContent: 'flex-start',
  },
  dayLabel: {
    fontSize: 9,
    fontFamily: 'Inter_400Regular',
    color: Colors.muted,
    width: 24,
    lineHeight: CELL + GAP,
  },
  cells: {
    flexDirection: 'row',
  },
  weekCol: {
    flexDirection: 'column',
  },
  cell: {
    width: CELL,
    height: CELL,
    borderRadius: 3,
  },
  legend: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    alignSelf: 'flex-end',
  },
  legendCell: {
    width: 12,
    height: 12,
    borderRadius: 2,
  },
  legendLabel: {
    fontSize: 9,
    fontFamily: 'Inter_400Regular',
    color: Colors.muted,
  },
});
