import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, ImageBackground, StyleSheet, Dimensions, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import TastesModal from './TastesModal';
import tastes from '../constants/tastes';

const { height, width } = Dimensions.get('window');

const Tastes = () => {
    const navigation = useNavigation();
    const [modalVisible, setModalVisible] = useState(true);
    const [selected, setSelected] = useState(null);

    return (
        <ImageBackground source={require('../assets/back/2.png')} style={{flex: 1, transform: [{ rotate: '180deg' }]}}>
            <View style={styles.container}>

                <Text style={styles.title}>Dishes</Text>

                {
                    selected ? (
                        <View style={styles.card}>

                            <Text style={styles.name}>{selected.name}</Text>
                            <Text style={styles.description}>{selected.description}</Text>

                            <TouchableOpacity 
                                style={[styles.btn, {width: '95%', padding: 5, backgroundColor: '#ebf05d', borderColor: '#8d910c', marginBottom: height * 0.03}]}
                                onPress={() => navigation.navigate('RecipeScreen', {
                                    selected: selected,
                                    type: 'history'
                                })}>
                                <Text style={[styles.btnText, {color: '#8d910c', fontSize: 15}]}>History</Text>
                            </TouchableOpacity>

                            <Image source={selected.image} style={styles.image} />

                            <TouchableOpacity 
                                style={[styles.btn, {width: '95%', padding: 5, backgroundColor: '#f0b573', borderColor: '#9e5706', marginBottom: height * 0.015}]}
                                onPress={() => navigation.navigate('RecipeScreen', {
                                    selected: selected,
                                    type: 'recipe'
                                })}>
                                <Text style={[styles.btnText, {color: '#9e5706', fontSize: 15}]}>Recipe</Text>
                            </TouchableOpacity>

                            <TouchableOpacity 
                                style={[styles.btn, {width: '95%', padding: 5, backgroundColor: '#eb575c', borderColor: '#94070d', marginBottom: 0}]}
                                onPress={() => setSelected(null)}
                                >
                                <Text style={[styles.btnText, {color: '#94070d', fontSize: 15}]}>Go back</Text>
                            </TouchableOpacity>

                        </View>
                    ) : (
                        <View style={{width: '100%', alignItems: 'center'}}>
                            {
                                tastes.map((item, index) => (
                                    <TouchableOpacity key={index} style={styles.btn} onPress={() => setSelected(item)}>
                                        <Text style={styles.btnText}>{item.name}</Text>
                                    </TouchableOpacity>
                                ))
                            }
                        </View>
                    )
                }

                <TastesModal visible={modalVisible} onClose={() => setModalVisible(false)} />
            </View>
        </ImageBackground>
    )
};

const styles = StyleSheet.create({

    container: {
        flex: 1,
        padding: 20,
        paddingTop: height * 0.07,
        alignItems: 'center',
        justifyContent: 'flex-start',
        transform: [{ rotate: '180deg' }]
    },

    title: {
        fontWeight: '900',
        fontSize: 30,
        textAlign: 'center',
        marginBottom: height * 0.05,
        color: '#7de075',
    },

    btn: {
        width: width * 0.85,
        padding: 15,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 30,
        borderWidth: 3,
        borderColor: '#306e29',
        backgroundColor: '#63cc58',
        marginBottom: height * 0.015
    },

    btnText: {
        fontSize: 18,
        fontWeight: '800',
        color: '#306e29',
    },

    card: {
        width: '100%',
        alignItems: 'center',
        padding: 15,
        borderRadius: 16,
        backgroundColor: '#fff'
    },

    name: {
        fontWeight: '800',
        fontSize: 22,
        textAlign: 'center',
        marginBottom: height * 0.02,
        color: '#097023',
    },

    description: {
        fontWeight: '500',
        fontSize: 16,
        textAlign: 'justify',
        marginBottom: height * 0.02,
        color: '#000',
    },

    image: {
        width: '100%',
        height: height * 0.25,
        resizeMode: 'cover',
        borderRadius: 10,
        marginBottom: height * 0.03
    }

});

export default Tastes;