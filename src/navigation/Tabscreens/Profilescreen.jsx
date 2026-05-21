import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import ScreenWrapper from '../../components/ScreenWrapper'

const Profilescreen = () => {
  return (
    <View style={{ flex: 1, backgroundColor: '#000' }}>
      <ScreenWrapper
        imageSource={require('../../assets/profilebg.png')}
        backgroundColor="#000"
      >
      <Text style={{color: '#FFF', textAlign:'center'}}>Profile Screen</Text>

      </ScreenWrapper>
    </View>
  )
}

export default Profilescreen

const styles = StyleSheet.create({})