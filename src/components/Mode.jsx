import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icons from './Icons';

const { height, width } = Dimensions.get('window');

const Mode = () => {
    const navigation = useNavigation();

    const handleProceed = (mode) => {
        if (mode === "discovery") {
          navigation.navigate("TopicsScreen", { difficulty: "discovery" });
        } else if (mode === "legends") {
          navigation.navigate("TopicsScreen", { difficulty: "legends" });
        }
      };    

    return (
        <ImageBackground source={require('../assets/back/1.png')} style={{flex: 1, transform: [{ rotate: '180deg' }]}}>
            <View style={styles.container}>
                <TouchableOpacity style={styles.back} onPress={() => navigation.goBack()}>
                    <Icons type={"home"} />
                </TouchableOpacity>

                <Text style={styles.title}>Select your game mode</Text>

                <TouchableOpacity style={styles.btn} onPress={() => handleProceed("discovery")}>
                    <Text style={styles.btnText}>Discovery mode</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.btn} onPress={() => handleProceed("legends")}>
                    <Text style={styles.btnText}>Legend's path</Text>
                </TouchableOpacity>

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
        marginBottom: height * 0.1
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

});

export default Mode;