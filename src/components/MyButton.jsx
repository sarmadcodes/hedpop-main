import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator } from 'react-native';

const MyButton = ({
  title,
  bgColor = 'transparent',
  textColor = '#fff',
  borderColor,
  borWidth = 0,
  onPress,
  loading = false,
  disabled = false,
  style,
}) => {
  const isDisabled = disabled || loading;
  return (
    <TouchableOpacity
      style={[
        styles.button,
        {
          backgroundColor: bgColor,
          borderColor: borderColor || 'transparent',
          borderWidth: borWidth,
          opacity: isDisabled ? 0.55 : 1,
        },
        style,
      ]}
      onPress={onPress}
      activeOpacity={0.7}
      disabled={isDisabled}
    >
      {loading ? (
        <ActivityIndicator color={textColor} />
      ) : (
        <Text style={[styles.text, { color: textColor }]}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

export default MyButton;

const styles = StyleSheet.create({
  button: {
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: '46%',
    marginVertical: 5,
  },
  text: {
    fontSize: 15,
    fontWeight: '600',
  },
});
