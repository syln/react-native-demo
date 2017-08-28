import React from 'react';
import { 
  StyleSheet, 
  Text, 
  Modal,
  View,
  Dimensions,
  ScrollView,
  Image,
  TouchableOpacity,
  TouchableHighlight,
  AlertIOS
  } from 'react-native';
import { StackNavigator } from 'react-navigation';
import TextScreen from './views/text.js';
import ListScreen from './views/listView.js'
import Carousel from 'react-native-looped-carousel';
import {
  Grid,
  Card,
  WingBlank,
  WhiteSpace,
  Button,
  Toast
  } from 'antd-mobile';


const { width, height } = Dimensions.get('window');

const data = Array.from(new Array(9)).map((_val, i) => ({
  icon: 'https://gw.alipayobjects.com/zos/rmsportal/nywPmnTAvTmLusPxHPSu.png',
  text: `name${i}`,
}));

const Goods = [
  {
    title: '空气净化器',
    url: 'http://img.muji.com.cn/img/item/4547315820665_400.jpg'
  },
  {
    title: '棉不均匀染色开衫',
    url: 'http://img.muji.com.cn/img/item/4549738656746_400.jpg'
  },
  {
    title: '硅胶球形制冰器',
    url: 'http://img.muji.com.cn/img/item/4549738306771_400.jpg'
  },
  {
    title: '组合柜',
    url: 'http://img.muji.com.cn/img/item/4549337263215_400.jpg'
  },
  {
    title: '牛奶巧克力',
    url: 'http://img.muji.com.cn/img/item/4549738664512_400.jpg'
  },
  {
    title: '棉法兰绒被套 ',
    url: 'http://img.muji.com.cn/img/item/4549738391210_400.jpg'
  }
]


//单元格组件
class Item extends React.Component {
   render() {
     return (
       <View style={styles.item}>
         <TouchableOpacity onPress={this.props.press}>
           <Image resizeMode="contain" style={styles.img}
             source={{uri:this.props.url}}>
               <Text numberOfLines={1} style={styles.item_text}>{this.props.title}</Text>
           </Image>
         </TouchableOpacity>
       </View>
     );
   }
}
 
//列表组件
class List extends React.Component {
   render() {
     var data = this.props.goods;
     var list = [];
     for(var i in data){
       if(i % 2 === 0){
         var row = (
           <View key={i} style={styles.row}>
             <Item url={data[i].url}
               title={data[i].title}
               press={this.press.bind(this, data[i])}></Item>
             <Item
               url={data[parseInt(i)+1].url}
               title={data[parseInt(i)+1].title}
               press={this.press.bind(this,  data[parseInt(i)+1])}></Item>
           </View>);
         list.push(row);
       }
     }
 
     return (
       <ScrollView style={{marginTop:10}}>
         {list}
       </ScrollView>
     );
   }
 
   press(data) {
     alert("您选择了："+data.title);
   }
}

class mainScreen extends React.Component {
    static navigationOptions = {
      title:'Welcome'
    }
    constructor(props){
      super(props)
      this.state = {
        size: { width:width},
        modalVisible:false
      };
    }
    _onLayoutDidChange = (e) => {
      const layout = e.nativeEvent.layout;
      this.setState({ size: { width: layout.width, height: 200 } });
    }
    render() {
        const {navigate} = this.props.navigation;

        function tip(){
          const self = this;
          AlertIOS.alert('提示', '即将跳转到列表页', [
            {
              text: '取消',
              onPress: function() {
                console.log('取消按钮点击');
              }
            },
            {
              text: '确认',
              onPress: function() {
                navigate('List');  
              }
            }
          ])
        }

        return ( 
          <View style={styles.container}>
            <ScrollView contentContainerStyle = { styles.scrollWrap } >
            <View onLayout={this._onLayoutDidChange}>
              <Carousel
                delay={5000}
                style={this.state.size}
                autoplay
                pageInfo
                currentPage={2}
                onAnimateNextPage={(p) => console.log(p)}
                >
                <View style={[{ backgroundColor: '#BADA55' }, this.state.size]}><Text>1</Text></View>
                <View style={[{ backgroundColor: 'red' }, this.state.size]}><Text>2</Text></View>
                <View style={[{ backgroundColor: 'blue' }, this.state.size]}><Text>3</Text></View>
              </Carousel>
            </View>
            <View style={styles.grid}>
              <Grid data={data} columnNum={3} />
            </View>
            <View style={styles.wrap}>
              <WingBlank size="lg">
                <WhiteSpace size="lg" />
                <Card>
                  <Card.Header
                    title="This is title"
                    thumb="https://cloud.githubusercontent.com/assets/1698185/18039916/f025c090-6dd9-11e6-9d86-a4d48a1bf049.png"
                  />
                  <Card.Body>
                    <Text>This is content of `Card`</Text>
                  </Card.Body>
                  <Card.Footer content="footer content" extra={<Text>extra footer content</Text>} />
                </Card>
                <WhiteSpace size="lg" />
              </WingBlank>
            </View>
            <View style={styles.flex,{marginTop:20}}>
              <List goods={Goods}></List>
            </View>
            <WhiteSpace size="lg" />
            <Button type={'primary'} onClick={tip}> 自定义按钮 </Button>
            <Button onClick={() => navigate('Text')}>chat</Button>
            </ScrollView>
          </View>
        );
    }
}

const App = StackNavigator({
  Home:{screen:mainScreen},
  Text:{screen:TextScreen},
  List:{screen:ListScreen}
})


export default App;

const styles = StyleSheet.create({
    container: {
        height:'100%',
        backgroundColor: '#fff',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
    },
    scrollWrap:{
      height:'auto'
    },
    grid:{
      width:width
    },
    wrap:{
      width:width
    },
    flex:{
     flex:1
  },
  row:{
    flexDirection: 'row',
    marginBottom: 10,
  },
  item:{
    flex:1,
    marginLeft:5,
    borderWidth:1,
    borderColor:'#ddd',
    marginRight:5,
    height:140,
  },
  img:{
    //flex:1,
    backgroundColor: 'transparent'
  },
  item_text:{
    backgroundColor: '#000',
    opacity: 0.7,
    color:'#fff',
    height:25,
    lineHeight:18,
    textAlign:'center',
    marginTop:114
  }
});