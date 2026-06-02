import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import ScreenWrapper from '../components/ScreenWrapper';
import FilterButton from '../components/FilterButton';
import MyButton from '../components/MyButton';
import Ionicons from '@react-native-vector-icons/ionicons';

const Filterscreen = ({ navigation }) => {
    const [searchQuery, setSearchQuery] = useState('');
  return (
    <View style={{ flex: 1, backgroundColor: '#000' }}>
      <ScreenWrapper
        imageSource={require('../assets/filterbg.png')}
        backgroundColor="#000"
      >
        {/* Search Bar Section */}
      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Ionicons name="search" size={20} color="#ccc" style={{ marginLeft: 15 }} />
          <TextInput
            placeholder="Search barbers, salons..."
            placeholderTextColor="#ccc"
            style={styles.input}
            value={searchQuery}
            onChangeText={setSearchQuery}
            autoFocus={true}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery('')}>
              <Ionicons name="close-circle" size={20} color="#555" style={{ marginRight: 15 }} />
            </TouchableOpacity>
          )}
        </View>
        <TouchableOpacity activeOpacity={0.66} onPress={() => navigation.navigate('Filterscreen')}
        style={{width: 40, height: 40, padding: 10, backgroundColor: '#F1BA0D', borderRadius: 50, alignItems: 'center', justifyContent: 'center'}}>
          <Ionicons name="filter" size={20} color={'#000'} />
        </TouchableOpacity>
      </View>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{ paddingBottom: '40%' }}>
            <Text style={styles.filtertitle}>Category</Text>
            <FilterButton
              items={[
                { id: 1, name: 'Barbers' },
                { id: 2, name: 'Salons' },
              ]}
            />
            <Text style={styles.filtertitle}>Location</Text>
            <FilterButton
              items={[
                { id: 1, name: 'Liverpool' },
                { id: 2, name: 'Manchester' },
                { id: 3, name: 'Birmingham' },
                { id: 4, name: 'Poole' },
                { id: 5, name: 'All' },
              ]}
            />
            <Text style={styles.filtertitle}>Price Range</Text>
            <FilterButton
              items={[
                { id: 1, name: '£0 - £20' },
                { id: 2, name: '£20 - £50' },
                { id: 3, name: '£50 - £100' },
                { id: 4, name: '£100+' },
              ]}
            />
            <Text style={styles.filtertitle}>Minimum Rating</Text>
            <FilterButton
              items={[
                { id: 1, name: '3+' },
                { id: 2, name: '4+' },
                { id: 3, name: '5+' },
              ]}
            />

            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 }}>
              <MyButton title="Clear Filters" bgColor="#FFA77F" textColor="#fff" />
                <MyButton title="Show Results" textColor="#fff" borWidth={1} borderColor="#ccc"  />
            </View>

          </View>
        </ScrollView>
      </ScreenWrapper>
    </View>
  );
};

export default Filterscreen;

const styles = StyleSheet.create({
  filtertitle: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: '600',
    marginVertical: 10,
  },
   searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10, 
    height: 40, 
    width: '85%',
  },
  input: {
    flex: 1,
    color: '#222',
    fontSize: 16,
    paddingHorizontal: 10,
  },
});
