// components/VideoCard.js
import React, { useState } from "react";
import { Image, Text, StyleSheet } from "react-native";
import Focusable from "../Focusable";

export default function VideoCard({ item, onPress, autoFocus }) {
  const [focused, setFocused] = useState(false);

  return (
    <Focusable
      hasTVPreferredFocus={autoFocus}
      onPress={() => onPress(item)}
      style={[styles.card, focused && styles.focused]}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
    >
      <Image source={{ uri: item.thumbnail }} style={styles.thumb} />
      <Text style={styles.title} numberOfLines={2}>
        {item.title}
      </Text>
    </Focusable>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 220,
    height: 170,
    backgroundColor: "#222",
    borderRadius: 10,
    margin: 12,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  focused: {
    backgroundColor: "#1E88E5",
    transform: [{ scale: 1.06 }],
    elevation: 6,
  },
  thumb: {
    width: "100%",
    height: 110,
  },
  title: {
    color: "#fff",
    fontSize: 15,
    paddingHorizontal: 8,
    paddingTop: 6,
    textAlign: "center",
  },
});
