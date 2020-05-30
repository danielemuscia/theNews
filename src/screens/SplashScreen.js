import React, { useContext, useEffect } from 'react'
import { View, Text, Image } from 'react-native'
import { AuthContext} from '../context/AuthContext'
import {Context as NewsContext} from '../context/NewsContext'
import * as Font from 'expo-font'
import logo from '../../assets/img/theNews.png'

const SplashScreen = () => {
    const {checkAuth} = useContext(AuthContext)
    const load = async() => {
        await Font.loadAsync({
            black: require('../../assets/fonts/NotoSansTC-Black.otf'),
            bold: require('../../assets/fonts/NotoSansTC-Bold.otf'),
            light: require('../../assets/fonts/NotoSansTC-Light.otf'),
            medium: require('../../assets/fonts/NotoSansTC-Medium.otf'),
            regular: require('../../assets/fonts/NotoSansTC-Medium.otf'),
            thin: require('../../assets/fonts/NotoSansTC-Thin.otf')
        })
        checkAuth()
    }
    useEffect(() => {
        load()
    }, [])

    return (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <Image source={logo} style={{height: 350, width: 350}}  />
        </View>
    )
    
}

export default SplashScreen
