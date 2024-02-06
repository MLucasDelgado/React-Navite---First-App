import { View, StyleSheet, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { getImage } from '../api/pexel'
import ImageList from '../components/ImageList'
import { Input, Button } from 'react-native-elements'
import { SearchBar } from 'react-native-screens'

const HomeScreen = ({ openSearch }) => {

    const [photos, setPhotos] = useState([])
    const [searchTerm, setSearchTerm] = useState('')

    const loadImage = async (searchTerm) => {
        const res = await getImage(searchTerm)
        setPhotos(res.data.photos);
    }

    useEffect(() => {
        loadImage()
    }, [])

    const handleSearch = async () => {
        await loadImage(searchTerm)
    }

    return (
        <>
            {openSearch && (
                <View style={style.searchSection}>
                    <Input
                        leftIcon={{ type: 'feather', name: 'search', color: '#fff' }}
                        leftIconContainerStyle={style.searchLeftIcon}
                        placeholder='Search a Term'
                        style={style.input}
                        inputContainerStyle={style.searchingInput}
                        onChangeText={(value) => setSearchTerm(value)}
                    />

                    <Button
                        buttonStyle={style.buttonSearch}
                        title='Search'
                        onPress={() => handleSearch()} />
                </View>
            )}
            <View style={style.container}>
                <Text style={style.textResult}>1000 Results</Text>
                <ImageList photos={photos} />
            </View>
        </>
    )
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0d0d0d',
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom: 30
    },
    textResult: {
        color: '#D0D0D0',
        textAlign: 'right',
        width: '100%',
        paddingTop: 35
    },
    searchSection: {
        backgroundColor: '#0D0D0D',
        width: '100%',
        paddingLeft: 10,
        flex: 1 / 5,
        flexDirection: 'row',
        paddingRight: 75,
        alignItems: 'center'
    },
    searchingInput: {
        backgroundColor: '#2c292c',
        borderBottomWidth: 0,
        paddingHorizontal: 4,
    },
    input: {
        color: 'white'
    },
    searchLeftIcon: {
        paddingStart: 7,
        marginRight: 5
    },
    buttonSearch: {
        marginBottom: 27,
        backgroundColor: '#229783'
    }
})


export default HomeScreen