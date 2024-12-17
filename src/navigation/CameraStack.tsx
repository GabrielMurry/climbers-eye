import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from "@react-navigation/native-stack";
import { CameraScreen } from "../screens/camera";
import { RootStackParamList } from "../../App";

export type CameraStackParamList = {
  Camera: undefined;
};

const CameraStack = createNativeStackNavigator<CameraStackParamList>();

const CameraNavigator = () => (
  <CameraStack.Navigator initialRouteName="Camera">
    <CameraStack.Group>
      <CameraStack.Screen name="Camera" component={CameraScreen} />
    </CameraStack.Group>
  </CameraStack.Navigator>
);

export default CameraNavigator;
