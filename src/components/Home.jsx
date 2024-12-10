import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, Image, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AboutModal from './AboutModal';

const { height, width } = Dimensions.get('window');

const Home = () => {
    const navigation = useNavigation();
    const [aboutModalVisible, setAboutModalVisible] = useState(false);

    return (
        <ImageBackground source={require('../assets/back/1.png')} style={{flex: 1, transform: [{ rotate: '180deg' }]}}>
            <View style={styles.container}>
                <Image style={styles.image} source={require('../assets/decor/1.png')} />

                <Text style={styles.title}>Salzburg: City of secrets</Text>

                <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate('ModeScreen')}>
                    <Text style={styles.btnText}>Reveal secrets</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate('AchievementsScreen')}>
                    <Text style={styles.btnText}>Achievements</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.btn} onPress={() => setAboutModalVisible(true)}>
                    <Text style={styles.btnText}>About</Text>
                </TouchableOpacity>

                <AboutModal visible={aboutModalVisible} onClose={() => setAboutModalVisible(false)} />

            </View>
        </ImageBackground>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
        paddingBottom: height * 0.12,
        alignItems: 'center',
        justifyContent: 'flex-start',
        transform: [{ rotate: '180deg' }]
    },

    image: {
        width: width,
        height: height * 0.4,
        resizeMode: 'cover',
        marginBottom: height * 0.03,
        borderBottomLeftRadius: '100%',
        borderBottomRightRadius: '100%',
    },

    title: {
        fontSize: 26,
        fontWeight: '900',
        color: '#7de075',
        marginBottom: height * 0.05
    },

    btn: {
        width: width * 0.8,
        padding: 15,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 30,
        borderWidth: 2,
        borderColor: '#306e29',
        backgroundColor: '#63cc58',
        marginBottom: height * 0.015
    },

    btnText: {
        fontSize: 18,
        fontWeight: '800',
        color: '#306e29',
    }
})

export default Home;