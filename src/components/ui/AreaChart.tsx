import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Svg, { Path, Defs, LinearGradient, Stop, Line, Text as SvgText } from 'react-native-svg';
import { Colors } from '../../constants/colors';
import { FontSizes } from '../../constants/typography';

interface AreaChartProps {
  data: number[];
  labels?: string[];
  width?: number;
  height?: number;
  color?: string;
}

export const AreaChart: React.FC<AreaChartProps> = ({
  data,
  labels,
  width = 320,
  height = 120,
  color = Colors.teal,
}) => {
  if (!data || data.length < 2) return null;

  const padTop = 10;
  const padBottom = labels ? 24 : 10;
  const padLeft = 10;
  const padRight = 10;
  const chartWidth = width - padLeft - padRight;
  const chartHeight = height - padTop - padBottom;

  const min = 0;
  const max = Math.max(...data) * 1.1;
  const range = max - min || 1;

  const getX = (i: number) => padLeft + (i / (data.length - 1)) * chartWidth;
  const getY = (v: number) => padTop + (1 - (v - min) / range) * chartHeight;

  // Build smooth cubic bezier path
  const points = data.map((v, i) => ({ x: getX(i), y: getY(v) }));

  let linePath = `M ${points[0].x} ${points[0].y}`;
  for (let i = 1; i < points.length; i++) {
    const prev = points[i - 1];
    const curr = points[i];
    const cpX = (prev.x + curr.x) / 2;
    linePath += ` C ${cpX} ${prev.y}, ${cpX} ${curr.y}, ${curr.x} ${curr.y}`;
  }

  const areaPath =
    linePath +
    ` L ${points[points.length - 1].x} ${padTop + chartHeight}` +
    ` L ${points[0].x} ${padTop + chartHeight} Z`;

  return (
    <Svg width={width} height={height}>
      <Defs>
        <LinearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
          <Stop offset="0" stopColor={color} stopOpacity="0.25" />
          <Stop offset="1" stopColor={color} stopOpacity="0" />
        </LinearGradient>
      </Defs>
      {/* Area fill */}
      <Path d={areaPath} fill="url(#areaGrad)" />
      {/* Line */}
      <Path d={linePath} fill="none" stroke={color} strokeWidth={2.5} strokeLinecap="round" />
      {/* Dots */}
      {points.map((p, i) => (
        <React.Fragment key={i}>
          <SvgText
            x={p.x}
            y={p.y - 8}
            fontSize={9}
            textAnchor="middle"
            fill={Colors.slate}
            fontFamily="Inter_500Medium"
          >
            {data[i]}
          </SvgText>
        </React.Fragment>
      ))}
      {/* X labels */}
      {labels &&
        labels.map((l, i) => (
          <SvgText
            key={i}
            x={getX(i)}
            y={height - 4}
            fontSize={9}
            textAnchor="middle"
            fill={Colors.muted}
            fontFamily="Inter_400Regular"
          >
            {l}
          </SvgText>
        ))}
    </Svg>
  );
};
