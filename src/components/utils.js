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

export const callApi = async (url, method, data) => {
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
    return response;
  } catch (error) {
    if (error.response.status === 401) {
      // 토큰이 만료되었을 때의 처리
      const accessToken = await getAccessTokenInfo();
      const refreshToken = await getRefreshTokenInfo();
      const response = await axios.post(`${API_URL}/refresh`, {
        accessToken: accessToken,
        refreshToken: refreshToken 
      },{
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        withCredentials: true,
      });
      if (response.status === 401 || response.status === 500) { // 리프레시 토큰이 만료된 경우
        // 리프레시 토큰도 삭제
        await AsyncStorage.removeItem('user');
        await AsyncStorage.removeItem('accessToken');
        await AsyncStorage.removeItem('refreshToken');
        // 에러를 던져 상위에서 처리
        throw new Error('Session expired. Please login again.');
      }
      const newAccessToken = response.data.accessToken;
      await AsyncStorage.setItem('accessToken', newAccessToken);
      console.log('재발급 ㅇㅋ')
      console.log(newAccessToken);
      return callApi(url, method, data);
    } else {
      throw error;
    }
  }
};
