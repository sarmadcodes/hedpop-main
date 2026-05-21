import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import ScreenWrapper from '../../components/ScreenWrapper'

const Searchscreen = () => {
  return (
    <View style={{ flex: 1, backgroundColor: '#000' }}>
      <ScreenWrapper
        imageSource={require('../../assets/searchbg.png')}
        backgroundColor="#000"
      >
      <Text style={{color: '#FFF', textAlign:'center'}}>Search Screen</Text>

      </ScreenWrapper>
    </View>
  )
}

export default Searchscreen

const styles = StyleSheet.create({})