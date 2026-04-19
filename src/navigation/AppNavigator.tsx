import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { OnboardingStack } from './OnboardingStack';
import { MainTabs } from './MainTabs';

// Additional screens accessible from anywhere in the app
import { AppDetailScreen } from '../screens/tracking/AppDetailScreen';
import { DocUploadScreen } from '../screens/tracking/DocUploadScreen';
import { LiveStatusScreen } from '../screens/tracking/LiveStatusScreen';
import { StatsDashboardScreen } from '../screens/tracking/StatsDashboardScreen';
import { ConversationScreen } from '../screens/messages/ConversationScreen';
import { NotificationsScreen } from '../screens/messages/NotificationsScreen';
import { EligibilityPassScreen } from '../screens/eligibility/EligibilityPassScreen';
import { EligibilityFailScreen } from '../screens/eligibility/EligibilityFailScreen';
import { PaymentScreen } from '../screens/payment/PaymentScreen';
import { SuccessScreen } from '../screens/payment/SuccessScreen';
import { ApplyStep2Screen } from '../screens/apply/ApplyStep2Screen';
import { ApplyStep3Screen } from '../screens/apply/ApplyStep3Screen';

export type RootStackParams = {
  Onboarding: undefined;
  Main: undefined;
  AppDetail: { applicationId?: string };
  DocUpload: { applicationId?: string };
  LiveStatus: { applicationId?: string };
  StatsDashboard: undefined;
  Conversation: { specialistId?: string; name?: string };
  Notifications: undefined;
  EligibilityPass: { country?: string };
  EligibilityFail: { country?: string };
  Payment: { plan?: string };
  Success: { applicationId?: string };
  ApplyStep2: undefined;
  ApplyStep3: undefined;
};

const Stack = createNativeStackNavigator<RootStackParams>();

export const AppNavigator: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Onboarding"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Onboarding" component={OnboardingStack} />
        <Stack.Screen name="Main" component={MainTabs} />

        {/* Modal-style screens */}
        <Stack.Screen
          name="AppDetail"
          component={AppDetailScreen}
          options={{ animation: 'slide_from_right' }}
        />
        <Stack.Screen
          name="DocUpload"
          component={DocUploadScreen}
          options={{ animation: 'slide_from_bottom' }}
        />
        <Stack.Screen
          name="LiveStatus"
          component={LiveStatusScreen}
          options={{ animation: 'slide_from_right' }}
        />
        <Stack.Screen
          name="StatsDashboard"
          component={StatsDashboardScreen}
          options={{ animation: 'slide_from_right' }}
        />
        <Stack.Screen
          name="Conversation"
          component={ConversationScreen}
          options={{ animation: 'slide_from_right' }}
        />
        <Stack.Screen
          name="Notifications"
          component={NotificationsScreen}
          options={{ animation: 'slide_from_right' }}
        />
        <Stack.Screen
          name="EligibilityPass"
          component={EligibilityPassScreen}
          options={{ animation: 'slide_from_bottom', presentation: 'modal' }}
        />
        <Stack.Screen
          name="EligibilityFail"
          component={EligibilityFailScreen}
          options={{ animation: 'slide_from_bottom', presentation: 'modal' }}
        />
        <Stack.Screen
          name="Payment"
          component={PaymentScreen}
          options={{ animation: 'slide_from_right' }}
        />
        <Stack.Screen
          name="Success"
          component={SuccessScreen}
          options={{ animation: 'fade', gestureEnabled: false }}
        />
        <Stack.Screen
          name="ApplyStep2"
          component={ApplyStep2Screen}
          options={{ animation: 'slide_from_right' }}
        />
        <Stack.Screen
          name="ApplyStep3"
          component={ApplyStep3Screen}
          options={{ animation: 'slide_from_right' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
