import React, {useContext, useEffect, useState} from 'react'
import { View, Text, Button, StyleSheet, FlatList, Animated, ScrollView } from 'react-native'
import {Context as NewsContext} from '../context/NewsContext'
import SingleNewsCard from '../components/SingleNewsCard'

const NewsList = (props) => {
    const [refresh, setRefresh] = useState(false)

    return (
        <FlatList 
        data={props.data}
        keyExtractor={item => item.title}
        renderItem={({item}) => {
            return <SingleNewsCard title={item.title} image={item.image ? item.image : item.urlToImage} description={item.description} content={item.content} source={item.source} author={item.author} url={item.url} id={item.id ? item.id : null} />
        }}
        refreshing={refresh}
        onRefresh={props.noRefresh ? null : async () => {
            setRefresh(true)
            await props.onRefresh
            setRefresh(false)
        }}
        scrollEventThrottle={16}
        onScroll={Animated.event([
            { nativeEvent: { contentOffset: { y: props.scrollOffsetY } } }
          ])} 
        scrollEventThrottle={16}
        contentContainerStyle={{backgroundColor: 'white', paddingTop: 70}}
        contentInset={{top: 0}}
        />
    )
}

export default NewsList
