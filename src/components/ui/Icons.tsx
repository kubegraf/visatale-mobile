import React from 'react';
import Svg, {
  Path,
  Circle,
  Rect,
  Line,
  Polyline,
  G,
  Text as SvgText,
} from 'react-native-svg';

type IconProps = { size?: number; color?: string };

const D = { sw: 1.8, slc: 'round' as const, slj: 'round' as const, fill: 'none' };

// ─── Navigation ───────────────────────────────────────────────────────────────

export function HomeIcon({ size = 20, color = '#0A1628' }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M3 9.5L12 3l9 6.5V20a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V9.5z"
        stroke={color}
        strokeWidth={D.sw}
        strokeLinecap={D.slc}
        strokeLinejoin={D.slj}
        fill="none"
      />
      <Path
        d="M9 21V12h6v9"
        stroke={color}
        strokeWidth={D.sw}
        strokeLinecap={D.slc}
        strokeLinejoin={D.slj}
      />
    </Svg>
  );
}

export function ApplyIcon({ size = 20, color = '#0A1628' }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M12 19V5M5 12l7-7 7 7"
        stroke={color}
        strokeWidth={D.sw}
        strokeLinecap={D.slc}
        strokeLinejoin={D.slj}
      />
      <Path
        d="M3 19h18"
        stroke={color}
        strokeWidth={D.sw}
        strokeLinecap={D.slc}
      />
    </Svg>
  );
}

export function TrackIcon({ size = 20, color = '#0A1628' }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"
        stroke={color}
        strokeWidth={D.sw}
        strokeLinecap={D.slc}
        strokeLinejoin={D.slj}
        fill="none"
      />
      <Circle cx={12} cy={9} r={2.5} stroke={color} strokeWidth={D.sw} fill="none" />
    </Svg>
  );
}

export function MessagesIcon({ size = 20, color = '#0A1628' }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"
        stroke={color}
        strokeWidth={D.sw}
        strokeLinecap={D.slc}
        strokeLinejoin={D.slj}
        fill="none"
      />
    </Svg>
  );
}

export function ProfileIcon({ size = 20, color = '#0A1628' }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Circle cx={12} cy={8} r={4} stroke={color} strokeWidth={D.sw} fill="none" />
      <Path
        d="M4 20c0-4 3.6-7 8-7s8 3 8 7"
        stroke={color}
        strokeWidth={D.sw}
        strokeLinecap={D.slc}
        strokeLinejoin={D.slj}
        fill="none"
      />
    </Svg>
  );
}

export function ChevronRight({ size = 20, color = '#0A1628' }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M9 18l6-6-6-6"
        stroke={color}
        strokeWidth={D.sw}
        strokeLinecap={D.slc}
        strokeLinejoin={D.slj}
      />
    </Svg>
  );
}

export function ChevronLeft({ size = 20, color = '#0A1628' }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M15 18l-6-6 6-6"
        stroke={color}
        strokeWidth={D.sw}
        strokeLinecap={D.slc}
        strokeLinejoin={D.slj}
      />
    </Svg>
  );
}

export function ArrowRight({ size = 20, color = '#0A1628' }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M5 12h14M12 5l7 7-7 7"
        stroke={color}
        strokeWidth={D.sw}
        strokeLinecap={D.slc}
        strokeLinejoin={D.slj}
      />
    </Svg>
  );
}

export function ArrowLeft({ size = 20, color = '#0A1628' }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M19 12H5M12 19l-7-7 7-7"
        stroke={color}
        strokeWidth={D.sw}
        strokeLinecap={D.slc}
        strokeLinejoin={D.slj}
      />
    </Svg>
  );
}

// ─── Actions ──────────────────────────────────────────────────────────────────

export function BellIcon({ size = 20, color = '#0A1628' }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"
        stroke={color}
        strokeWidth={D.sw}
        strokeLinecap={D.slc}
        strokeLinejoin={D.slj}
        fill="none"
      />
      <Path
        d="M13.73 21a2 2 0 0 1-3.46 0"
        stroke={color}
        strokeWidth={D.sw}
        strokeLinecap={D.slc}
        strokeLinejoin={D.slj}
      />
    </Svg>
  );
}

export function SearchIcon({ size = 20, color = '#0A1628' }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Circle cx={11} cy={11} r={7} stroke={color} strokeWidth={D.sw} fill="none" />
      <Path
        d="M21 21l-4.35-4.35"
        stroke={color}
        strokeWidth={D.sw}
        strokeLinecap={D.slc}
      />
    </Svg>
  );
}

