import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import { Colors } from '../../constants/colors';
import { FontSizes } from '../../constants/typography';

interface RingProps {
  size?: number;
  strokeWidth?: number;
  progress: number; // 0–1
  color?: string;
  trackColor?: string;
  label?: string;
  sublabel?: string;
  labelColor?: string;
}

export const Ring: React.FC<RingProps> = ({
  size = 80,
  strokeWidth = 8,
  progress,
  color = Colors.teal,
  trackColor = Colors.border,
  label,
  sublabel,
  labelColor = Colors.ink,
}) => {
  const r = (size - strokeWidth) / 2;
  const cx = size / 2;
  const cy = size / 2;
  const circumference = 2 * Math.PI * r;
  const filled = circumference * Math.min(Math.max(progress, 0), 1);
  const gap = circumference - filled;

  return (
    <View style={[styles.container, { width: size, height: size }]}>
      <Svg width={size} height={size} style={styles.svg}>
        {/* Track */}
        <Circle
          cx={cx}
          cy={cy}
          r={r}
          fill="none"
          stroke={trackColor}
          strokeWidth={strokeWidth}
        />
        {/* Progress */}
        <Circle
          cx={cx}
          cy={cy}
          r={r}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeDasharray={`${filled} ${gap}`}
          strokeLinecap="round"
          transform={`rotate(-90 ${cx} ${cy})`}
        />
      </Svg>
      {(label || sublabel) && (
        <View style={styles.labelContainer}>
          {label && (
            <Text style={[styles.label, { color: labelColor, fontSize: size < 80 ? FontSizes.xs : FontSizes.lg }]}>
              {label}
            </Text>
          )}
          {sublabel && (
            <Text style={[styles.sublabel, { fontSize: size < 80 ? 9 : FontSizes.xs }]}>
              {sublabel}
            </Text>
          )}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  svg: {
    position: 'absolute',
  },
  labelContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    fontFamily: 'SpaceGrotesk_700Bold',
    color: Colors.ink,
    textAlign: 'center',
  },
  sublabel: {
    fontFamily: 'Inter_400Regular',
    color: Colors.muted,
    textAlign: 'center',
    marginTop: 1,
  },
});
