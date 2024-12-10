import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, ImageBackground, StyleSheet, Dimensions, ScrollView, Modal, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import mozart from '../constants/mozart';

const { height, width } = Dimensions.get('window');

const Mozart = () => {
    const navigation = useNavigation();
    const [currentIndex, setCurrentIndex] = useState(0);
    const [modalVisible, setModalVisible] = useState(false);
    const [totalScore, setTotalScore] = useState(0);
    const [purchasedStories, setPurchasedStories] = useState([]);
    const [showStory, setShowStory] = useState(false);

    const currentItem = mozart[currentIndex];

    useEffect(() => {
        const fetchPurchaseState = async () => {
            const storedPurchases = JSON.parse(await AsyncStorage.getItem('purchasedStories')) || [];
            const score = await AsyncStorage.getItem('totalScore');
            setPurchasedStories(storedPurchases);
            setTotalScore(parseInt(score, 10) || 0);
        };

        fetchPurchaseState();
    }, []);

    const handleNextStory = () => {
        const nextStoryTitle = mozart[currentIndex + 1]?.title;
        if (purchasedStories.includes(nextStoryTitle)) {
            setCurrentIndex((prevIndex) => prevIndex + 1);
        } else {
            setModalVisible(true);
        }
    };
    
    const handlePurchase = async () => {
        if (totalScore >= 500) {
            const newScore = totalScore - 500;
            setTotalScore(newScore);
            await AsyncStorage.setItem('totalScore', newScore.toString());
    
            const updatedPurchases = [...purchasedStories, mozart[currentIndex + 1]?.title];
            setPurchasedStories(updatedPurchases);
            await AsyncStorage.setItem('purchasedStories', JSON.stringify(updatedPurchases));
    
            setModalVisible(false);
            setCurrentIndex((prevIndex) => prevIndex + 1);
        } else {
            Alert.alert('Insufficient Funds', 'You do not have enough points to unlock this story.');
        }
    };
    
    const handlePreviousStory = () => {
        setCurrentIndex((prevIndex) => Math.max(0, prevIndex - 1));
    };

    const handleReadStory = () => {
        setShowStory(true);
    };

    return (
        <ImageBackground source={require('../assets/back/1.png')} style={{ flex: 1, transform: [{ rotate: '180deg' }] }}>
            <View style={styles.container}>

                {showStory ? (
                    <View style={{ width: '100%', alignItems: 'center' }}>
                        <Text style={styles.title}>{currentItem.title}</Text>
                        <ScrollView style={styles.storyContainer}>
                            <Text style={styles.storyText}>{currentItem.story}</Text>
                        </ScrollView>
                        <TouchableOpacity style={styles.btn} onPress={() => setShowStory(false)}>
                            <Text style={styles.btnText}>Go Back</Text>
                        </TouchableOpacity>
                    </View>
                ) : (
                    <View style={{ width: '100%', alignItems: 'center' }}>
                        <Text style={styles.title}>{currentItem.title}</Text>
                        <Image source={currentItem.image} style={styles.image} />
                        <TouchableOpacity style={styles.btn} onPress={handleReadStory}>
                            <Text style={styles.btnText}>Read the Story</Text>
                        </TouchableOpacity>
                        {currentIndex > 0 && (
                            <TouchableOpacity style={styles.btn} onPress={handlePreviousStory}>
                                <Text style={styles.btnText}>Previous Story</Text>
                            </TouchableOpacity>
                        )}
                        {currentIndex < mozart.length - 1 && (
                            <TouchableOpacity style={styles.btn} onPress={handleNextStory}>
                                <Text style={styles.btnText}>Next Story</Text>
                            </TouchableOpacity>
                        )}
                    </View>
                )}

                <Modal animationType="fade" transparent={true} visible={modalVisible} onRequestClose={() => setModalVisible(false)}>
                    <View style={styles.modalContainer}>
                        <View style={styles.modalContent}>
                            <Text style={styles.modalTitle}>Unlock Story</Text>
                            <Text style={styles.modalDescription}>
                                To unlock the next story, you need to spend 500 points. Would you like to proceed?
                            </Text>
                            <View style={styles.modalButtonContainer}>
                                <TouchableOpacity style={[styles.modalButton, { backgroundColor: '#7de075' }]} onPress={handlePurchase}>
                                    <Text style={styles.modalButtonText}>Sure</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={[styles.modalButton, { backgroundColor: '#ff383c' }]} onPress={() => setModalVisible(false)}>
                                    <Text style={styles.modalButtonText}>Maybe, Later</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Modal>
            </View>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        paddingTop: height * 0.07,
        alignItems: 'center',
        justifyContent: 'flex-start',
        transform: [{ rotate: '180deg' }],
    },
    title: {
        fontWeight: '900',
        fontSize: 30,
        textAlign: 'center',
        marginBottom: height * 0.03,
        color: '#7de075',
    },
    image: {
        width: '100%',
        height: height * 0.35,
        resizeMode: 'cover',
        borderRadius: 10,
        marginBottom: height * 0.05,
    },
    btn: {
        width: '100%',
        padding: 15,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 30,
        borderWidth: 3,
        borderColor: '#306e29',
        backgroundColor: '#63cc58',
        marginBottom: height * 0.015,
    },
    btnText: {
        fontSize: 18,
        fontWeight: '800',
        color: '#306e29',
    },
    storyContainer: {
        width: '100%',
        height: height * 0.6,
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 10,
        marginBottom: height * 0.03,
    },
    storyText: {
        fontSize: 16,
        color: '#000',
        textAlign: 'justify',
        lineHeight: 22,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
    },
    modalContent: {
        width: '80%',
        padding: 20,
        backgroundColor: '#fff',
        borderRadius: 10,
        alignItems: 'center',
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: '800',
        color: '#114f1b',
        marginBottom: 10,
    },
    modalDescription: {
        fontSize: 16,
        color: '#555',
        textAlign: 'center',
        marginBottom: 20,
    },
    modalButtonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
    modalButton: {
        width: '48%',
        padding: 7,
        alignItems: 'center',
        borderRadius: 10,
    },
    modalButtonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
});

export default Mozart;
