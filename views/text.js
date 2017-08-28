import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { StackNavigator } from 'react-navigation';

export default class TextScreen extends React.Component {
 static navigationOptions = {
   title:'Chat with Lucy'
 }
 render(){
   return (
     <View>
      <Text> this is a another page</Text>
     </View>
   )
 }
}