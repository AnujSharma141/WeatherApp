import React from "react";
import { useEffect ,useState } from "react";
import {Dimensions, StyleSheet, Text, View, Image, ActivityIndicator ,} from "react-native";
import * as Font from 'expo-font';
import {AppLoading} from 'expo'



export default function Main(props) {
  const [load , setLoad] = useState(false)

  useEffect(()=>{    
    Font.loadAsync({
      'Stan' : require('../assets/fonts/ProductSansRegular.ttf')
    })
    setLoad(Font.isLoaded('Stan'))
  },[])  

  if(!load){
    return(
    <ActivityIndicator size={40} color='#000' />
    )
  }
  else{
    return(
        <View style={styles.main}>
        <View style={styles.location}>
          <Image source={{ width: 16, height: 16, uri: props.marker }} />
          <Text style={[styles.marker, {fontFamily:'Stan'}]}>{props.place}</Text>
        </View>
       <Text style={[styles.temperature , {fontFamily:'Stan'}]}>{props.temp}</Text> 
        <Text style={[styles.tag, {fontFamily:'Stan'}]}>{props.name}</Text>
       <Image style={{ position: "absolute", top: 190, zIndex: 2 }}  source={{ width: Dimensions.get('screen').width * 0.74, height: Dimensions.get('screen').height * 0.26, uri: props.icon }}/>
      </View>
  
)}}
const styles = StyleSheet.create({
    main: {
        position: "absolute",
        top: Dimensions.get('window').height * 0.19,
        width: 300,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      },
      location: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fff",

      },
      marker: {
        textAlign: "center",
        color: "#000",
        marginTop: 0,
        marginLeft: 6,
        fontSize: 17,
      },
      temperature: {
        fontSize: 60,
        textAlign: "center",
        margin: 10,
        color: "#000",
        zIndex: 2,
      },
      tag: {
        textAlign: "center",
        color: "#000",
        marginTop: 4,
        fontSize: 23,
      },
  });
  