import { View, Text, ToastAndroid, ScrollView } from 'react-native'
import React, { useContext, useEffect } from 'react'
import Content from '../Components/ChapterContent/Content'
import { useNavigation, useRoute } from '@react-navigation/native'
import { MarkChapterCompleted } from '../Services';
import { CompleteChapterContext } from '../Context/CompleteChapterContext';

export default function ChapterContentScreen() {

  const param=useRoute().params;
  const navigation=useNavigation();
  const {isChapterComplete,setIsChapterComplete}=useContext(CompleteChapterContext)

  //ChapterId
  //RecordId
  useEffect(()=>{
    console.log("ChapterId",param.chapterId)
    console.log("RecordId",param.userCourseRecordId)
  },[param])
  
  const onChapterFinish=()=>{
    MarkChapterCompleted(param.chapterId,param.userCourseRecordId).then(resp=>{
      if(resp)
      {
        ToastAndroid.show('Course Completed!',ToastAndroid.LONG)
        setIsChapterComplete(true)
        navigation.goBack();
      }
    })
  }

  
  return param.content&&(
    <ScrollView>
      <Content content={param.content} onChapterFinish={()=>onChapterFinish()} />
    </ScrollView>
  )
}