import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  TextInputProps,
} from 'react-native';
import Svg, { Path, Circle } from 'react-native-svg';
import { Colors } from '../../constants/colors';
import { FontSizes } from '../../constants/typography';

function EyeIcon({ off = false }: { off?: boolean }) {
  return (
    <Svg width={20} height={20} viewBox="0 0 24 24" fill="none">
      {off ? (
        <>
          <Path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" stroke={Colors.muted} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
          <Path d="M1 1l22 22" stroke={Colors.muted} strokeWidth="1.8" strokeLinecap="round"/>
        </>
      ) : (
        <>
          <Path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" stroke={Colors.muted} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
          <Circle cx="12" cy="12" r="3" stroke={Colors.muted} strokeWidth="1.8"/>
        </>
      )}
    </Svg>
  );
}

interface FieldProps extends TextInputProps {
  label?: string;
  icon?: React.ReactNode;
  iconRight?: React.ReactNode;
  error?: string;
  hint?: string;
  isPassword?: boolean;
  onIconRightPress?: () => void;
}

export const Field: React.FC<FieldProps> = ({
  label,
  icon,
  iconRight,
  error,
  hint,
  isPassword = false,
  onIconRightPress,
  ...inputProps
}) => {
  const [focused, setFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const borderColor = error
    ? Colors.error
    : focused
    ? Colors.teal
    : Colors.border;

  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      <View style={[styles.inputWrap, { borderColor }]}>
        {icon && <View style={styles.iconLeft}>{icon}</View>}
        <TextInput
          style={[styles.input, icon ? styles.inputWithIcon : null]}
          placeholderTextColor={Colors.muted}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          secureTextEntry={isPassword && !showPassword}
          {...inputProps}
        />
        {isPassword ? (
          <TouchableOpacity
            style={styles.iconRight}
            onPress={() => setShowPassword(!showPassword)}
            activeOpacity={0.7}
          >
          <EyeIcon off={showPassword} />
          </TouchableOpacity>
        ) : iconRight ? (
          <TouchableOpacity
            style={styles.iconRight}
            onPress={onIconRightPress}
            activeOpacity={0.7}
          >
            {iconRight}
          </TouchableOpacity>
        ) : null}
      </View>
      {error ? (
        <Text style={styles.error}>{error}</Text>
      ) : hint ? (
        <Text style={styles.hint}>{hint}</Text>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    fontSize: FontSizes.sm,
    fontFamily: 'Inter_500Medium',
    color: Colors.slate,
    marginBottom: 6,
  },
  inputWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 52,
    borderWidth: 1.5,
    borderRadius: 12,
    backgroundColor: Colors.white,
    paddingHorizontal: 14,
  },
  iconLeft: {
    marginRight: 10,
  },
  iconRight: {
    marginLeft: 10,
  },
  input: {
    flex: 1,
    fontSize: FontSizes.base,
    fontFamily: 'Inter_400Regular',
    color: Colors.ink,
    height: '100%',
  },
  inputWithIcon: {
    paddingLeft: 0,
  },
  error: {
    fontSize: FontSizes.xs,
    fontFamily: 'Inter_400Regular',
    color: Colors.error,
    marginTop: 4,
  },
  hint: {
    fontSize: FontSizes.xs,
    fontFamily: 'Inter_400Regular',
    color: Colors.muted,
    marginTop: 4,
  },
});