export function UploadIcon({ size = 20, color = '#0A1628' }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"
        stroke={color}
        strokeWidth={D.sw}
        strokeLinecap={D.slc}
        strokeLinejoin={D.slj}
      />
      <Polyline
        points="17 8 12 3 7 8"
        stroke={color}
        strokeWidth={D.sw}
        strokeLinecap={D.slc}
        strokeLinejoin={D.slj}
        fill="none"
      />
      <Line
        x1={12}
        y1={3}
        x2={12}
        y2={15}
        stroke={color}
        strokeWidth={D.sw}
        strokeLinecap={D.slc}
      />
    </Svg>
  );
}

export function CameraIcon({ size = 20, color = '#0A1628' }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"
        stroke={color}
        strokeWidth={D.sw}
        strokeLinecap={D.slc}
        strokeLinejoin={D.slj}
        fill="none"
      />
      <Circle cx={12} cy={13} r={4} stroke={color} strokeWidth={D.sw} fill="none" />
    </Svg>
  );
}

export function PaperclipIcon({ size = 20, color = '#0A1628' }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"
        stroke={color}
        strokeWidth={D.sw}
        strokeLinecap={D.slc}
        strokeLinejoin={D.slj}
      />
    </Svg>
  );
}

export function SendIcon({ size = 20, color = '#0A1628' }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M22 2L11 13"
        stroke={color}
        strokeWidth={D.sw}
        strokeLinecap={D.slc}
        strokeLinejoin={D.slj}
      />
      <Path
        d="M22 2L15 22l-4-9-9-4 20-7z"
        stroke={color}
        strokeWidth={D.sw}
        strokeLinecap={D.slc}
        strokeLinejoin={D.slj}
        fill="none"
      />
    </Svg>
  );
}

export function PlusIcon({ size = 20, color = '#0A1628' }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M12 5v14M5 12h14"
        stroke={color}
        strokeWidth={D.sw}
        strokeLinecap={D.slc}
      />
    </Svg>
  );
}

export function EditIcon({ size = 20, color = '#0A1628' }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"
        stroke={color}
        strokeWidth={D.sw}
        strokeLinecap={D.slc}
        strokeLinejoin={D.slj}
      />
      <Path
        d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"
        stroke={color}
        strokeWidth={D.sw}
        strokeLinecap={D.slc}
        strokeLinejoin={D.slj}
        fill="none"
      />
    </Svg>
  );
}

// ─── Auth / Security ──────────────────────────────────────────────────────────

export function EyeIcon({ size = 20, color = '#0A1628' }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"
        stroke={color}
        strokeWidth={D.sw}
        strokeLinecap={D.slc}
        strokeLinejoin={D.slj}
        fill="none"
      />
      <Circle cx={12} cy={12} r={3} stroke={color} strokeWidth={D.sw} fill="none" />
    </Svg>
  );
}

export function EyeOffIcon({ size = 20, color = '#0A1628' }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"
        stroke={color}
        strokeWidth={D.sw}
        strokeLinecap={D.slc}
        strokeLinejoin={D.slj}
      />
      <Line
        x1={1}
        y1={1}
        x2={23}
        y2={23}
        stroke={color}
        strokeWidth={D.sw}
        strokeLinecap={D.slc}
      />
    </Svg>
  );
}

export function LockIcon({ size = 20, color = '#0A1628' }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Rect
        x={3}
        y={11}
        width={18}
        height={11}
        rx={2}
        ry={2}
        stroke={color}
        strokeWidth={D.sw}
        fill="none"
      />
      <Path
        d="M7 11V7a5 5 0 0 1 10 0v4"
        stroke={color}
        strokeWidth={D.sw}
        strokeLinecap={D.slc}
        strokeLinejoin={D.slj}
      />
    </Svg>
  );
}

