import axios from "axios";
import { defaultUserIcon } from "../assets/icons";

const apiUrl = process.env.REACT_APP_BACKEND_URL;

const getUserDetail = async () => {
  console.log("Get User details");
  try {
    const authToken = localStorage.getItem("authToken");
    const response = await axios.get(`${apiUrl}api/v1/dj-rest-auth/user/`, {
      headers: {
        Authorization: `Token ${authToken}`,
      },
    });

    const {
      pk,
      email,
      first_name,
      last_name,
      pin,
      user_tag,
      avatar,
      settings,
    } = response.data;

    return {
      pk,
      email,
      name: first_name,
      lastName: last_name,
      pin,
      avatar: `${avatar === null ? defaultUserIcon : avatar}`,
      userTag: user_tag,
      settings,
    };
  } catch (error) {
    throw new Error(error.message);
  }
};

export default getUserDetail;
