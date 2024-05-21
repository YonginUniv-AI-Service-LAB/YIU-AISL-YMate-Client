//사용자 정보와 엑세스 토큰을 불러오는 함수
import AsyncStorage from '@react-native-async-storage/async-storage';

import axios from 'axios';

export const getUserInfo = async () => {
  try {
    const userString = await AsyncStorage.getItem('user');
    if (userString !== null) {
      const user = JSON.parse(userString);
      return user;
    } 
  } catch (error) {
  
  }
};

export const getAccessTokenInfo = async () => {
  try {
    const accessToken = await AsyncStorage.getItem('accessToken');
    if (accessToken !== null) {
      return accessToken;
    } 
  } catch (error) {
    
  }
};

export const getRefreshTokenInfo = async () => {
  try {
    const refreshToken = await AsyncStorage.getItem('refreshToken');
    if (refreshToken !== null) {
      return refreshToken;
    } 
  } catch (error) {
    
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
          if (refreshResponse.status !== 200) {
            await AsyncStorage.removeItem('user');
            await AsyncStorage.removeItem('accessToken');
            await AsyncStorage.removeItem('refreshToken');
            reject('Session expired. Please login again.');
          }
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
