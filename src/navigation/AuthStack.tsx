import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  LoginScreen,
  SignupScreen,
  ConfirmEmailScreen,
  ForgotPasswordScreen,
  PrivacyPolicyScreen,
  ResetPasswordScreen,
  SubmitCodeScreen,
  TermsAndConditionsScreen,
} from "../screens/auth";
import LoginProvidersScreen from "../screens/auth/LoginProvidersScreen";
import EmailScreen from "../screens/auth/EmailScreen";
import PasswordScreen from "../screens/auth/PasswordScreen";
import UsernameScreen from "../screens/auth/UsernameScreen";

export type AuthStackParamList = {
  Login: undefined;
  Signup: undefined;
  PrivacyPolicy: undefined;
  TermsAndConditions: undefined;
  LoginProviders: undefined;
  Email: undefined;
  Password: { isLoggingIn: boolean; email: string };
  Username: { email: string; password: string };
};

const AuthStack = createNativeStackNavigator<AuthStackParamList>();

const AuthNavigator = () => (
  <AuthStack.Navigator initialRouteName="LoginProviders">
    <AuthStack.Group screenOptions={{ headerShown: false }}>
      <AuthStack.Screen
        name="LoginProviders"
        component={LoginProvidersScreen}
      />
      <AuthStack.Screen name="Email" component={EmailScreen} />
      <AuthStack.Screen name="Password" component={PasswordScreen} />
      <AuthStack.Screen name="Username" component={UsernameScreen} />
      <AuthStack.Screen name="Login" component={LoginScreen} />
      <AuthStack.Screen name="Signup" component={SignupScreen} />
      {/* <AuthStack.Screen
        name="ForgotPassword"
        component={ForgotPasswordScreen}
      />
      <AuthStack.Screen name="SubmitCode" component={SubmitCodeScreen} />
      <AuthStack.Screen name="ResetPassword" component={ResetPasswordScreen} />
      <AuthStack.Screen name="ConfirmEmail" component={ConfirmEmailScreen} /> */}
      <AuthStack.Screen name="PrivacyPolicy" component={PrivacyPolicyScreen} />
      {/* <AuthStack.Screen
        name="TermsAndConditions"
        component={TermsAndConditionsScreen}
      /> */}
    </AuthStack.Group>
  </AuthStack.Navigator>
);

export default AuthNavigator;
