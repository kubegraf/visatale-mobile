import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { Colors } from '../../constants/colors';
import { FontSizes } from '../../constants/typography';
import {
  HomeIcon,
  FlightIcon,
  TrackIcon,
  MessagesIcon,
  ProfileIcon,
} from './Icons';

type IconComponent = ({ size, color }: { size?: number; color?: string }) => React.ReactElement;

const TAB_ICON_MAP: Record<string, IconComponent> = {
  Home: HomeIcon,
  Apply: FlightIcon,
  Track: TrackIcon,
  Messages: MessagesIcon,
  Profile: ProfileIcon,
};

export const TabBar: React.FC<BottomTabBarProps> = ({
  state,
  descriptors,
  navigation,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.bar}>
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const label =
            typeof options.tabBarLabel === 'string'
              ? options.tabBarLabel
              : options.title || route.name;
          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });
            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          const IconComponent = TAB_ICON_MAP[route.name];
          const iconColor = isFocused ? Colors.teal : Colors.muted;

          return (
            <TouchableOpacity
              key={route.key}
              onPress={onPress}
              activeOpacity={0.7}
              style={styles.tab}
            >
              <View
                style={[
                  styles.iconWrap,
                  isFocused && styles.iconWrapActive,
                ]}
              >
                {IconComponent ? (
                  <IconComponent size={22} color={iconColor} />
                ) : (
                  <View style={[styles.fallbackDot, { backgroundColor: iconColor }]} />
                )}
              </View>
              <Text
                style={[
                  styles.tabLabel,
                  isFocused ? styles.tabLabelActive : styles.tabLabelInactive,
                ]}
              >
                {label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
  bar: {
    flexDirection: 'row',
    paddingTop: 8,
    paddingBottom: 8,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    gap: 3,
  },
  iconWrap: {
    width: 40,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
  },
  iconWrapActive: {
    backgroundColor: Colors.surface,
  },
  fallbackDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  tabLabel: {
    fontSize: FontSizes.xs,
  },
  tabLabelActive: {
    fontFamily: 'Inter_600SemiBold',
    color: Colors.teal,
  },
  tabLabelInactive: {
    fontFamily: 'Inter_400Regular',
    color: Colors.muted,
  },
});