export function FaceIdIcon({ size = 20, color = '#0A1628' }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path d="M4 7V5a1 1 0 0 1 1-1h2" stroke={color} strokeWidth={D.sw} strokeLinecap={D.slc} />
      <Path d="M20 7V5a1 1 0 0 0-1-1h-2" stroke={color} strokeWidth={D.sw} strokeLinecap={D.slc} />
      <Path d="M4 17v2a1 1 0 0 0 1 1h2" stroke={color} strokeWidth={D.sw} strokeLinecap={D.slc} />
      <Path d="M20 17v2a1 1 0 0 1-1 1h-2" stroke={color} strokeWidth={D.sw} strokeLinecap={D.slc} />
      <Circle cx={9} cy={10} r={1} fill={color} />
      <Circle cx={15} cy={10} r={1} fill={color} />
      <Path d="M9 15c.83 1 2.17 1.5 3 1.5s2.17-.5 3-1.5" stroke={color} strokeWidth={D.sw} strokeLinecap={D.slc} />
    </Svg>
  );
}

export function ShieldIcon({ size = 20, color = '#0A1628' }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"
        stroke={color}
        strokeWidth={D.sw}
        strokeLinecap={D.slc}
        strokeLinejoin={D.slj}
        fill="none"
      />
    </Svg>
  );
}

export function KeyIcon({ size = 20, color = '#0A1628' }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4"
        stroke={color}
        strokeWidth={D.sw}
        strokeLinecap={D.slc}
        strokeLinejoin={D.slj}
      />
    </Svg>
  );
}

// ─── Payment ──────────────────────────────────────────────────────────────────

export function CreditCardIcon({ size = 20, color = '#0A1628' }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Rect
        x={1}
        y={4}
        width={22}
        height={16}
        rx={2}
        ry={2}
        stroke={color}
        strokeWidth={D.sw}
        fill="none"
      />
      <Line
        x1={1}
        y1={10}
        x2={23}
        y2={10}
        stroke={color}
        strokeWidth={D.sw}
        strokeLinecap={D.slc}
      />
    </Svg>
  );
}

export function UpiIcon({ size = 20, color = '#F59E0B' }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 40 20" fill="none">
      <SvgText
        x={2}
        y={16}
        fontSize={14}
        fontWeight="bold"
        fill={color}
        fontFamily="Inter_700Bold"
      >
        UPI
      </SvgText>
    </Svg>
  );
}

export function BankIcon({ size = 20, color = '#0A1628' }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M3 22h18M3 10h18M5 10V6L12 2l7 4v4M7 10v12M17 10v12M12 10v12"
        stroke={color}
        strokeWidth={D.sw}
        strokeLinecap={D.slc}
        strokeLinejoin={D.slj}
      />
    </Svg>
  );
}

// ─── Documents ────────────────────────────────────────────────────────────────

export function DocumentIcon({ size = 20, color = '#0A1628' }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"
        stroke={color}
        strokeWidth={D.sw}
        strokeLinecap={D.slc}
        strokeLinejoin={D.slj}
        fill="none"
      />
      <Polyline
        points="14 2 14 8 20 8"
        stroke={color}
        strokeWidth={D.sw}
        strokeLinecap={D.slc}
        strokeLinejoin={D.slj}
        fill="none"
      />
      <Line x1={16} y1={13} x2={8} y2={13} stroke={color} strokeWidth={D.sw} strokeLinecap={D.slc} />
      <Line x1={16} y1={17} x2={8} y2={17} stroke={color} strokeWidth={D.sw} strokeLinecap={D.slc} />
      <Polyline points="10 9 9 9 8 9" stroke={color} strokeWidth={D.sw} strokeLinecap={D.slc} fill="none" />
    </Svg>
  );
}

export function ChecklistIcon({ size = 20, color = '#0A1628' }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path d="M9 11l3 3L22 4" stroke={color} strokeWidth={D.sw} strokeLinecap={D.slc} strokeLinejoin={D.slj} />
      <Path
        d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"
        stroke={color}
        strokeWidth={D.sw}
        strokeLinecap={D.slc}
        strokeLinejoin={D.slj}
        fill="none"
      />
    </Svg>
  );
}

export function PassportIcon({ size = 20, color = '#0A1628' }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Rect x={3} y={2} width={18} height={20} rx={2} stroke={color} strokeWidth={D.sw} fill="none" />
      <Circle cx={12} cy={10} r={3} stroke={color} strokeWidth={D.sw} fill="none" />
      <Path d="M7 17h10M7 20h4" stroke={color} strokeWidth={D.sw} strokeLinecap={D.slc} />
    </Svg>
  );
}

// ─── Status / Feedback ────────────────────────────────────────────────────────

export function CheckIcon({ size = 20, color = '#0A1628' }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Polyline
        points="20 6 9 17 4 12"
        stroke={color}
        strokeWidth={D.sw}
        strokeLinecap={D.slc}
        strokeLinejoin={D.slj}
        fill="none"
      />
    </Svg>
  );
}

