import { View, Text, FlatList, Dimensions, TouchableOpacity, ScrollView } from 'react-native';
import React, { useState } from 'react';
import ProgressBar from './ProgressBar';
import ContentItem from './ContentItem';
import Colors from '../../Utils/Colors';
import { useNavigation } from '@react-navigation/native';

export default function Content({ content, onChapterFinish }) {

  let contentRef;
  const navigation = useNavigation();
  const [activeIndex, setActiveIndex] = useState(0);

  const onNextBtnPress = (index) => {
    if (content?.length <= index + 1) {
      onChapterFinish();
      return;
    }
    setActiveIndex(index + 1);
    contentRef.scrollToIndex({ animated: true, index: index + 1 });
  };

  return (
    <View style={{ padding: 0, height: '100%' }}>
      <ProgressBar contentLength={content.length} contentIndex={activeIndex} />

      <FlatList
        data={content}
        horizontal={true}
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        ref={(ref) => {
          contentRef = ref;
        }}
        renderItem={({ item, index }) => (
          <View style={{ width: Dimensions.get('screen').width, padding: 20, marginBottom: 40 }}>
            <Text style={{ fontFamily: 'smbold', fontSize: 27, marginTop: 20 }}>
              {item.heading}
            </Text>

            {/* Bọc ContentItem trong ScrollView để cuộn */}
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
              <ContentItem
                description={item?.description?.html}
                output={item?.output?.html}
              />
            </ScrollView>

            {/* Nút "Next" hoặc "Finish" */}
            <TouchableOpacity
              style={{
                marginTop: 15,
                padding: 10,
                backgroundColor: Colors.PRIMARY,
                color: Colors.WHITE,
                textAlign: 'center',
                fontFamily: 'outfit',
                fontSize: 17,
                borderRadius: 10,
                alignSelf: 'center',  // Căn giữa nút
              }}
              onPress={() => onNextBtnPress(index)}
            >
              <Text
                style={{
                  color: Colors.WHITE,
                  textAlign: 'center',
                  fontFamily: 'outfit',
                  fontSize: 17,
                }}
              >
                {content?.length > index + 1 ? 'Next' : 'Finish'}
              </Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}
