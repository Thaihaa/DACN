import { View, Text, ScrollView } from "react-native";
import React from "react";
import Header from "../Components/HomeScreen/Header";
import Colors from "../Utils/Colors";
import CourseList from "../Components/HomeScreen/CourseList";
import CourseProgress from "../Components/HomeScreen/CourseProgress";

export default function HomeScreen() {
  return (
    <ScrollView contentContainerStyle={{flexGrow:1}} style={{flex:1}}>
      <View
        style={{ backgroundColor: Colors.PRIMARY, height: 250, padding: 20 }}>
        <Header />
      </View>
      <View style={{padding:20}}>
        <View style={{marginTop:-90}}>
        <CourseProgress />
        <CourseList level={'Basic'} />
      </View>
      <CourseList level={'Moderate'}/>
      <CourseList level={'Advance'} />
      </View>
    </ScrollView>
  );
}
