import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, ImageBackground, Image, StyleSheet, Dimensions, Modal, ScrollView } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from '@react-navigation/native';
import { lose } from "../constants/legends";
import Icons from "./Icons";

const { height, width } = Dimensions.get("window");

const LegendsQuiz = ({ quiz }) => {
    const navigation = useNavigation();
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedOption, setSelectedOption] = useState(null);
    const [timeLeft, setTimeLeft] = useState(100);
    const [progress, setProgress] = useState(1);
    const [lives, setLives] = useState(3);
    const [totalScore, setTotalScore] = useState(0);
    const [score, setScore] = useState(0);

    const [factModalVisible, setFactModalVisible] = useState(false);
    const [factContent, setFactContent] = useState({ title: '', description: '' });
    const [buyLivesModalVisible, setBuyLivesModalVisible] = useState(false);
    const [filteredOptions, setFilteredOptions] = useState([]);
    const [hintModalVisible, setHintModalVisible] = useState(false);

    useEffect(() => {
        const fetchTotalScore = async () => {
            const storedScore = await AsyncStorage.getItem("totalScore");
            if (storedScore) {
                setTotalScore(parseInt(storedScore, 10));
            }
        };
        fetchTotalScore();
    }, []);    

    useEffect(() => {
        if (currentQuestionIndex === null) {
            const updateTotalScore = async () => {
                const newTotalScore = totalScore + score;
                setTotalScore(newTotalScore);
                await AsyncStorage.setItem("totalScore", newTotalScore.toString());
            };
            updateTotalScore();
        }
    }, [currentQuestionIndex]);    

    useEffect(() => {
        if (timeLeft > 0 && currentQuestionIndex !== null) {
            const timer = setInterval(() => {
                setTimeLeft((prevTime) => prevTime - 1);
                setProgress((timeLeft - 1) / 100);
            }, 1000);
    
            return () => clearInterval(timer);
        } else if (timeLeft === 0) {
            setCurrentQuestionIndex(null);
        }
    }, [timeLeft, currentQuestionIndex]);
    
    const currentQuestion = currentQuestionIndex !== null ? quiz.statements[currentQuestionIndex] : null;

    const handleOptionPress = (option) => {
        setSelectedOption(option);
    
        if (option === currentQuestion.correctOption) {
            setScore((prevScore) => prevScore + 100);
        } else {
            setScore((prevScore) => Math.max(0, prevScore - 50));
            setLives((prevLives) => prevLives - 1);
        }    
    
        setTimeout(() => {
            setSelectedOption(null);
    
            if (lives - (option !== currentQuestion.correctOption ? 1 : 0) === 0) {
                setCurrentQuestionIndex(null);
            } else if (currentQuestionIndex < quiz.statements.length - 1) {
                setCurrentQuestionIndex(currentQuestionIndex + 1);
                setFilteredOptions([]);
            } else {
                setCurrentQuestionIndex(null);
            }
        }, 1000);
    };

    const handleBuyLife = () => {
        if (score >= 50 && lives < 3) {
            setScore((prevScore) => prevScore - 50);
            setLives((prevLives) => prevLives + 1);
        }
        setBuyLivesModalVisible(false);
    };

    const handleHint = (type) => {
        if (type === 'removeOption' && score >= 50) {
            const incorrectOptions = currentQuestion.options.filter(
                (option) => option !== currentQuestion.correctOption
            );
            const randomOptionToRemove = incorrectOptions[Math.floor(Math.random() * incorrectOptions.length)];
            setFilteredOptions((prevFiltered) => [
                ...prevFiltered,
                randomOptionToRemove,
            ]);
            setScore((prevScore) => prevScore - 50);
        } else if (type === 'skipQuestion' && score >= 75) {
            setScore((prevScore) => prevScore - 75);
            setCurrentQuestionIndex((prevIndex) =>
                prevIndex < quiz.statements.length - 1 ? prevIndex + 1 : null
            );
        }
        setHintModalVisible(false);
    };
    
    const optionsToRender = currentQuestion ? currentQuestion.options.filter(
        (option) => !filteredOptions.includes(option)
    ) : [];     

    const handleFactPress = () => {        
        const randomLoseFact = lose[Math.floor(Math.random() * lose.length)];
        setFactContent({ title: randomLoseFact.title, description: randomLoseFact.description });
    
        setFactModalVisible(true);
    };

    const handleTryAgain = () => {
        setLives(3);
        setScore(0);
        setCurrentQuestionIndex(0);
        setTimeLeft(100);
        setProgress(1);
        setSelectedOption(null);
        setFilteredOptions([]);
    }
    
    return (
        <ImageBackground source={require('../assets/back/2.png')} style={{flex: 1, transform: [{ rotate: '180deg' }]}}>
            <View style={styles.container}>

            {
                currentQuestionIndex !== null && (
                    <View style={styles.progressBarContainer}>
                        <View style={[styles.progressBar, { width: `${progress * 100}%` }]} />
                        <Text style={styles.timerText}>
                            {`${Math.floor(timeLeft / 60)
                                .toString()
                                .padStart(2, "0")}:${(timeLeft % 60)
                                .toString()
                                .padStart(2, "0")}`}
                        </Text>
                    </View>    
                )
            }

                <Text style={styles.title}>{quiz.topic}</Text>

                {
                    currentQuestionIndex !== null && (
                        <View style={{flexDirection: 'row', alignItems: 'center', marginBottom: height * 0.01}}>
                            <Text style={styles.score}>{score}</Text>
                            <View style={styles.scoreIcon}>
                                <Icons type={'score'} />
                            </View>
                        </View>
                    )
                }

                <View style={{width: '100%', alignItems: 'center'}}>
                    <Image source={quiz.image} style={styles.image} />
                    {
                        currentQuestionIndex !== null && (
                            <View style={styles.iconsContainer}>
                                <TouchableOpacity
                                    style={[styles.icon, (lives === 3 || score < 50) && { opacity: 0.5 }]}
                                    disabled={lives === 3 || score < 50}
                                    onPress={() => setBuyLivesModalVisible(true)}
                                >
                                    <Icons type={'plus'} />
                                </TouchableOpacity>
                                <View>
                                    <View style={styles.icon}>
                                        <Icons type={'live'} />
                                    </View>
                                    <Text style={styles.lives}>{lives}</Text>
                                </View>
                                <TouchableOpacity
                                    style={[styles.icon, score < 50 && { opacity: 0.5 }]}
                                    disabled={score < 50}
                                    onPress={() => setHintModalVisible(true)}
                                >
                                    <Icons type={'hint'} />
                                </TouchableOpacity>
                            </View>    
                        )
                    }
                </View>

                {currentQuestionIndex !== null ? (
                    <>
                        <Text style={styles.question}>{currentQuestion.statement}</Text>
                        {optionsToRender.map((option, index) => (
                            <TouchableOpacity
                                key={index}
                                style={[
                                    styles.option,
                                    selectedOption === option
                                        ? option === currentQuestion.correctOption
                                            ? styles.correctOption
                                            : styles.wrongOption
                                        : null,
                                ]}
                                onPress={() => handleOptionPress(option)}
                                disabled={!!selectedOption}
                            >
                                <Text style={styles.optionText}>{option}</Text>
                            </TouchableOpacity>
                        ))}
                    </>
                ) : (
                    <View style={{alignItems: 'center', width: '100%'}}>
                        <Text style={[styles.completedText, {marginBottom: height * 0.015}]}>Well played !</Text>
                        <Text style={styles.completedText}>Try again and aim for a better score !</Text>
                        <View style={{flexDirection: 'row', alignItems: 'center', marginBottom: height * 0.01}}>
                            <Text style={[styles.score, {fontSize: 26}]}>{totalScore}</Text>
                            <View style={{width: 40, height: 40}}>
                                <Icons type={'score'} />
                            </View>
                        </View>
                        <View style={{width: '100%', alignItems: 'center', justifyContent: 'space-around', flexDirection: 'row', marginTop: height * 0.08}}>
                            <TouchableOpacity style={{width: height * 0.08, height: height * 0.08}} onPress={handleTryAgain}>
                                <Icons type={'try-again'} />
                            </TouchableOpacity>
                            <TouchableOpacity style={{width: height * 0.13, height: height * 0.13}} onPress={handleFactPress}>
                                <Icons type={'fact'} />
                            </TouchableOpacity>
                            <TouchableOpacity style={{width: height * 0.08, height: height * 0.08}} onPress={() => navigation.navigate('HomeScreen')}>
                                <Icons type={'home'} />
                            </TouchableOpacity>
                        </View>
                    </View>
                )}

                <Modal
                    animationType="fade"
                    transparent={true}
                    visible={factModalVisible}
                    onRequestClose={() => setFactModalVisible(false)}
                >
                    <View style={styles.modalContainer}>
                        <View style={[styles.modalContent, factContent === ({ title: quiz.topic, description: quiz.description }) && {height: '70%'}]}>
                            <TouchableOpacity
                                style={styles.modalCloseButton}
                                onPress={() => setFactModalVisible(false)}
                            >
                                <Icons type={'close'} />
                            </TouchableOpacity>
                            <ScrollView>
                                <Text style={styles.modalTitle}>{factContent.title}</Text>
                                <Text style={styles.modalDescription}>{factContent.description}</Text>
                            </ScrollView>
                        </View>
                    </View>
                </Modal>

                <Modal
                    animationType="fade"
                    transparent={true}
                    visible={buyLivesModalVisible}
                    onRequestClose={() => setBuyLivesModalVisible(false)}
                >
                    <View style={styles.modalContainer}>
                        <View style={[styles.modalContent, {paddingTop: 20}]}>
                            <Text style={styles.modalTitle}>Buy Extra Lives</Text>
                            <Text style={styles.modalDescription}>
                                Do you want to buy extra lives? Each life will cost you 50 points.
                            </Text>
                            <View style={styles.modalButtonContainer}>
                                <TouchableOpacity
                                    style={[styles.modalButton, { backgroundColor: score >= 50 && lives < 3 ? '#7de075' : '#ccc' }]}
                                    disabled={score < 50 || lives >= 3}
                                    onPress={handleBuyLife}
                                >
                                    <Text style={styles.modalButtonText}>Buy</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={[styles.modalButton, { backgroundColor: '#ff383c' }]}
                                    onPress={() => setBuyLivesModalVisible(false)}
                                >
                                    <Text style={styles.modalButtonText}>Close</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Modal>

                <Modal
                    animationType="fade"
                    transparent={true}
                    visible={hintModalVisible}
                    onRequestClose={() => setHintModalVisible(false)}
                >
                    <View style={styles.modalContainer}>
                        <View style={[styles.modalContent, {paddingTop: 20}]}>

                            <TouchableOpacity
                                style={styles.modalCloseButton}
                                onPress={() => setHintModalVisible(false)}
                            >
                                <Icons type={'close'} />
                            </TouchableOpacity>

                            <Text style={styles.modalTitle}>Select a Hint</Text>
                            <Text style={styles.modalDescription}>
                                Choose one of the hints below. Costs will be deducted from your score.
                            </Text>
                            <View style={{width: '100%', alignItems: 'center'}}>
                                <TouchableOpacity
                                    style={[
                                        styles.modalButton,
                                        { backgroundColor: score >= 50 ? '#e0bc04' : '#ccc' },
                                        {marginBottom: 15, width: '100%'}
                                    ]}
                                    disabled={score < 50}
                                    onPress={() => handleHint('removeOption')}
                                >
                                    <Text style={styles.modalButtonText}>
                                        Remove 1 Option (-50)
                                    </Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={[
                                        styles.modalButton,
                                        { backgroundColor: score >= 75 ? '#069c15' : '#ccc' },
                                        {width: '100%'}
                                    ]}
                                    disabled={score < 75}
                                    onPress={() => handleHint('skipQuestion')}
                                >
                                    <Text style={styles.modalButtonText}>
                                        Skip Question (-75)
                                    </Text>
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
        transform: [{ rotate: '180deg' }]
    },
    progressBarContainer: {
        width: "100%",
        height: 30,
        backgroundColor: "#e0e0e0",
        borderRadius: 15,
        overflow: "hidden",
        marginBottom: 20,
        position: "relative",
        borderWidth: 1,
        borderColor: '#3a6637'
    },
    progressBar: {
        height: "100%",
        backgroundColor: "#7de075",
        borderRadius: 15,
        position: "absolute",
        top: 0,
        left: 0,
    },
    timerText: {
        position: "absolute",
        top: 0,
        left: "50%",
        transform: [{ translateX: -165 }],
        fontSize: 14,
        fontWeight: "900",
        color: "#3a6637",
        textAlign: "center",
        width: "100%",
        lineHeight: 30,
    },
    score: {
        fontSize: 22,
        fontWeight: "900",
        color: "#ff383c",
        marginRight: 10,
        zIndex: 10
    },
    scoreIcon: {
        width: 30,
        height: 30,
        zIndex: 10
    },
    iconsContainer: {
        alignItems: 'center',
        position: 'absolute',
        right: 17,
        top: height * 0.01
    },
    icon: {
        width: 60,
        height: 60,
        padding: 10,
    },
    lives: {
        position: 'absolute',
        top: 2,
        right: 2,
        backgroundColor: '#fff',
        padding: 2,
        paddingHorizontal: 5,
        borderRadius: 30,
        fontSize: 13,
        fontWeight: '800',
        color: '#3a6637'
    },
    title: {
        fontSize: 26,
        fontWeight: '900',
        color: '#7de075',
        marginBottom: height * 0.01,
        textAlign: 'center'
    },
    image: {
        width: width * 0.8,
        height: height * 0.28,
        borderRadius: 10,
        resizeMode: 'cover',
        marginBottom: height * 0.03
    },
    question: {
        fontSize: 19,
        fontWeight: "700",
        marginBottom: height * 0.02,
        textAlign: "center",
        color: '#b2deaf',
        height: height * 0.12
    },
    option: {
        width: width * 0.8,
        padding: height * 0.015,
        marginVertical: height * 0.007,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: "#3a6637",
        backgroundColor: "#a4d6a1",
    },
    optionText: {
        fontSize: 16,
        textAlign: "center",
        color: '#3a6637',
        fontWeight: '600'
    },
    correctOption: {
        borderColor: "green",
        backgroundColor: "rgba(0, 255, 0, 0.2)",
    },
    wrongOption: {
        borderColor: "red",
        backgroundColor: "rgba(255, 0, 0, 0.2)",
    },
    completedText: {
        fontSize: 24,
        fontWeight: "800",
        textAlign: "center",
        color: "#b2deaf",
        marginBottom: height * 0.03
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
    },
    modalContent: {
        width: '80%',
        padding: 20,
        paddingTop: 40,
        borderRadius: 16,
        backgroundColor: '#fff',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 20,
            height: 20,
        },
        shadowOpacity: 0.2,
        shadowRadius: 4,
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#3a6637',
        textAlign: 'center',
    },
    modalDescription: {
        fontSize: 16,
        color: '#555',
        textAlign: 'center',
        marginBottom: 20,
    },
    modalCloseButton: {
        width: 30,
        height: 30,
        position: 'absolute',
        top: 5,
        right: 5
    },
    modalButtonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
        width: '100%',
        alignSelf: 'center',
    },
    modalButton: {
        padding: 7,
        borderRadius: 10,
        width: '47%',
        alignItems: 'center',
    },
    modalButtonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
});

export default LegendsQuiz;
