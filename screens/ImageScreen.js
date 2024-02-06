import { View, Image, StyleSheet, Text, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react'
import { Avatar, Button } from 'react-native-elements'
import ImageList from '../components/ImageList';
import { getImage } from '../api/pexel';
import * as WebBrowser from 'expo-web-browser';
import * as FileSystem from 'expo-file-system';
import * as MediaLibrary from 'expo-media-library';

const ImageScreen = ({ route }) => {
  // en el objeto image se encuentran todas las propiedades que deseo mostrar
  const { image } = route.params

  const [photos, setPhotos] = useState([])

  const loadImage = async () => {
    const res = await getImage()
    setPhotos(res.data.photos);
  }

  useEffect(() => {
    loadImage()
  }, [])

  const handlePress = async () => {
    await WebBrowser.openBrowserAsync(image.photographer_url)
  }

  const downloadFile = async () => {
    // esto sirve para que cuando se haga la descarga aparezca con el nombre que nosotros queramos
    try {
      let fileUri = FileSystem.documentDirectory + image.id + '.jpeg'
      
      const { uri } = await FileSystem.downloadAsync(image.src.large, fileUri)

      saveFile(uri)
    } catch (error) {
      console.log(error.message);
    }
  }

  const saveFile = async (fileUri) => {
    const { status } = await MediaLibrary.requestPermissionsAsync()
    if (status === 'granted') {
      const asset = await MediaLibrary.createAssetAsync(fileUri);
      await MediaLibrary.createAlbumAsync("Download", asset, false)
    }
  }

  const handleDownload = () => {
    downloadFile()
  }

  return (
    <View style={style.headerPotographer}>
      <Image source={{ uri: image.src.large, height: 350 }} />
      <View style={style.contenedor}>
        <View style={style.container}>
          <Avatar title={image.photographer
            .split(' ')
            .map(string => string[0])
            .join('')
            .toUpperCase()}
            containerStyle={{ backgroundColor: 'red' }}
            rounded
          />
          <TouchableOpacity onPress={handlePress}>
            <Text style={style.textPhotographer}>{image.photographer}</Text>
          </TouchableOpacity>
        </View>
        <Button
          title='Download'
          buttonStyle={{ backgroundColor: '#229783' }}
          onPress={() => handleDownload()} />
      </View>
      <View style={style.lastSeccion}>
        <Text style={style.titulo}>Related</Text>
        <ImageList photos={photos} />
      </View>
    </View>
  )
}

const style = StyleSheet.create({
  headerPotographer: {
    backgroundColor: '#0D0D0D',
    flex: 1,
    flexDirection: 'column',
    padding: 10,
  },
  contenedor: {
    display: 'flex',
    paddingVertical: 10,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%'

  },
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },
  textPhotographer: {
    color: '#fff',
    marginLeft: 5,
    fontWeight: 'bold',
    fontSize: 18
  },
  titulo: {
    color: '#fff',
    fontSize: 15,
    paddingTop: 10,
    paddingBottom: 10,
    fontWeight: 'bold'
  },
  lastSeccion: {
    flex: 1,
    paddingBottom: 30
  }
})

export default ImageScreen