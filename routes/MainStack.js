import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import SplashScreen from "../screens/SplashScreen";
import LoginScreen from "../screens/LoginScreen";
import SignupScreen from "../screens/SignupScreen";
import GuestScreen from "../screens/GuestScreen";
import DashboardScreen from "../screens/DashboardScreen";
import ProfileScreen from "../screens/ProfileScreen";
import AddNewScreen from "../screens/AddNewCase";
import UpcomingDates from "../screens/UpcomingDates";
import AllCases from "../screens/AllCases";
import CalendarView from "../screens/CalendarView";
import ClientList from "../screens/ClientList";
import CourtList from "../screens/CourtList";
import CaseView from "../screens/CaseView";

const Stack = createNativeStackNavigator();

const MainStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Splash"
          component={SplashScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Signup"
          component={SignupScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Guest"
          component={GuestScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Dashboard"
          component={DashboardScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Profile"
          component={ProfileScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="AddNew"
          component={AddNewScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="UpcomingDates"
          component={UpcomingDates}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="AllCases"
          component={AllCases}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="CalendarView"
          component={CalendarView}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ClientList"
          component={ClientList}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="CourtList"
          component={CourtList}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="CaseView"
          component={CaseView}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainStack;
