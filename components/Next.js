import React from "react";
import { useEffect } from "react";
import {Dimensions, StyleSheet, Text, View, Image, TouchableHighlight,} from "react-native";
import * as Font from 'expo-font';
import {MaterialCommunityIcons} from '@expo/vector-icons'
import data from './data.json'

export default function Next(props) {
  const src = data[0] 
  useEffect(()=>{
    Font.loadAsync({
      'Mont': require('../assets/fonts/ProductSansRegular.ttf'),
    })
  },[])

  const time = new Date()
  const months = data[0].date

  return( 
    <View style={styles.next}>
            {props.load !== null ? 
            <>
            <View style={styles.nextTab}>
            <Text style={{fontFamily:'Mont'}}>{`${time.getDate()} ${months[time.getMonth()]}`}</Text>
              <Text style={[styles.nextDetail ,{fontFamily:'Mont'}]}>{props.name}</Text>
              <MaterialCommunityIcons name={props.icons} size={30} />
            </View>

            <View style={styles.nextTab}>
              <Text style={{fontFamily:'Mont'}}>{`${time.getDate()+1} ${months[time.getMonth()]}`}</Text>
              <Text style={[styles.nextDetail ,{fontFamily:'Mont'}]}>{props.next[0]}</Text>
              <MaterialCommunityIcons name={src.icons[props.next[0]]} size={30}/>
            </View>

            <View style={styles.nextTab}>
              <Text style={{fontFamily:'Mont'}}>{`${time.getDate()+2} ${months[time.getMonth()]}  `}</Text>
              <Text style={[styles.nextDetail ,{fontFamily:'Mont'}]}>{props.next[1]}</Text>
              <MaterialCommunityIcons name={src.icons[props.next[1]]} size={30}/>
            </View>
         
            <TouchableHighlight style={styles.upButton} underlayColor="#DDDDDD" onPress={() => props.up()}>
              <Image source={{ width: 20, height: 20, uri: "https://i.ibb.co/qgcW79P/up.png",}}/>
            </TouchableHighlight>
          </> 
          : null }
            
          </View>
)}

const styles = StyleSheet.create({
    next: {
      display: "flex",
      flexDirection: "row",
      width: "88%",
      justifyContent: "center",
      position: "absolute",
      top: Dimensions.get('screen').height * 0.73,
      borderRadius: 22,
    },
    nextTab: {
      height: 100,
      width: "30%",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-around",
      alignItems: "center",
    },
    nextDetail: {
      marginTop: -10,
      marginBottom: -5,
      fontSize: 18,
    },
    nextIcons: {
      width: 20,
      height: 20,
      backgroundColor: "transparent",
    },
    upButton: {
      position: "absolute",
      top: 130,
      zIndex: 2,
      width: 40,
      height: 40,
      borderRadius: 30,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
  });
  