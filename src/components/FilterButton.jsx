import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { useTheme } from '../theme';

const { width } = Dimensions.get('window');
const GAP = 6;
const PADDING = 10;
const BUTTON_WIDTH = (width - PADDING * 3 - GAP * 3) / 4;

const FilterButton = ({ items }) => {
  const { colors: theme } = useTheme();
  const [selectedId, setSelectedId] = useState(null);

  const selectFilter = (id) => setSelectedId((cur) => (cur === id ? null : id));

  const colors = {
    background: 'transparent',
    border: '#ccc',
    text: '#fff',
    green: theme.primary,
    greenText: '#fff',
  };

  return (
    <View style={styles.container}>
      {items.map((item) => {
        const isActive = selectedId === item.id;

        return (
          <TouchableOpacity
            key={item.id}
            activeOpacity={0.66}
            onPress={() => selectFilter(item.id)}
            style={[
              styles.button,
              {
                backgroundColor: isActive ? colors.green : colors.background,
                borderColor: isActive ? colors.green : colors.border,
              },
            ]}
          >
            <Text
              style={[
                styles.buttonText,
                { color: isActive ? 'white' : colors.text },
              ]}
            >
              {item.name}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    // paddingHorizontal: PADDING,
    marginVertical: 15,
    gap: GAP,
  },
  button: {
    width: BUTTON_WIDTH,
    height: 33,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 4,
    borderWidth: 1,
  },
  buttonText: {
    fontSize: 12,
    fontWeight: '600',
  },
});

export default FilterButton;
