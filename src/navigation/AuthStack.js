import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import {
  LoginScreen,
  SignupScreen,
  AuthLoadingScreen,
  ConfirmEmailScreen,
  ForgotPasswordScreen,
  PrivacyPolicyScreen,
  ResetPasswordScreen,
  SubmitCodeScreen,
  TermsAndConditionsScreen,
} from "../screens/auth";

const Stack = createNativeStackNavigator();

const AuthStack = () => (
  <Stack.Navigator initialRouteName="AuthLoading">
    <Stack.Group screenOptions={{ headerShown: false }}>
      <Stack.Screen name="AuthLoading" component={AuthLoadingScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />
      <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
      <Stack.Screen name="SubmitCode" component={SubmitCodeScreen} />
      <Stack.Screen name="ResetPassword" component={ResetPasswordScreen} />
      <Stack.Screen name="ConfirmEmail" component={ConfirmEmailScreen} />
      <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicyScreen} />
      <Stack.Screen
        name="TermsAndConditions"
        component={TermsAndConditionsScreen}
      />
    </Stack.Group>
  </Stack.Navigator>
);

export default AuthStack;
