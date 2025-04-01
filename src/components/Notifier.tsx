import React, { useEffect, useRef } from "react";
import { View, Text, StyleSheet, Animated } from "react-native";
import Colors from "@constants/colors";

type NotifierProps = {
  message: string;
  type: "success" | "error" | "info";
  onHide: () => void;
};

function Notifier({ message, type, onHide }: NotifierProps) {
  const opacity = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.timing(opacity, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();

    const timer = setTimeout(() => {
      Animated.timing(opacity, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start(() => onHide());
    }, 3000);

    return () => clearTimeout(timer);
  }, [onHide]);

  const backgroundColor = {
    success: Colors.succes,
    error: Colors.danger,
    info: Colors.grey,
  }[type];

  return (
    <Animated.View style={[styles.container, { backgroundColor, opacity }]}>
      <Text style={styles.message}>{message}</Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 40,
    left: 20,
    right: 20,
    padding: 12,
    borderRadius: 8,
    zIndex: 1000,
  },
  message: {
    color: Colors.background,
    fontSize: 14,
    textAlign: "center",
  },
});

export default Notifier;
