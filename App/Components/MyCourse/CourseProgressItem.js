import { View, Text, Image } from 'react-native'
import React from 'react'
import Colors from "../../Utils/Colors";
import Ionicons from "@expo/vector-icons/Ionicons";
import CourseProgressBar from '../HomeScreen/CourseProgressBar';

export default function CourseProgressItem({item,completedChapter}) {
    return (
      <View style={{
          padding: 10,
          backgroundColor: Colors.WHITE,
          marginRight: 15,
          borderRadius: 15,
        }}
      >
        <Image source={{uri:item?.banner?.url}}
          style={{ width: '100%', height: 170, borderRadius: 15 }}
        />
        <View style={{ padding: 7 }}>
          <Text style={{ fontFamily: "smbold", fontSize: 17 }}>
            {item.name}
          </Text>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                gap: 5,
                marginTop: 5,
              }}
            >
              <Ionicons name="book-outline" size={18} color="black" />
              <Text style={{fontFamily:'outfit'}}>{item.chapters?.length} Chapters </Text>
            </View>
  
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                gap: 5,
                marginTop: 5,
              }}
            >
              <Ionicons name="time-outline" size={18} color="black" />
              <Text style={{fontFamily:'outfit'}}>{item?.time}</Text>
            </View>
            <View></View>
          </View>
          <Text style={{marginTop:5,color:Colors.PRIMARY,fontFamily:'smbold'}}>{item.price==0?'Free':item.price} </Text>
        </View>
        {completedChapter!=undefined? 
        <CourseProgressBar totalChapter={item?.chapters?.length} 
                            completedChapter={completedChapter} />:null}
      </View>
    )
  }