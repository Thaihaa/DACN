import { View, Text, TouchableOpacity, ScrollView, ToastAndroid } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import Ionicons from '@expo/vector-icons/Ionicons';
import { useNavigation, useRoute } from '@react-navigation/native';
import DetailSection from '../Components/CourseDetailScreen/DetailSection';
import ChapterSection from '../Components/CourseDetailScreen/ChapterSection';
import { useUser } from '@clerk/clerk-expo';
import { enrollCourse, getUserEnrolledCourse } from '../Services';
import { CompleteChapterContext } from '../Context/CompleteChapterContext';

export default function CourseDetailScreen() {
  const navigate=useNavigation();
  const params=useRoute().params;
  const {isChapterComplete,setIsChapterComplete}=useContext(CompleteChapterContext)
  const [userEnrolledCourse,setUserEnrolledCourse]=useState();
  const {user}=useUser();

  useEffect(()=>{
    console.log(params.course);
    if(user&&params.course)
    {
      GetUserEnrolledCourse();
    }
  },[params.course,user])

  useEffect(()=>{
    isChapterComplete&&GetUserEnrolledCourse();
  },[isChapterComplete])

  // Đăng ký khóa học
  const UserEnrollCourse = () => {
    enrollCourse(params.course.id, user.primaryEmailAddress.emailAddress)
      .then(resp => {
        console.log('Kết quả enrollCourse:', resp);
        if (resp) {
          ToastAndroid.show('Course Enrolled Successfully', ToastAndroid.LONG);
          setTimeout(() => {
            console.log('Gọi GetUserEnrolledCourse sau khi chờ 1 giây');
            GetUserEnrolledCourse();
          }, 1000); // Thêm thời gian chờ 1 giây
        }
      })
      .catch(error => {
        console.error('Lỗi khi đăng ký khóa học:', error);
      });
  };
  

  const GetUserEnrolledCourse=()=> {
    console.log('GetUserEnrolledCourse được gọi'); // Kiểm tra khi hàm được gọi
    getUserEnrolledCourse(params.course.id, user.primaryEmailAddress.emailAddress)
      .then((resp) => {
        console.log('Kết quả getUserEnrolledCourse:', resp);
        setUserEnrolledCourse(resp?.userEnrolledCourses || []);
        console.log('Cập nhật userEnrolledCourse:', resp.userEnrolledCourses);
      })
  };
  console.log('Đang render CourseDetailScreen'); // Kiểm tra mỗi lần render
  console.log('userEnrolledCourse hiện tại:', userEnrolledCourse); // Kiểm tra trạng thái hiện tại

  return params.course&&(
    <ScrollView style={{padding:20}}>
    <TouchableOpacity onPress={()=>navigate.goBack()}>
      <Ionicons name="arrow-back-circle" size={40} color="black" />
      </TouchableOpacity>
      <DetailSection
      course={params.course} 
      userEnrolledCourse={userEnrolledCourse}
      enrollCourse={()=>UserEnrollCourse()} />
      <ChapterSection chapterList={params.course.chapters} userEnrolledCourse={userEnrolledCourse}/>
    </ScrollView>
  )
}