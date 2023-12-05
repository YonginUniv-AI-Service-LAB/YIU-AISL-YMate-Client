import React from 'react';
import { View, Pressable, Image, Text } from 'react-native';
import {styles} from "../Style"

const TabBar = ({ state, descriptors, navigation }) => {
  return (
    <View style={styles.navigationBar}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        const getIconSource = () => {
          switch (label) {
            case '홈':
              return require('../../assets/images/home_white.png');
            case '배달':
              return require('../../assets/images/restaurant_white.png');
            case '택시':
              return require('../../assets/images/taxi_white.png');
            case '내가 쓴 글':
              return require('../../assets/images/list_white.png');
            case '내 정보':
              return require('../../assets/images/user_white.png');
            default:
              return null;
          }
        };

        return (
          <Pressable
            key={index}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={{ flex: 1, alignItems: 'center' }}
          >
            <Image
              source={getIconSource()}
              style={[styles.icon30, { opacity: isFocused ? 1 : 0.7 }]}
            />
            <Text style={[styles.centerText11, styles.margintop3, styles.whiteText]}>{label}</Text>
          </Pressable>
        );
      })}
    </View>
  );
};

export default TabBar;
