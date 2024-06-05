import { jwtDecode } from "jwt-decode";

const checkTokenExpiration = (token) => {
  try {
    const decodedToken = jwtDecode(token);
    const currentTime = Date.now() / 1000; // Current time in seconds
    return decodedToken.exp > currentTime;
  } catch (error) {
    return false;
  }
};

export default checkTokenExpiration;
