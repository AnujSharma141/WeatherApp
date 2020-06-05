import React from "react";
import { useEffect ,useState } from 'react'
import {Dimensions ,StyleSheet, Text, View, TouchableWithoutFeedback, } from "react-native";

import {LineChart} from "react-native-chart-kit";
import {MaterialCommunityIcons} from '@expo/vector-icons'
import * as Font from 'expo-font'


export default function Main(props) {
  const cors = [24, 19, 38, 31, 23]
  useEffect(()=>{
    Font.loadAsync({
      'Mont': require('../assets/fonts/ProductSansRegular.ttf'),
    })
  },[])
  
  console.log(props.cors)

    return(
    <View style={styles.details}>
      {props.load !== null ? 
        <>
        
        <TouchableWithoutFeedback onPress={() => props.down()}>
          <View style={styles.gestureControl}>
            <View style={styles.detailSwipe}></View>
          </View>
        </TouchableWithoutFeedback>

        <MaterialCommunityIcons style={{position:'absolute' , top: 60}} name={props.icon} size={40} />

        <Text style={[styles.detailMain ,{fontFamily:'Mont'}]}>{props.name}</Text>
        <View style={styles.detailGraph}>
        
        <LineChart data={{ labels: ["00:00", "06:00", "12:00", "18:00", "24:00"], datasets: [{data: props.cors}] }}
          width={Dimensions.get('screen').width*0.73} height={160}  yAxisSuffix=" C" yAxisInterval={1} // optional, defaults to 1

          chartConfig={{
            backgroundColor: "#fff", backgroundGradientFrom: "#fff", backgroundGradientTo: "#fff", strokeWidth: "2", decimalPlaces: 1, 
            color: (opacity = 1) => `rgba(51, 161, 255, ${opacity})`, labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            style: { borderRadius: 10 }, propsForDots: {r: "3.75",} }}

          bezier withShadow={false} style={{borderRadius: 46}}/>

         </View>

         <Text style={[styles.detailConst ,  ,{fontFamily:'Mont'}]}> TODAY </Text>
        </> : null }
    </View>

)}
const styles = StyleSheet.create({
    details:{
        borderRadius: 40,
        zIndex: 5,
        backgroundColor: "#f0f0f0",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: 500,
      },
      gestureControl:{
        position: "absolute",
        top: 18,
        borderRadius: 40,
        zIndex: 2,
        display:"flex",
        justifyContent: "center",
        alignItems: "center",
        width: "25%",
        height: 17,
      },
      detailSwipe:{
        position: "absolute",
        top: 6,
        borderRadius: 40,
        zIndex: 2,
        backgroundColor: "#6e6e6e",
        justifyContent: "center",
        alignItems: "center",
        width: 65,
        height: 5,
      },
      detailIcon:{
        zIndex: 2,
        position: "absolute",
        top: 65,
        width: 30,
        height: 30,
      },
      detailMain:{
        zIndex: 2,
        position: "absolute",
        top: 115,
        fontSize:19,
        width: 60,
        textAlign:'center',
        height: 30,
      },
      detailGraph:{
        position: "absolute",
        top: 170,
        borderRadius: 40,
        zIndex: 2,
        backgroundColor: "#fff",
        justifyContent: "center",
        alignItems: "center",
        width: "85%",
        height: 195,
      },
      detailConst:{zIndex: 2, 
        position: "absolute", 
        top: 405, 
        fontSize: 29 , 
        width:120,
        textAlign:'center' 
      },
  });
  