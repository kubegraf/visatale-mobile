import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
  View,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors } from '../../constants/colors';
import { FontSizes } from '../../constants/typography';

type BtnKind = 'primary' | 'warm' | 'ghost' | 'destructive' | 'outline';

interface BtnProps {
  label: string;
  onPress?: () => void;
  kind?: BtnKind;
  loading?: boolean;
  disabled?: boolean;
  icon?: React.ReactNode;
  iconRight?: React.ReactNode;
  fullWidth?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export const Btn: React.FC<BtnProps> = ({
  label,
  onPress,
  kind = 'primary',
  loading = false,
  disabled = false,
  icon,
  iconRight,
  fullWidth = true,
  size = 'lg',
}) => {
  const isDisabled = disabled || loading;

  const heightMap = { sm: 40, md: 48, lg: 56 };
  const fontSizeMap = { sm: FontSizes.sm, md: FontSizes.base, lg: FontSizes.md };
  const height = heightMap[size];
  const fontSize = fontSizeMap[size];

  if (kind === 'primary') {
    return (
      <TouchableOpacity
        onPress={onPress}
        disabled={isDisabled}
        activeOpacity={0.85}
        style={[styles.wrapper, fullWidth && styles.fullWidth, { opacity: isDisabled ? 0.6 : 1 }]}
      >
        <LinearGradient
          colors={[Colors.teal, Colors.tealDark]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={[styles.gradient, { height, borderRadius: 14 }]}
        >
          {loading ? (
            <ActivityIndicator color={Colors.white} size="small" />
          ) : (
            <View style={styles.row}>
              {icon && <View style={styles.iconLeft}>{icon}</View>}
              <Text style={[styles.labelPrimary, { fontSize }]}>{label}</Text>
              {iconRight && <View style={styles.iconRight}>{iconRight}</View>}
            </View>
          )}
        </LinearGradient>
      </TouchableOpacity>
    );
  }

  if (kind === 'warm') {
    return (
      <TouchableOpacity
        onPress={onPress}
        disabled={isDisabled}
        activeOpacity={0.85}
        style={[styles.wrapper, fullWidth && styles.fullWidth, { opacity: isDisabled ? 0.6 : 1 }]}
      >
        <LinearGradient
          colors={[Colors.amber, '#D97706']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={[styles.gradient, { height, borderRadius: 14 }]}
        >
          {loading ? (
            <ActivityIndicator color={Colors.white} size="small" />
          ) : (
            <View style={styles.row}>
              {icon && <View style={styles.iconLeft}>{icon}</View>}
              <Text style={[styles.labelPrimary, { fontSize }]}>{label}</Text>
              {iconRight && <View style={styles.iconRight}>{iconRight}</View>}
            </View>
          )}
        </LinearGradient>
      </TouchableOpacity>
    );
  }

  if (kind === 'ghost') {
    return (
      <TouchableOpacity
        onPress={onPress}
        disabled={isDisabled}
        activeOpacity={0.7}
        style={[
          styles.wrapper,
          fullWidth && styles.fullWidth,
          styles.ghost,
          { height, borderRadius: 14, opacity: isDisabled ? 0.5 : 1 },
        ]}
      >
        <View style={styles.row}>
          {icon && <View style={styles.iconLeft}>{icon}</View>}
          <Text style={[styles.labelGhost, { fontSize }]}>{label}</Text>
          {iconRight && <View style={styles.iconRight}>{iconRight}</View>}
        </View>
      </TouchableOpacity>
    );
  }

  if (kind === 'outline') {
    return (
      <TouchableOpacity
        onPress={onPress}
        disabled={isDisabled}
        activeOpacity={0.7}
        style={[
          styles.wrapper,
          fullWidth && styles.fullWidth,
          styles.outline,
          { height, borderRadius: 14, opacity: isDisabled ? 0.5 : 1 },
        ]}
      >
        <View style={styles.row}>
          {icon && <View style={styles.iconLeft}>{icon}</View>}
          <Text style={[styles.labelOutline, { fontSize }]}>{label}</Text>
          {iconRight && <View style={styles.iconRight}>{iconRight}</View>}
        </View>
      </TouchableOpacity>
    );
  }

  if (kind === 'destructive') {
    return (
      <TouchableOpacity
        onPress={onPress}
        disabled={isDisabled}
        activeOpacity={0.85}
        style={[
          styles.wrapper,
          fullWidth && styles.fullWidth,
          styles.destructive,
          { height, borderRadius: 14, opacity: isDisabled ? 0.5 : 1 },
        ]}
      >
        <View style={styles.row}>
          {icon && <View style={styles.iconLeft}>{icon}</View>}
          <Text style={[styles.labelPrimary, { fontSize }]}>{label}</Text>
          {iconRight && <View style={styles.iconRight}>{iconRight}</View>}
        </View>
      </TouchableOpacity>
    );
  }

  return null;
};

const styles = StyleSheet.create({
  wrapper: {
    alignSelf: 'center',
  },
  fullWidth: {
    width: '100%',
  },
  gradient: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  ghost: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  outline: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
    borderWidth: 1.5,
    borderColor: Colors.teal,
  },
  destructive: {
    backgroundColor: Colors.error,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  iconLeft: {
    marginRight: 2,
  },
  iconRight: {
    marginLeft: 2,
  },
  labelPrimary: {
    fontFamily: 'Inter_600SemiBold',
    color: Colors.white,
    letterSpacing: 0.2,
  },
  labelGhost: {
    fontFamily: 'Inter_600SemiBold',
    color: Colors.teal,
    letterSpacing: 0.2,
  },
  labelOutline: {
    fontFamily: 'Inter_600SemiBold',
    color: Colors.teal,
    letterSpacing: 0.2,
  },
});
