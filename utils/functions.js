import { setGym, setSpraywalls } from "../redux/actions";
import { request } from "../api/requestMethods";

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
