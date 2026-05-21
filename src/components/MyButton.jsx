
import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const MyButton = ({
  title,
  bgColor,
  textColor,
  borderColor,
  borWidth,
  onPress,
}) => {
  return (
    <TouchableOpacity
      style={[styles.button, { backgroundColor: bgColor, borderColor: borderColor, borderWidth: borWidth }]}
      onPress={onPress}
      activeOpacity={0.66}
    >
      <Text style={[styles.text, { color: textColor }]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default MyButton;

const styles = StyleSheet.create({
  button: {
    borderWidth:1,
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: 'center',
    minWidth: '46%',
    marginVertical: 5,
  },

  text: {
    fontSize: 15,
    fontWeight: '600',
  },
});