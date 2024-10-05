import { Linking } from "react-native";

export const handleExpoPress = () => {
  const url = "https://expo.io/privacy";

  Linking.openURL(url).catch((err) => console.error("An error occurred", err));
};

export const handlePrivacyPolicyTemplatePress = () => {
  const url = "https://privacypolicytemplate.net";

  Linking.openURL(url).catch((err) => console.error("An error occurred", err));
};

export const handlePrivacyPolicyGeneratorPress = () => {
  const url = "https://app-privacy-policy-generator.nisrulz.com";

  Linking.openURL(url).catch((err) => console.error("An error occurred", err));
};
