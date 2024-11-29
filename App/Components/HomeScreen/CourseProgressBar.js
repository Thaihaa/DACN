import { View, Text } from 'react-native'
import React from 'react'
import Colors from '../../Utils/Colors'

export default function CourseProgressBar(totalChapter,completedChapter) {

    const width=(completedChapter/totalChapter)*100+"%"
    console.log("Total Chapters:", totalChapter);
    console.log("Completed Chapters:", completedChapter);
    console.log("Calculated Width:", width);
  return (
    <View style={{width:'100%',height:7,backgroundColor:Colors.GRAY,borderRadius:99}}>

    <View style={{width:width,height:7,backgroundColor:Colors.SPLIGHT_GREEN,borderRadius:99}}>

    </View>
    </View>
  )
}