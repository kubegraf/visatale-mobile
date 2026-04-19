import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  TextInputProps,
} from 'react-native';
import { Colors } from '../../constants/colors';
import { FontSizes } from '../../constants/typography';

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
            <Text style={styles.eyeIcon}>{showPassword ? '🙈' : '👁'}</Text>
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
  eyeIcon: {
    fontSize: 16,
  },
});
