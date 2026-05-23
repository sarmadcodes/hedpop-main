import React, { useContext } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Ionicons from '@react-native-vector-icons/ionicons';

const BackBar = ({ title }) => {
  const navigation = useNavigation();

  return (
    <View>
      <View
        style={{
          width: '100%',
          flexDirection: 'row',
          alignItems: 'center',
          //   justifyContent: 'space-between',
          gap: 15,
          paddingTop: 6,
          paddingBottom: 12,
        }}
      >
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <View
            style={{
              backgroundColor: '#FFFFFF',
              width: 40,
              height: 40,
              borderRadius: 50,
              justifyContent: 'center',
              alignItems: 'center',
              borderColor: '#ccc',
              borderWidth: 1,

              shadowColor: '#000000',
              shadowOffset: { width: 0, height: 0.5 },
              shadowOpacity: 0.18,
              shadowRadius: 1,

              elevation: 1,
            }}
          >
            <Ionicons name="arrow-back" size={22} color="transparent" />
          </View>
        </TouchableOpacity>

        <View
          style={{
            // position: 'absolute',
            // left: 0,
            // right: 0,
            // alignItems: 'center',
            // justifyContent: 'center',
            pointerEvents: 'none',
          }}
        >
          <Text
            style={{
              fontFamily: 'serif',
              fontSize: 22,
              fontWeight: '600',
              color: '#fff',
            }}
          >
            {title}
          </Text>
        </View>

        {/* <View style={{ width: 35 }} /> */}
      </View>
    </View>
  );
};

export default BackBar;