export function WarningIcon({ size = 20, color = '#0A1628' }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"
        stroke={color}
        strokeWidth={D.sw}
        strokeLinecap={D.slc}
        strokeLinejoin={D.slj}
        fill="none"
      />
      <Line x1={12} y1={9} x2={12} y2={13} stroke={color} strokeWidth={D.sw} strokeLinecap={D.slc} />
      <Line x1={12} y1={17} x2={12.01} y2={17} stroke={color} strokeWidth={D.sw} strokeLinecap="round" />
    </Svg>
  );
}

export function InfoIcon({ size = 20, color = '#0A1628' }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Circle cx={12} cy={12} r={10} stroke={color} strokeWidth={D.sw} fill="none" />
      <Line x1={12} y1={16} x2={12} y2={12} stroke={color} strokeWidth={D.sw} strokeLinecap={D.slc} />
      <Line x1={12} y1={8} x2={12.01} y2={8} stroke={color} strokeWidth={D.sw} strokeLinecap="round" />
    </Svg>
  );
}

export function CloseIcon({ size = 20, color = '#0A1628' }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M18 6L6 18M6 6l12 12"
        stroke={color}
        strokeWidth={D.sw}
        strokeLinecap={D.slc}
      />
    </Svg>
  );
}

export function StarIcon({ size = 20, color = '#0A1628' }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Polyline
        points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"
        stroke={color}
        strokeWidth={D.sw}
        strokeLinecap={D.slc}
        strokeLinejoin={D.slj}
        fill="none"
      />
    </Svg>
  );
}

export function TrophyIcon({ size = 20, color = '#0A1628' }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M6 9H3V4h3M18 9h3V4h-3"
        stroke={color}
        strokeWidth={D.sw}
        strokeLinecap={D.slc}
        strokeLinejoin={D.slj}
      />
      <Path
        d="M6 4h12v8a6 6 0 0 1-12 0V4z"
        stroke={color}
        strokeWidth={D.sw}
        strokeLinecap={D.slc}
        strokeLinejoin={D.slj}
        fill="none"
      />
      <Path d="M9 21h6M12 18v3" stroke={color} strokeWidth={D.sw} strokeLinecap={D.slc} />
    </Svg>
  );
}

// ─── Communication ────────────────────────────────────────────────────────────

export function PhoneIcon({ size = 20, color = '#0A1628' }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.62 3.4 2 2 0 0 1 3.6 1.21h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.91a16 16 0 0 0 6.07 6.07l.98-.98a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21.92 16.92z"
        stroke={color}
        strokeWidth={D.sw}
        strokeLinecap={D.slc}
        strokeLinejoin={D.slj}
        fill="none"
      />
    </Svg>
  );
}

export function EmailIcon({ size = 20, color = '#0A1628' }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"
        stroke={color}
        strokeWidth={D.sw}
        strokeLinecap={D.slc}
        strokeLinejoin={D.slj}
        fill="none"
      />
      <Polyline
        points="22,6 12,13 2,6"
        stroke={color}
        strokeWidth={D.sw}
        strokeLinecap={D.slc}
        strokeLinejoin={D.slj}
        fill="none"
      />
    </Svg>
  );
}

export function ChatBubbleIcon({ size = 20, color = '#0A1628' }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"
        stroke={color}
        strokeWidth={D.sw}
        strokeLinecap={D.slc}
        strokeLinejoin={D.slj}
        fill="none"
      />
      <Circle cx={9} cy={11} r={1} fill={color} />
      <Circle cx={12} cy={11} r={1} fill={color} />
      <Circle cx={15} cy={11} r={1} fill={color} />
    </Svg>
  );
}

// ─── Misc ─────────────────────────────────────────────────────────────────────

export function GlobeIcon({ size = 20, color = '#0A1628' }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Circle cx={12} cy={12} r={10} stroke={color} strokeWidth={D.sw} fill="none" />
      <Path
        d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"
        stroke={color}
        strokeWidth={D.sw}
        strokeLinecap={D.slc}
        strokeLinejoin={D.slj}
      />
    </Svg>
  );
}

