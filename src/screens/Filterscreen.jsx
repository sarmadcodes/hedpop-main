import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Ionicons from '@react-native-vector-icons/ionicons';

import ScreenWrapper from '../components/ScreenWrapper';
import FilterButton from '../components/FilterButton';
import MyButton from '../components/MyButton';
import { FILTER_OPTIONS } from '../data/salons';
import { ROUTES } from '../constants/routes';
import { useTheme, useThemedStyles } from '../theme';

const Filterscreen = ({ navigation }) => {
  const { colors } = useTheme();
  const styles = useThemedStyles(makeStyles);
  const [searchQuery, setSearchQuery] = useState('');

  const clearAll = () => setSearchQuery('');
  const apply = () => navigation.navigate(ROUTES.TABS, { screen: ROUTES.TAB_SEARCH });

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <ScreenWrapper imageSource={require('../assets/filterbg.png')} backgroundColor={colors.background}>
        <View style={styles.searchContainer}>
          <View style={styles.searchBar}>
            <Ionicons name="search" size={20} color="#ccc" style={{ marginLeft: 15 }} />
            <TextInput
              placeholder="Search barbers, salons..."
              placeholderTextColor="#999"
              style={styles.input}
              value={searchQuery}
              onChangeText={setSearchQuery}
              autoFocus
            />
            {searchQuery.length > 0 && (
              <TouchableOpacity onPress={() => setSearchQuery('')}>
                <Ionicons name="close-circle" size={20} color="#555" style={{ marginRight: 15 }} />
              </TouchableOpacity>
            )}
          </View>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => navigation.goBack()}
            style={styles.filterBtn}
          >
            <Ionicons name="close" size={20} color="#000" />
          </TouchableOpacity>
        </View>

        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 80 }}>
          <Text style={styles.title}>Category</Text>
          <FilterButton items={FILTER_OPTIONS.category} />
          <Text style={styles.title}>Location</Text>
          <FilterButton items={FILTER_OPTIONS.location} />
          <Text style={styles.title}>Price Range</Text>
          <FilterButton items={FILTER_OPTIONS.price} />
          <Text style={styles.title}>Minimum Rating</Text>
          <FilterButton items={FILTER_OPTIONS.rating} />

          <View style={styles.actions}>
            <MyButton title="Clear Filters" bgColor={colors.accent} textColor="#fff" onPress={clearAll} />
            <MyButton title="Show Results" textColor="#fff" borWidth={1} borderColor={colors.border} onPress={apply} />
          </View>
        </ScrollView>
      </ScreenWrapper>
    </View>
  );
};

export default Filterscreen;

const makeStyles = (colors) => ({
  title: { color: colors.text, fontSize: 18, fontWeight: '600', marginVertical: 10 },
  searchContainer: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginVertical: 10 },
  searchBar: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', borderRadius: 10, height: 40, width: '85%' },
  input: { flex: 1, color: '#222', fontSize: 14, paddingHorizontal: 10 },
  filterBtn: {
    width: 40, height: 40, backgroundColor: colors.primary, borderRadius: 20,
    alignItems: 'center', justifyContent: 'center',
  },
  actions: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 20, gap: 10 },
});
