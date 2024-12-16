import React from 'react';
import { View , Text, TouchableOpacity, Image, StyleSheet, Dimensions, ImageBackground, ScrollView } from "react-native";
import { useNavigation } from '@react-navigation/native';
import discovery from '../constants/discovery';
import legends from '../constants/legends';
import Icons from './Icons';

const { height, width } = Dimensions.get('window');

const Topics = ({ difficulty }) => {
    const navigation = useNavigation();

    const handleNavigation = (topic, difficulty) => {
        if (difficulty === 'discovery') {
            navigation.navigate('DiscoveryQuizScreen', { quiz: topic });
        } else if (difficulty === 'legends') {
            navigation.navigate('LegendsQuizScreen', { quiz: topic });
        }
    };

    return (
        <ImageBackground source={require('../assets/back/2.png')} style={{flex: 1, transform: [{ rotate: '180deg' }]}}>
            <View style={styles.container}>

                <TouchableOpacity style={styles.back} onPress={() => navigation.goBack()}>
                    <Icons type={"home"} />
                </TouchableOpacity>

                <Text style={styles.title}>Select a quiz topic that interests you!</Text>

                    <ScrollView style={{width: '100%'}} contentContainerStyle={styles.btnsContainer}>
                        {
                            difficulty === 'discovery' ? (
                                discovery.map((topic, index) => (
                                    <View key={index} style={styles.btnBox}>
                                        <TouchableOpacity style={styles.btn} onPress={() => handleNavigation(topic, 'discovery')}>
                                            <Image source={topic.image} style={styles.image} />
                                        </TouchableOpacity>
                                        <Text style={styles.btnText}>{topic.topic}</Text>
                                    </View>
                                ))
                            ) : (
                                legends.map((topic, index) => (
                                    <View key={index} style={styles.btnBox}>
                                        <TouchableOpacity style={styles.btn} onPress={() => handleNavigation(topic, 'legends')}>
                                            <Image source={topic.image} style={styles.image} />
                                        </TouchableOpacity>
                                        <Text style={styles.btnText}>{topic.topic}</Text>
                                    </View>
                                ))
                            )
                        }
                    </ScrollView>

            <Text></Text>
            </View>
        </ImageBackground>
    )
};

const styles = StyleSheet.create({

    container: {
        flex: 1,
        paddingTop: height * 0.15,
        paddingHorizontal: 20,
        alignItems: 'center',
        justifyContent: 'center',
        transform: [{ rotate: '180deg' }]
    },

    back: {
        width: 60,
        height: 60,
        padding: 10,
        position: "absolute",
        top: height * 0.04,
        left: 0,
        zIndex: 10,
    },

    title: {
        fontSize: 26,
        fontWeight: '900',
        color: '#7de075',
        marginBottom: height * 0.05,
        textAlign: 'center'
    },

    btnsContainer: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        width: '100%',
        flexWrap: 'wrap',
    },

    btnBox: {
        width: width * 0.43,
        height: height * 0.3,
        alignItems: 'center',
        justifyContent: 'flex-start',
        marginBottom: height * 0.03
    },

    btn: {
        width: '100%',
        height: width * 0.43,
        borderRadius: 100,
        borderWidth: 3,
        borderColor: '#306e29',
        marginBottom: height * 0.015,
        overflow: 'hidden'
    },

    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover'
    },

    btnText: {
        fontSize: 15,
        fontWeight: '600',
        color: '#57eb4d',
        textAlign: 'center'
    }

});

export default Topics;