export function SettingsIcon({ size = 20, color = '#0A1628' }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Circle cx={12} cy={12} r={3} stroke={color} strokeWidth={D.sw} fill="none" />
      <Path
        d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"
        stroke={color}
        strokeWidth={D.sw}
        strokeLinecap={D.slc}
        strokeLinejoin={D.slj}
        fill="none"
      />
    </Svg>
  );
}

export function CurrencyRupeeIcon({ size = 20, color = '#0A1628' }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M6 4h12M6 9h12M13 9l-5 11M6 14h5a4 4 0 0 0 0-8"
        stroke={color}
        strokeWidth={D.sw}
        strokeLinecap={D.slc}
        strokeLinejoin={D.slj}
      />
    </Svg>
  );
}

export function CalendarIcon({ size = 20, color = '#0A1628' }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Rect x={3} y={4} width={18} height={18} rx={2} ry={2} stroke={color} strokeWidth={D.sw} fill="none" />
      <Line x1={16} y1={2} x2={16} y2={6} stroke={color} strokeWidth={D.sw} strokeLinecap={D.slc} />
      <Line x1={8} y1={2} x2={8} y2={6} stroke={color} strokeWidth={D.sw} strokeLinecap={D.slc} />
      <Line x1={3} y1={10} x2={21} y2={10} stroke={color} strokeWidth={D.sw} strokeLinecap={D.slc} />
    </Svg>
  );
}

export function ClockIcon({ size = 20, color = '#0A1628' }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Circle cx={12} cy={12} r={10} stroke={color} strokeWidth={D.sw} fill="none" />
      <Polyline
        points="12 6 12 12 16 14"
        stroke={color}
        strokeWidth={D.sw}
        strokeLinecap={D.slc}
        strokeLinejoin={D.slj}
        fill="none"
      />
    </Svg>
  );
}

export function MapPinIcon({ size = 20, color = '#0A1628' }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"
        stroke={color}
        strokeWidth={D.sw}
        strokeLinecap={D.slc}
        strokeLinejoin={D.slj}
        fill="none"
      />
      <Circle cx={12} cy={10} r={3} stroke={color} strokeWidth={D.sw} fill="none" />
    </Svg>
  );
}

export function FlightIcon({ size = 20, color = '#0A1628' }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M17.8 19.2L16 11l3.5-3.5C21 6 21 4 19 4s-2 0-3.5 1.5L11 9 2.8 7.2c-.3-.1-.6 0-.8.3L1.6 8c-.2.4-.1.8.2 1l4.8 3L5 14l-1 1 2 1 1 2 1-1 1.5-1.5 3 4.8c.2.3.7.4 1 .2l.5-.4c.3-.2.4-.6.3-.9z"
        stroke={color}
        strokeWidth={D.sw}
        strokeLinecap={D.slc}
        strokeLinejoin={D.slj}
        fill="none"
      />
    </Svg>
  );
}

// ─── Social / Brand ───────────────────────────────────────────────────────────

export function AppleIcon({ size = 20, color = '#000' }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 814 1000">
      <Path
        d="M788.1 340.9c-5.8 4.5-108.2 62.2-108.2 190.5 0 148.4 130.3 200.9 134.2 202.2-.6 3.2-20.7 71.9-68.7 141.9-42.8 61.6-87.5 123.1-155.5 123.1s-85.5-39.5-164-39.5c-76 0-103.7 40.8-165.9 40.8s-105-57.8-155.5-127.4C46 336.7 0 208.3 0 85.5 0 38.4 17.3 0 51.4 0c64.9 0 110.8 82.6 126.2 116.5 0 0 12.1 28 18.2 41.8 42.6 93.9 145.9 140.6 162.3 140.6 20.6 0 28.7-3.6 33.6-5.5 17.5-6.9 35.4-34.9 35.4-59.2s-12.7-41.4-26.3-54c-19.6-17.7-60.9-51.9-60.9-114.6 0-57.9 42.5-106.1 109.5-106.1 57.8 0 103 40.8 103 105.4 0 62.3-32.4 95.8-32.4 95.8s16.6 7.2 37.3 7.2c28.7 0 66-22.3 66-22.3 5.3-3 14.5-8.4 14.5-8.4z"
        fill={color}
      />
    </Svg>
  );
}

export function GoogleIcon({ size = 20}: { size?: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 48 48">
      <Path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
      <Path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
      <Path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
      <Path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.18 1.48-4.97 2.31-8.16 2.31-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
      <Path fill="none" d="M0 0h48v48H0z"/>
    </Svg>
  );
}
