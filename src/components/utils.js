//사용자 정보와 엑세스 토큰을 불러오는 함수
import AsyncStorage from '@react-native-async-storage/async-storage';

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