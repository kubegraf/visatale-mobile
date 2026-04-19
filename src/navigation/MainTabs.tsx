import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HomeScreen } from '../screens/home/HomeScreen';
import { ApplyStep1Screen } from '../screens/apply/ApplyStep1Screen';
import { TrackerScreen } from '../screens/tracking/TrackerScreen';
import { MessagesListScreen } from '../screens/messages/MessagesListScreen';
import { ProfileScreen } from '../screens/profile/ProfileScreen';
import { TabBar } from '../components/ui/TabBar';

export type MainTabsParams = {
  Home: undefined;
  Apply: undefined;
  Track: undefined;
  Messages: undefined;
  Profile: undefined;
};

const Tab = createBottomTabNavigator<MainTabsParams>();

export const MainTabs: React.FC = () => {
  return (
    <Tab.Navigator
      tabBar={(props) => <TabBar {...props} />}
      screenOptions={{ headerShown: false }}
      initialRouteName="Home"
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Apply" component={ApplyStep1Screen} />
      <Tab.Screen name="Track" component={TrackerScreen} />
      <Tab.Screen name="Messages" component={MessagesListScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};
