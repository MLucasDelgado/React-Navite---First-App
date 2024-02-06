import { View, FlatList } from 'react-native'
// flat list sirve para partir un array y crear multiples elementos
import React from 'react'
import CardImage from './CardImage'

const ImageList = ({photos}) => {

    const renderItems = (({item}) =>  <CardImage image={item}/>)
  return (
    <View>
      <FlatList data={photos} renderItem={renderItems} keyExtractor={(item) => item.id} numColumns={2} />
    </View>
  )
}



export default ImageList