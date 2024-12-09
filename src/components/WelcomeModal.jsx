import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Modal } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';

const WelcomeModal = ({ visible, onClose }) => {
    const [step, setStep] = useState(1);
    const [bonus, setBonus] = useState(0);
    const [timer, setTimer] = useState(null);
    const [timeRemaining, setTimeRemaining] = useState(null);

    useEffect(() => {
        if (timer) {
            const interval = setInterval(() => {
                const currentTime = new Date().getTime();
                const diff = timer - currentTime;

                if (diff <= 0) {
                    setTimer(null);
                    setTimeRemaining(null);
                    clearInterval(interval);
                } else {
                    const hours = Math.floor(diff / (1000 * 60 * 60)).toString().padStart(2, '0');
                    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)).toString().padStart(2, '0');
                    const seconds = Math.floor((diff % (1000 * 60)) / 1000).toString().padStart(2, '0');
                    setTimeRemaining(`${hours}:${minutes}:${seconds}`);
                }
            }, 1000);

            return () => clearInterval(interval);
        }
    }, [timer]);

    useEffect(() => {
        const loadTimer = async () => {
            const storedTimer = await AsyncStorage.getItem('rewardTimer');
            const storedScore = await AsyncStorage.getItem('totalScore');
            if (storedTimer) {
                setTimer(parseInt(storedTimer, 10));
            }
            if (!storedScore) {
                await AsyncStorage.setItem('totalScore', '0');
            }
        };
        loadTimer();
    }, []);

    const handleNextStep = async () => {
        if (step < 4) {
            setStep(step + 1);
        } else if (timer === null) {
            const randomBonus = [100, 500, 1000, 2000, 3000][Math.floor(Math.random() * 5)];
            setBonus(randomBonus);

            const storedScore = parseInt(await AsyncStorage.getItem('totalScore'), 10) || 0;
            const newScore = storedScore + randomBonus;

            await AsyncStorage.setItem('totalScore', newScore.toString());

            const currentTime = new Date().getTime();
            const nextRewardTime = currentTime + 24 * 60 * 60 * 1000;
            await AsyncStorage.setItem('rewardTimer', nextRewardTime.toString());
            setTimer(nextRewardTime);
            setStep(5);
        }
    };

    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={visible}
            onRequestClose={onClose}
        >
            <View style={styles.modalOverlay}>
                <View style={styles.modalContent}>
                    {step === 1 && (
                        <>
                            <Text style={[styles.modalText, { color: '#46a33c', fontWeight: '700', marginBottom: 20 }]}>
                                Welcome to Salzburg Revealed!
                            </Text>
                            <Text style={styles.modalText}>
                                Discover the City’s Magic! Step into a city where history, art, and breathtaking landscapes blend seamlessly.
                            </Text>
                            <TouchableOpacity style={styles.closeButton} onPress={handleNextStep}>
                                <Text style={styles.closeButtonText}>Definitely!</Text>
                            </TouchableOpacity>
                        </>
                    )}

                    {step === 2 && (
                        <>
                            <Text style={[styles.modalText, { color: '#46a33c', fontWeight: '700', marginBottom: 20 }]}>
                                Your journey through Salzburg begins here!
                            </Text>
                            <Text style={styles.modalText}>Start exploring the magic of this region.</Text>
                            <TouchableOpacity style={styles.closeButton} onPress={handleNextStep}>
                                <Text style={styles.closeButtonText}>Learn more</Text>
                            </TouchableOpacity>
                        </>
                    )}

                    {step === 3 && (
                        <>
                            <Text style={[styles.modalText, { color: '#46a33c', fontWeight: '700', marginBottom: 20 }]}>
                                Salzburg City: The Heart of History and Culture.
                            </Text>
                            <Text style={styles.modalText}>
                                Salzburg City, the birthplace of Wolfgang Amadeus Mozart, is a cultural gem nestled at the foot of the Alps.
                            </Text>
                            <TouchableOpacity style={styles.closeButton} onPress={handleNextStep}>
                                <Text style={styles.closeButtonText}>Your reward is here!</Text>
                            </TouchableOpacity>
                        </>
                    )}

                    {step === 4 && (
                        <>
                            {timer ? (
                                <>
                                    <Text style={styles.modalText}>
                                        Next reward will be available in {timeRemaining}
                                    </Text>
                                    <TouchableOpacity style={styles.closeButton} onPress={onClose}>
                                        <Text style={styles.closeButtonText}>Close</Text>
                                    </TouchableOpacity>
                                </>
                            ) : (
                                <>
                                    <Text style={[styles.modalText, { color: '#46a33c', fontWeight: '700', marginBottom: 20 }]}>
                                        Congratulations!
                                    </Text>
                                    <Text style={styles.modalText}>
                                        Claim your reward to unlock more regions and uncover the secrets of Salzburg!
                                    </Text>
                                    <TouchableOpacity style={styles.closeButton} onPress={handleNextStep}>
                                        <Text style={styles.closeButtonText}>Get</Text>
                                    </TouchableOpacity>
                                </>
                            )}
                        </>
                    )}

                    {step === 5 && (
                        <>
                            <Text style={styles.modalText}>
                                You have earned a bonus of {bonus} points! Your total score has been updated.
                            </Text>
                            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
                                <Text style={styles.closeButtonText}>Close</Text>
                            </TouchableOpacity>
                        </>
                    )}
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({

    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
    },

    modalContent: {
        width: '80%',
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 16,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 20,
            height: 20,
        },
        shadowOpacity: 0.2,
        shadowRadius: 4,
    },

    modalText: {
        fontSize: 18,
        fontWeight: '400',
        color: '#3C3C3B',
        textAlign: 'center',
        lineHeight: 21
    },

    closeButton: {
        padding: 8,
        width: '100%',
        backgroundColor: '#63cc58',
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 30,
        borderWidth: 2,
        borderColor: '#306e29'
    },

    closeButtonText: {
        fontSize: 16,
        fontWeight: '800',
        color: '#306e29',
    }
})


export default WelcomeModal;