//사용자 정보와 엑세스 토큰을 불러오는 함수
import AsyncStorage from '@react-native-async-storage/async-storage';

import axios from 'axios';

export const getUserInfo = async () => {
  try {
    const userString = await AsyncStorage.getItem('user');
    if (userString !== null) {
      const user = JSON.parse(userString);
      console.log('User Info:', user);
      return user;
    } else {
      console.log('User Info not found');
    }
  } catch (error) {
    console.error('Error retrieving user info:', error);
  }
};

export const getAccessTokenInfo = async () => {
  try {
    const accessToken = await AsyncStorage.getItem('accessToken');
    if (accessToken !== null) {
      console.log('AccessToken Info:', accessToken);
      return accessToken;
    } else {
      console.log('AccessToken Info not found');
    }
  } catch (error) {
    console.error('Error retrieving AccessToken info:', error);
  }
};

export const getRefreshTokenInfo = async () => {
  try {
    const refreshToken = await AsyncStorage.getItem('refreshToken');
    if (refreshToken !== null) {
      console.log('refreshToken Info:', refreshToken);
      return refreshToken;
    } else {
      console.log('refreshToken Info not found');
    }
  } catch (error) {
    console.error('Error retrieving refreshToken info:', error);
  }
};

export const callApi = (url, method, data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const accessToken = await getAccessTokenInfo();
      const response = await axios({
        url,
        method,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `Bearer ${accessToken}`,
        },
        data,
      });
      resolve(response);
    } catch (error) {
      if (error.response && (error.response.status === 401 || error.response.status === 500)) {
        const accessToken = await getAccessTokenInfo();
        const refreshToken = await getRefreshTokenInfo();
        try {
          const refreshResponse = await axios.post(`${process.env.API_URL}/refresh`, {
            accessToken: accessToken,
            refreshToken: refreshToken 
          },{
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            withCredentials: true,
          });
          console.log(refreshResponse.data.accessToken);
          console.log("맆레쉬");
          console.log(refreshResponse.status);
          if (refreshResponse.status !== 200) {
            await AsyncStorage.removeItem('user');
            await AsyncStorage.removeItem('accessToken');
            await AsyncStorage.removeItem('refreshToken');
            console.log("ㅇㅇㅇㅇㅇㅇ");
            reject('Session expired. Please login again.');
          }
          console.log("재발급");
          const newAccessToken = refreshResponse.data.accessToken;
          await AsyncStorage.setItem('accessToken', newAccessToken);
          resolve(callApi(url, method, data));
        } catch(err) {
          if(err.response && err.response.status === 401 ||err.response.status === 500) {
            reject('Session expired. Please login again.');
          } else {
            reject(err);
          }
        }
      } else {
        reject(error);
      }
    }
  });
};
