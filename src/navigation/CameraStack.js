import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { CameraScreen } from "../screens/camera";

const Stack = createNativeStackNavigator();

const CameraStack = () => (
  <Stack.Navigator initialRouteName="Camera">
    <Stack.Group>
      <Stack.Screen name="Camera" component={CameraScreen} />
    </Stack.Group>
  </Stack.Navigator>
);

export default CameraStack;
