import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import ScreenWrapper from '../../components/ScreenWrapper'

const Bookingscreen = () => {
  return (
    <View style={{ flex: 1, backgroundColor: '#000' }}>
      <ScreenWrapper
        imageSource={require('../../assets/bookbg2.png')}
        backgroundColor="#000"
      >
      <Text style={{color: '#FFF', textAlign:'center'}}>Booking Screen</Text>

      </ScreenWrapper>
    </View>
  )
}

export default Bookingscreen

const styles = StyleSheet.create({})