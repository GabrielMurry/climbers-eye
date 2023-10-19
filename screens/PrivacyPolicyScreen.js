import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import React from "react";
import {
  handleExpoPress,
  handlePrivacyPolicyGeneratorPress,
  handlePrivacyPolicyTemplatePress,
} from "../utils/linksToWebPages";
import useCustomHeader from "../hooks/useCustomHeader";

const PrivacyPolicyScreen = ({ navigation }) => {
  useCustomHeader({
    navigation,
    title: "Privacy Policy",
  });

  return (
    <SafeAreaView style={{ backgroundColor: "white" }}>
      <ScrollView style={{ paddingVertical: 10, paddingHorizontal: 20 }}>
        <View style={{ gap: 10 }}>
          {/* privacy policy */}
          <Text style={{ fontWeight: "bold" }}>Privacy Policy</Text>
          <View>
            <Text>
              Gabriel Murry built the Climber's Eye app as a free and
              open-source app. This SERVICE is provided by Gabriel Murry at no
              cost and is intended for use as is.
            </Text>
            <Text>
              This page is used to inform visitors regarding my policies with
              the collection, use, and disclosure of Personal Information if
              anyone decided to use my Service.
            </Text>
            <Text>
              If you choose to use my Service, then you agree to the collection
              and use of information in relation to this policy. The Personal
              Information that I collect is used for providing and improving the
              Service. I will not use or share your information with anyone
              except as described in this Privacy Policy.
            </Text>
            <Text>
              The terms used in this Privacy Policy have the same meanings as in
              our Terms and Conditions, which are accessible at Climber's Eye
              unless otherwise defined in this Privacy Policy.
            </Text>
          </View>
          {/* information collection and use */}
          <Text style={{ fontWeight: "bold" }}>
            Information Collection and Use
          </Text>
          <View>
            <Text>
              For a better experience, while using our Service, I may require
              you to provide us with certain personally identifiable
              information, including but not limited to your chosen username and
              email address. Please note that your password is never collected
              or stored by me. The information that you provide during the
              registration process, including your username and email address,
              will be securely retained in my PostgreSQL database solely for the
              purpose of facilitating your use of the app. Your data is not
              collected by me in any other way, and I am committed to
              safeguarding your personal information.
            </Text>
            <Text>
              The app does use third-party services that may collect information
              used to identify you. Link to the privacy policy of third-party
              service providers used by the app
            </Text>
            <TouchableOpacity
              onPress={handleExpoPress}
              style={{ flexDirection: "row" }}
            >
              <Text>
                {"\t"}
                {"\u2022"}{" "}
              </Text>
              <Text style={{ color: "rgb(0, 122, 255)" }}>Expo</Text>
            </TouchableOpacity>
          </View>
          {/* log data */}
          <Text style={{ fontWeight: "bold" }}>Log Data</Text>
          <View>
            <Text>
              I want to inform you that whenever you use my Service, in a case
              of an error in the app I collect data and information (through
              third-party products) on your phone called Log Data. This Log Data
              may include information such as your device Internet Protocol
              (“IP”) address, device name, operating system version, the
              configuration of the app when utilizing my Service, the time and
              date of your use of the Service, and other statistics.
            </Text>
          </View>
          {/* cookies */}
          <Text style={{ fontWeight: "bold" }}>Cookies</Text>
          <View>
            <Text>
              Cookies are files with a small amount of data that are commonly
              used as anonymous unique identifiers. These are sent to your
              browser from the websites that you visit and are stored on your
              device's internal memory.
            </Text>
            <Text>
              This Service does not use these “cookies” explicitly. However, the
              app may use third-party code and libraries that use “cookies” to
              collect information and improve their services. You have the
              option to either accept or refuse these cookies and know when a
              cookie is being sent to your device. If you choose to refuse our
              cookies, you may not be able to use some portions of this Service.
            </Text>
          </View>
          {/* service providers */}
          <Text style={{ fontWeight: "bold" }}>Service Providers</Text>
          <View>
            <Text>
              I may employ third-party companies and individuals due to the
              following reasons:
            </Text>
            <Text>
              {"\t"}
              {"\u2022"} To facilitate our Service;
            </Text>
            <Text>
              {"\t"}
              {"\u2022"} To provide the Service on our behalf;
            </Text>
            <Text>
              {"\t"}
              {"\u2022"} To perform Service-related services; or
            </Text>
            <Text>
              {"\t"}
              {"\u2022"} To assist us in analyzing how our Service is used.
            </Text>
            <Text>
              I want to inform users of this Service that these third parties
              have access to their Personal Information. The reason is to
              perform the tasks assigned to them on our behalf. However, they
              are obligated not to disclose or use the information for any other
              purpose.
            </Text>
          </View>
          {/* security */}
          <Text style={{ fontWeight: "bold" }}>Security</Text>
          <View>
            <Text>
              I value your trust in providing us your Personal Information, thus
              we are striving to use commercially acceptable means of protecting
              it. But remember that no method of transmission over the internet,
              or method of electronic storage is 100% secure and reliable, and I
              cannot guarantee its absolute security.
            </Text>
          </View>
          {/* links to other sites */}
          <Text style={{ fontWeight: "bold" }}>Links to Other Sites</Text>
          <View>
            <Text>
              This Service may contain links to other sites. If you click on a
              third-party link, you will be directed to that site. Note that
              these external sites are not operated by me. Therefore, I strongly
              advise you to review the Privacy Policy of these websites. I have
              no control over and assume no responsibility for the content,
              privacy policies, or practices of any third-party sites or
              services.
            </Text>
          </View>
          {/* children's policy */}
          <Text style={{ fontWeight: "bold" }}>Children's Policy</Text>
          <View>
            <Text>
              These Services do not address anyone under the age of 13. I do not
              knowingly collect personally identifiable information from
              children under 13 years of age. In the case I discover that a
              child under 13 has provided me with personal information, I
              immediately delete this from our servers. If you are a parent or
              guardian and you are aware that your child has provided us with
              personal information, please contact me so that I will be able to
              do the necessary actions.
            </Text>
          </View>
          {/* changes to this privacy policy */}
          <Text style={{ fontWeight: "bold" }}>
            Changes to This Privacy Policy
          </Text>
          <View>
            <Text>
              I may update our Privacy Policy from time to time. Thus, you are
              advised to review this page periodically for any changes. I will
              notify you of any changes by posting the new Privacy Policy on
              this page.
            </Text>
            <Text>This policy is effective as of 2023-10-18</Text>
          </View>
          {/* contact us */}
          <Text style={{ fontWeight: "bold" }}>Contact Us</Text>
          <View>
            <Text>
              If you have any questions or suggestions about my Privacy Policy,
              do not hesitate to contact me at climberseyeapp@gmail.com.
            </Text>
            <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
              <Text>This privacy policy page was created at </Text>
              <TouchableOpacity onPress={handlePrivacyPolicyTemplatePress}>
                <Text style={{ color: "rgb(0, 122, 255)" }}>
                  privacypolicytemplate.net
                </Text>
              </TouchableOpacity>
              <Text> and modified/generated by </Text>
              <TouchableOpacity onPress={handlePrivacyPolicyGeneratorPress}>
                <Text style={{ color: "rgb(0, 122, 255)" }}>
                  App Privacy Policy Generator
                </Text>
              </TouchableOpacity>
            </View>
            <Text></Text>
          </View>
          <View style={{ height: 20 }} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default PrivacyPolicyScreen;
