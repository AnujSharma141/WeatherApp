import React from "react";
import { useRef, useState, useEffect } from "react";

import Next from './components/Next'
import Main from './components/Main'
import Detail from './components/Detail'
import data from './components/data.json'

import {Dimensions, Animated,Easing, ActivityIndicator, StyleSheet, View, Image, TextInput, TouchableWithoutFeedback, Keyboard,TouchableHighlight, } from "react-native";
import * as Location from 'expo-location'

export default function App() {
//Animation reference
  const fadeAnim = useRef(new Animated.Value(-500)).current;
  const src = data[0] 

//Hooks 
  const [next, setNext] = useState()
  const [load, setLoad] = useState()
  const [cors, setCors] = useState()
  const [marker, setMarker] = useState() 
  const [text, setText] = useState()
  const [temp, setTemp] = useState('Tuna')
  const [place, setPlace] = useState(null)
  const [name, setName] = useState('Weather App')
  const [icon, setIcon] = useState()
  const [vector, setVector] = useState()

  let time = new Date()
//Location Access
  const loc = async () => {
    let {status} = await Location.requestPermissionsAsync();
    const locat = await Location.getCurrentPositionAsync({});
    console.log(locat)
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${locat.coords.latitude}&lon=${locat.coords.longitude}&appid=API KEY HERE`)
      .then(setLoad(0))
      .then((data) => data.json())
      .then((res) => {
        if(res.cod === 200){setLoad(0)
        setMarker('https://i.ibb.co/8NtqRZw/baseline-room-black-18dp.png')
        setPlace(`${res.name}, ${res.sys.country}`)
        setTemp(`${Math.round(res.main.temp - 273.0, 1)} C`)
        setName(res.weather[0].main)
        setIcon(src.vector[res.weather[0].main])
        setVector(src.icons[res.weather[0].main])
        fetch(`http://api.openweathermap.org/data/2.5/forecast?q=${res.name}&appid=API KEY HERE`).then(data => data.json())
        .then(dat => {
          let ros = []
          let i;
          for(i=0; i<5; i++){
            ros.push(Math.round(dat.list[i].main.temp-273,1))}
            let a=[] , b=[] ,c=[]
            let filter = dat.list.map(item =>{
                if(item.dt_txt.slice(9,10) == time.getDate()+1){
                    a.push(item.weather[0].main)
                }
                if(item.dt_txt.slice(9,10) == time.getDate()+3){
                    b.push(item.weather[0].main)
                }
            })
            const max = data =>{
                let mf = 1, m = 0, item;
                for (let i=0; i<data.length; i++){
                for (let j=i; j<data.length; j++){
                if (data[i] == data[j])m++
                if (mf<m){mf=m 
                item = a[i]}}
                m=0}
                return item}
                c.push(max(a),max(b))
          setNext(c)  
          setCors(ros)
          setLoad(2)
        })
        }
      })
  }
  useEffect(()=>{loc()},[])
  
//Weather Map API 
  const call = (inp) => {
    setText('')
    Keyboard.dismiss()
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${inp}&appid=API KEY HERE`)
      .then(setLoad(0))
      .then((data) => data.json())
      .then((res) => {
        if(res.cod === 200){setLoad(0)
        setMarker('https://i.ibb.co/8NtqRZw/baseline-room-black-18dp.png')
        setPlace(`${res.name}, ${res.sys.country}`)
        setTemp(`${Math.round(res.main.temp - 273.0, 1)} C`)
        setName(res.weather[0].main)
        setIcon(src.vector[res.weather[0].main])
        setVector(src.icons[res.weather[0].main])
        fetch(`http://api.openweathermap.org/data/2.5/forecast?q=${res.name}&appid=API KEY HERE`).then(data => data.json())
        .then(dat => {
          let ros = []
          let i;
          for(i=0; i<5; i++){
            ros.push(Math.round(dat.list[i].main.temp-273,1))}
            let a=[] , b=[] ,c=[]
            let filter = dat.list.map(item =>{
                if(item.dt_txt.slice(9,10) == time.getDate()+1){
                    a.push(item.weather[0].main)
                }
                if(item.dt_txt.slice(9,10) == time.getDate()+3){
                    b.push(item.weather[0].main)
                }
            })
            const max = data =>{
                let mf = 1, m = 0, item;
                for (let i=0; i<data.length; i++){
                for (let j=i; j<data.length; j++){
                if (data[i] == data[j])m++
                if (mf<m){mf=m 
                item = a[i]}}
                m=0}
                return item}
                c.push(max(a),max(b))
          setNext(c)
          setCors(ros)
          setLoad(2)
        })
        }
        else{
          setMarker(null)
          setPlace(null)
          setTemp(null)
          setName('Not Found')  
          setIcon(src.vector['error'])
          setLoad(2)
        }
      })
  }

//Swipe Gestures  
  const up = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 400,
      easing: Easing.elastic(1)
    }).start()}
  const down = () => {
    Keyboard.dismiss()
    Animated.timing(fadeAnim, {
      toValue: -500,
      duration: 400,
      easing: Easing.elastic(1)  
    }).start()}

  return (
    <>
      <TouchableWithoutFeedback onPress={() => down()}>
        <View style={styles.container}>
          
          <View style={styles.search}>
            <TextInput placeholderTextColor="#2b2b2b" placeholder="Enter a city name" style={styles.inp} onChangeText={(text) => setText(text)} defaultValue={text} />
            <TouchableHighlight style={styles.searchIcon} underlayColor="#DDDDDD" onPress={() => call(text)}>
              <Image source={{width: 25, height: 25, uri:"https://www.searchpng.com/wp-content/uploads/2019/02/search-Icon-png-1024x1024.png",}}/>
            </TouchableHighlight>
          </View>

          {load === 0 ? <ActivityIndicator size={40} color='#000' />: 
          <>
          <Main place={place} temp={temp} name={name} icon={icon} marker={marker} />
          <Next load={place} up={up} icons={vector} name={name} next ={next} />
          </>}  

        </View>
      </TouchableWithoutFeedback>

      <Animated.View style ={{zIndex:3, width:'100%', position:'absolute', bottom: fadeAnim,}}>
      {load === 0 ? null: <Detail down={down} cors={cors} load={place} icon={vector} name={name}/>}
      </Animated.View>

    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    zIndex: 2,
  },
  search: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    position: "absolute",
    top: Dimensions.get('window').height * 0.07,
    width: "100%",
  },
  inp: {
    height: 45,
    width: "85%",
    paddingLeft: 22,
    borderRadius: 45,
    textAlign: "left",
    shadowColor: "#000",
    shadowOpacity: 1,
    shadowRadius: 1,
    elevation: 0,
    shadowOffset: { width: 0, height: 0 },
    backgroundColor: "#f2f2f2",
  },
  searchIcon: {
    position: "absolute",
    top: 9,
    zIndex: 3,
    right: 47,
    borderRadius: 30,
  },
  
})
