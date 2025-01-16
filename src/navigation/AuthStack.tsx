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

export type AuthStackParamList = {
  Login: undefined;
  Signup: undefined;
  PrivacyPolicy: undefined;
  TermsAndConditions: undefined;
};

const AuthStack = createNativeStackNavigator<AuthStackParamList>();

const AuthNavigator = () => (
  <AuthStack.Navigator initialRouteName="Login">
    <AuthStack.Group screenOptions={{ headerShown: false }}>
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
