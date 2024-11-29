import { View, Text, useWindowDimensions, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import RenderHTML from 'react-native-render-html';
import Colors from '../../Utils/Colors';

export default function ContentItem({description,output}) {
    const { width } = useWindowDimensions();
    const [isRun,setIsRun]=useState(false);
    const descriptionSourse={
        html:description
    }
    const outputSource={
      html:output?.trim() && output.trim() !== '<p></p>' ? output : null
    }
    
  return description&&(
    <View>
      {/* <Text>{description}</Text> */}
      <RenderHTML
      contentWidth={width}
      source={descriptionSourse}
      tagsStyles={tagsStyles}
    />
    {output && output.trim() && output.trim() !== '<p></p>' ? <TouchableOpacity onPress={()=>setIsRun(true)} style={{marginTop:-20,marginBottom:20}}>
        <Text style={{padding:12,backgroundColor:Colors.PRIMARY,borderRadius:10,fontFamily:'outfit',width:100,fontSize:15,color:Colors.WHITE,textAlign:'center'}}>Run</Text>
    </TouchableOpacity>:null}

    {isRun ? (
  <>
    <Text style={{ fontFamily: 'smbold', fontSize: 17, marginBottom: 10 }}>Output</Text>
    {outputSource?.html && outputSource.html.trim() !== '<p></p>' ? (
      <RenderHTML
        contentWidth={width}
        source={outputSource}
        tagsStyles={outputStyles}
      />
    ) : (
      <Text style={{ fontFamily: 'outfit', fontSize: 15, color: Colors.GRAY }}>
        No output available.
      </Text>
    )}
  </>
) : null}

    </View>
  )
}

const tagsStyles = {
    body: {
      fontFamily: 'outfit',
      fontSize:18
    },
    code:{
        backgroundColor:Colors.BLACK,
        color:Colors.WHITE,
        padding:20,
        borderRadius:15

    }
  };

  const outputStyles = {
    body: {
      fontFamily: 'outfit',
      fontSize:18,
      backgroundColor:Colors.BLACK,
      color:Colors.WHITE,
      padding:20,
      borderRadius:15
    },
    code:{
        backgroundColor:Colors.BLACK,
        color:Colors.WHITE,
        padding:20,
        borderRadius:15

    }
  };