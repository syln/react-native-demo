import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { StackNavigator } from 'react-navigation';

export default class ListView extends React.Component {
 static navigationOptions = {
   title:'列表页'
 }
 render(){
   let arr = [];
   for(let i = 0;i<=20;i++){
     arr.push(i);
   }
   return (
     <ScrollView contentContainerStyle = { styles.scrollWrap } >
      <View style={styles.col}>
        {
          arr.map((item,index) => {
            return (
              <Text key={index}>
                item {index}
              </Text>
            )
          })
        }
      </View>
    </ScrollView>
   )
 }
}

const styles = StyleSheet.create({
    scrollWrap:{
      height:'auto'
    },
    col:{
      padding:20,
      backgroundColor:'#fff'
    }
});