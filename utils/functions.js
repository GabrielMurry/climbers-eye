import { setGym, setSpraywalls } from "../redux/actions";
import { request } from "../api/requestMethods";
import { Share } from "react-native";

const updateUserGymAPI = async (data, user) => {
  const response = request("put", `update_user_gym/${user}`, data);
  if (response.status !== 200) {
    console.log(response.status);
    return;
  }
};

export const updateUserGym = ({ gym, spraywalls, user, dispatch }) => {
  dispatch(setGym(gym)); // gymData does NOT contain any info about its spray walls
  dispatch(setSpraywalls(spraywalls));
  const data = { gym: gym.id };
  updateUserGymAPI(data, user);
};

// export const shareText = (boulder) => {
//   const webLink = `https://tensionclimbing.com/`;
//   Share.share({
//     message: `Check out ${boulder.name}: ${webLink}`,
//   })
//     .then((result) => {
//       if (result.action === Share.sharedAction) {
//         console.log("Shared successfully");
//       } else if (result.action === Share.dismissedAction) {
//         console.log("Sharing dismissed");
//       }
//     })
//     .catch((error) => console.log("Error sharing:", error));
// };

export const shareInfo = async (boulder) => {
  try {
    const result = await Share.share({
      message: `Check out ${boulder.name}!`,
      url: "com.gabrielmurry.Spray://", // Replace with the deep link to the photo
    });
  } catch (error) {
    console.error("Sharing failed:", error.message);
  }
};
