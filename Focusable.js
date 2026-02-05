// // Focusable.js
// import React, { useState } from 'react';
// import { TouchableOpacity } from 'react-native';

// export const Focusable = ({ 
//   children, 
//   onPress, 
//   style, 
//   focusedStyle, 
//   ...props 
// }) => {
//   const [focused, setFocused] = useState(false);

//   return (
//     <TouchableOpacity
//       onPress={onPress}
//       style={[style, focused && focusedStyle]}
//       onFocus={() => setFocused(true)}
//       onBlur={() => setFocused(false)}
//       activeOpacity={1}
//       {...props}
//     >
//       {children}
//     </TouchableOpacity>
//   );
// };




// import React, { useState } from 'react';
// import { TouchableOpacity, View, Platform } from 'react-native';

// export const Focusable = ({
//   children,
//   onPress,
//   style,
//   focusedStyle,
//   hasTVPreferredFocus = false,
//   ...props
// }) => {
//   const [focused, setFocused] = useState(false);
//   const runningOnTV = Platform.isTV;

//   return (
//     <TouchableOpacity
//       onPress={onPress}
//       focusable={runningOnTV}
//       hasTVPreferredFocus={hasTVPreferredFocus}
//       onFocus={() => setFocused(true)}
//       onBlur={() => setFocused(false)}
//       activeOpacity={1}
//       {...props}
//     >
//       <View style={[style, focused && focusedStyle]}>{children}</View>
//     </TouchableOpacity>
//   );
// };




// Focusable.js
import React, { useState } from "react";
import { Pressable, Animated, StyleSheet } from "react-native";

export default function Focusable({
  children,
  onPress,
  style,
  focusedStyle,
  hasTVPreferredFocus,
}) {
  const [focused, setFocused] = useState(false);
  const scale = React.useRef(new Animated.Value(1)).current;

  React.useEffect(() => {
    Animated.spring(scale, {
      toValue: focused ? 1.05 : 1,
      useNativeDriver: true,
    }).start();
  }, [focused]);

  return (
    <Animated.View style={{ transform: [{ scale }] }}>
      <Pressable
        hasTVPreferredFocus={hasTVPreferredFocus}
        onPress={onPress}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={[
          styles.base,
          style,
          focused && [styles.focused, focusedStyle],
        ]}
      >
        {children}
      </Pressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  base: {
    padding: 8,
    borderRadius: 8,
  },
  focused: {
    backgroundColor: "#2196F3",
  },
});
