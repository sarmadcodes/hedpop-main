import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Ionicons from '@react-native-vector-icons/ionicons';
import { useTheme, useThemedStyles } from '../theme';

const BackBar = ({ title, rightElement }) => {
  const navigation = useNavigation();
  const { colors } = useTheme();
  const styles = useThemedStyles(makeStyles);

  return (
    <View style={styles.row}>
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => navigation.goBack()}
        style={styles.btn}
        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
      >
        <Ionicons name="arrow-back" size={22} color={colors.textInverse} />
      </TouchableOpacity>

      {!!title && <Text style={styles.title} numberOfLines={1}>{title}</Text>}

      <View style={styles.right}>{rightElement}</View>
    </View>
  );
};

export default BackBar;

const makeStyles = (colors) => ({
  row: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
    paddingTop: 6,
    paddingBottom: 12,
  },
  btn: {
    backgroundColor: '#fff',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: colors.border,
    borderWidth: 1,
  },
  title: {
    flex: 1,
    fontFamily: 'serif',
    fontSize: 22,
    fontWeight: '600',
    color: colors.text,
  },
  right: {
    minWidth: 40,
    alignItems: 'flex-end',
  },
});
