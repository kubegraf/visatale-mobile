import React, { useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Animated,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Svg, { Path, Circle, Text as SvgText, Line, G } from 'react-native-svg';
import { Colors } from '../../constants/colors';
import { FontSizes } from '../../constants/typography';
import { ScreenHeader } from '../../components/ui/ScreenHeader';
import { Pill } from '../../components/ui/Pill';
import { BankIcon, SearchIcon, CheckIcon, DocumentIcon, FlightIcon } from '../../components/ui/Icons';

const { width } = Dimensions.get('window');

type EventIconKey = 'bank' | 'search' | 'document' | 'check' | 'flight';

function EventIconView({ iconKey, active, done }: { iconKey: EventIconKey; active?: boolean; done: boolean }) {
  const color = active ? Colors.amber : done ? Colors.emerald : 'rgba(255,255,255,0.4)';
  switch (iconKey) {
    case 'bank': return <BankIcon size={16} color={color} />;
    case 'search': return <SearchIcon size={16} color={color} />;
    case 'document': return <DocumentIcon size={16} color={color} />;
    case 'check': return <CheckIcon size={16} color={color} />;
    case 'flight': return <FlightIcon size={16} color={color} />;
  }
}

const EVENTS: { iconKey: EventIconKey; title: string; time: string; done: boolean; active?: boolean }[] = [
  {
    iconKey: 'bank',
    title: 'Embassy received application',
    time: 'Jun 4, 10:02 AM',
    done: true,
  },
  {
    iconKey: 'search',
    title: 'Document verification started',
    time: 'Jun 4, 11:45 AM',
    done: true,
  },
  {
    iconKey: 'document',
    title: 'Background check in progress',
    time: 'Jun 5, 09:00 AM',
    done: true,
    active: true,
  },
  {
    iconKey: 'check',
    title: 'Visa officer review',
    time: 'Expected Jun 6–7',
    done: false,
  },
  {
    iconKey: 'flight',
    title: 'Visa decision issued',
    time: 'Expected Jun 8–10',
    done: false,
  },
];

const QUEUE_DATA = [45, 60, 55, 70, 80, 65, 50, 40, 35, 30, 28];

export const LiveStatusScreen: React.FC = () => {
  const pulseAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.4,
          duration: 700,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 700,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  // Arc path between "Mumbai" and "Paris" on a simple flat projection
  const svgW = width - 40;
  const svgH = 160;
  const mum = { x: svgW * 0.15, y: svgH * 0.65 };
  const par = { x: svgW * 0.72, y: svgH * 0.35 };
  const cp = { x: (mum.x + par.x) / 2, y: svgH * 0.05 };

  const arcPath = `M ${mum.x} ${mum.y} Q ${cp.x} ${cp.y} ${par.x} ${par.y}`;

  // Queue chart
  const chartW = svgW;
  const chartH = 80;
  const maxQ = Math.max(...QUEUE_DATA);
  const qPoints = QUEUE_DATA.map((v, i) => ({
    x: (i / (QUEUE_DATA.length - 1)) * chartW,
    y: chartH - (v / maxQ) * (chartH - 10),
  }));

  return (
    <View style={styles.darkBg}>
      <SafeAreaView style={styles.safe} edges={['top']}>
        <ScreenHeader title="Live Status" />
        <ScrollView
          contentContainerStyle={styles.scroll}
          showsVerticalScrollIndicator={false}
        >
          {/* Header */}
          <View style={styles.header}>
            <View style={styles.liveRow}>
              <Animated.View
                style={[
                  styles.livePulseOuter,
                  { transform: [{ scale: pulseAnim }] },
                ]}
              />
              <View style={styles.liveDot} />
              <Text style={styles.liveText}>LIVE</Text>
            </View>
            <Text style={styles.heading}>Embassy Status</Text>
            <Text style={styles.subheading}>
              🇦🇪 UAE Tourist Visa · #VT-2024-08421
            </Text>
          </View>

          {/* Map arc card */}
          <View style={styles.mapCard}>
            <Svg width={svgW} height={svgH}>
              {/* Background grid lines */}
              {[0.25, 0.5, 0.75].map((v, i) => (
                <Line
                  key={i}
                  x1={0}
                  y1={svgH * v}
                  x2={svgW}
                  y2={svgH * v}
                  stroke="rgba(255,255,255,0.05)"
                  strokeWidth={1}
                />
              ))}

              {/* Arc */}
              <Path
                d={arcPath}
                fill="none"
                stroke={Colors.teal}
                strokeWidth={2}
                strokeDasharray="6 4"
              />

              {/* Mumbai dot */}
              <Circle cx={mum.x} cy={mum.y} r={8} fill={Colors.teal} opacity={0.9} />
              <Circle cx={mum.x} cy={mum.y} r={14} fill={Colors.teal} opacity={0.2} />
              <SvgText
                x={mum.x}
                y={mum.y + 26}
                fontSize={10}
                fill="rgba(255,255,255,0.7)"
                textAnchor="middle"
                fontFamily="Inter_500Medium"
              >
                Mumbai
              </SvgText>

              {/* Paris dot */}
              <Circle cx={par.x} cy={par.y} r={8} fill={Colors.amber} opacity={0.9} />
              <Circle cx={par.x} cy={par.y} r={14} fill={Colors.amber} opacity={0.2} />
              <SvgText
                x={par.x}
                y={par.y + 26}
                fontSize={10}
                fill="rgba(255,255,255,0.7)"
                textAnchor="middle"
                fontFamily="Inter_500Medium"
              >
                Dubai Embassy
              </SvgText>

              {/* Midpoint plane */}
              <G transform={`translate(${(mum.x + par.x) / 2 - 8}, ${cp.y + 8})`}>
                <Path
                  d="M17.8 19.2L16 11l3.5-3.5C21 6 21 4 19 4s-2 0-3.5 1.5L11 9 2.8 7.2c-.3-.1-.6 0-.8.3L1.6 8c-.2.4-.1.8.2 1l4.8 3L5 14l-1 1 2 1 1 2 1-1 1.5-1.5 3 4.8c.2.3.7.4 1 .2l.5-.4c.3-.2.4-.6.3-.9z"
                  stroke={Colors.white}
                  strokeWidth={1.5}
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  transform="scale(0.9)"
                />
              </G>
            </Svg>
          </View>

          {/* Status cards */}
          <View style={styles.statusCards}>
            <View style={styles.statusCard}>
              <Text style={styles.statusCardLabel}>Queue Position</Text>
              <Text style={styles.statusCardValue}>
                <Text style={styles.statusCardValueBig}>28</Text>
                <Text style={styles.statusCardValueSub}> / 120</Text>
              </Text>
              <Pill label="Moving fast" tone="emerald" dot size="sm" />
            </View>
            <View style={styles.statusCard}>
              <Text style={styles.statusCardLabel}>Days in Process</Text>
              <Text style={styles.statusCardValueBig}>3</Text>
              <Text style={styles.statusCardValueSub}>of ~7 avg</Text>
            </View>
            <View style={styles.statusCard}>
              <Text style={styles.statusCardLabel}>Approval Rate</Text>
              <Text style={[styles.statusCardValueBig, { color: Colors.emerald }]}>
                98%
              </Text>
              <Text style={styles.statusCardValueSub}>India → UAE</Text>
            </View>
          </View>

          {/* Queue position chart */}
          <View style={styles.chartCard}>
            <Text style={styles.chartTitle}>Queue Position (last 11 days)</Text>
            <Svg width={chartW} height={chartH + 16}>
              {/* Line */}
              <Path
                d={qPoints
                  .map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`)
                  .join(' ')}
                fill="none"
                stroke={Colors.teal}
                strokeWidth={2}
                strokeLinecap="round"
              />
              {/* Current dot */}
              <Circle
                cx={qPoints[qPoints.length - 1].x}
                cy={qPoints[qPoints.length - 1].y}
                r={5}
                fill={Colors.teal}
              />
              {/* Value labels */}
              <SvgText
                x={qPoints[qPoints.length - 1].x}
                y={qPoints[qPoints.length - 1].y - 10}
                fontSize={10}
                fill={Colors.teal}
                textAnchor="middle"
                fontFamily="Inter_600SemiBold"
              >
                28
              </SvgText>
            </Svg>
            <Text style={styles.chartSub}>
              Your position dropped from 45 → 28 in 10 days
            </Text>
          </View>

          {/* Event stream */}
          <Text style={styles.streamTitle}>Status Timeline</Text>
          {EVENTS.map((ev, i) => (
            <View key={i} style={styles.eventRow}>
              <View style={styles.eventLeft}>
                <View
                  style={[
                    styles.eventDot,
                    ev.active
                      ? styles.eventDotActive
                      : ev.done
                      ? styles.eventDotDone
                      : styles.eventDotPending,
                  ]}
                >
                  <Text style={{ fontSize: 12 }}>{ev.done || ev.active ? '' : ''}</Text>
                </View>
                {i < EVENTS.length - 1 && (
                  <View
                    style={[
                      styles.eventLine,
                      ev.done ? styles.eventLineDone : styles.eventLinePending,
                    ]}
                  />
                )}
              </View>
              <View style={styles.eventContent}>
                <View style={styles.eventTitleRow}>
                  <EventIconView iconKey={ev.iconKey} active={ev.active} done={ev.done} />
                  <Text
                    style={[
                      styles.eventTitle,
                      ev.active && styles.eventTitleActive,
                    ]}
                  >
                    {ev.title}
                  </Text>
                </View>
                <Text style={styles.eventTime}>{ev.time}</Text>
                {ev.active && (
                  <Pill label="In Progress" tone="amber" dot size="sm" />
                )}
              </View>
            </View>
          ))}
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  darkBg: {
    flex: 1,
    backgroundColor: '#0B1220',
  },
  safe: {
    flex: 1,
  },
  scroll: {
    padding: 20,
    paddingBottom: 40,
  },
  header: {
    marginBottom: 20,
    gap: 6,
  },
  liveRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    position: 'relative',
  },
  livePulseOuter: {
    position: 'absolute',
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: Colors.emerald,
    opacity: 0.3,
    left: -2,
  },
  liveDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.emerald,
  },
  liveText: {
    fontSize: FontSizes.xs,
    fontFamily: 'Inter_700Bold',
    color: Colors.emerald,
    letterSpacing: 2,
  },
  heading: {
    fontSize: FontSizes['3xl'],
    fontFamily: 'SpaceGrotesk_700Bold',
    color: Colors.white,
    letterSpacing: -0.5,
  },
  subheading: {
    fontSize: FontSizes.sm,
    fontFamily: 'Inter_400Regular',
    color: 'rgba(255,255,255,0.5)',
  },
  mapCard: {
    backgroundColor: '#0F1929',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
    alignItems: 'center',
  },
  statusCards: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 16,
  },
  statusCard: {
    flex: 1,
    backgroundColor: '#0F1929',
    borderRadius: 14,
    padding: 14,
    gap: 4,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
  },
  statusCardLabel: {
    fontSize: FontSizes.xs,
    fontFamily: 'Inter_400Regular',
    color: 'rgba(255,255,255,0.4)',
  },
  statusCardValue: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  statusCardValueBig: {
    fontSize: FontSizes['2xl'],
    fontFamily: 'SpaceGrotesk_700Bold',
    color: Colors.white,
  },
  statusCardValueSub: {
    fontSize: FontSizes.xs,
    fontFamily: 'Inter_400Regular',
    color: 'rgba(255,255,255,0.4)',
  },
  chartCard: {
    backgroundColor: '#0F1929',
    borderRadius: 16,
    padding: 16,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
    gap: 8,
  },
  chartTitle: {
    fontSize: FontSizes.sm,
    fontFamily: 'Inter_600SemiBold',
    color: 'rgba(255,255,255,0.7)',
  },
  chartSub: {
    fontSize: FontSizes.xs,
    fontFamily: 'Inter_400Regular',
    color: 'rgba(255,255,255,0.4)',
  },
  streamTitle: {
    fontSize: FontSizes.md,
    fontFamily: 'SpaceGrotesk_600SemiBold',
    color: Colors.white,
    marginBottom: 12,
  },
  eventRow: {
    flexDirection: 'row',
    gap: 12,
    minHeight: 64,
  },
  eventLeft: {
    alignItems: 'center',
    width: 28,
  },
  eventDot: {
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
  },
  eventDotDone: {
    backgroundColor: Colors.emerald,
  },
  eventDotActive: {
    backgroundColor: Colors.amber,
  },
  eventDotPending: {
    backgroundColor: '#1E2D40',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.15)',
  },
  eventLine: {
    width: 2,
    flex: 1,
    marginTop: 4,
  },
  eventLineDone: {
    backgroundColor: Colors.emerald,
    opacity: 0.5,
  },
  eventLinePending: {
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
  eventContent: {
    flex: 1,
    paddingBottom: 20,
    gap: 4,
  },
  eventTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  eventTitle: {
    fontSize: FontSizes.sm,
    fontFamily: 'Inter_500Medium',
    color: 'rgba(255,255,255,0.7)',
    flex: 1,
  },
  eventTitleActive: {
    color: Colors.amber,
    fontFamily: 'Inter_600SemiBold',
  },
  eventTime: {
    fontSize: FontSizes.xs,
    fontFamily: 'JetBrainsMono_400Regular',
    color: 'rgba(255,255,255,0.35)',
  },
});
