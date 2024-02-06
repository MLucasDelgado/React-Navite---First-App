import { TouchableOpacity, Image, StyleSheet } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'

// TouchableOpacity sirve para tener un evento, por ejemplo si toco en la imagen que me lleve a una seccion como el detalle de esa imagen, el elmento view no puede tener un evento.

const CardImage = ({ image }) => {

    const navigation = useNavigation();

    return (
        // al usar navigate puedo usar un dato extra, en este caso le paso la imagen
        <TouchableOpacity style={style.cardImage} onPress={() => navigation.navigate('ImageScreen', {image})}>
            <Image source={{
                uri: image.src.large 
                ? image.src.large 
                : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQxdml6QENmszoeUcH1CmtFFK9VIF8_pOx2QcvI9Jg6ag&s'

            }} style={{ height: 120, width: '100%' }} />
        </TouchableOpacity>
    )
}

const style = StyleSheet.create({
    cardImage: {
        display: 'flex',
        width: '49.5%',
        margin: 4,
        justifyContent: 'space-between',
        backgroundColor: '#2c292c',
        borderWidth: 0,
        borderRadius: 5
    }
})

export default CardImage