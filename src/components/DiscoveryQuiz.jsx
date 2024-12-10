import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, ImageBackground, Image, StyleSheet, Dimensions } from "react-native";
import Icons from "./Icons";

const { height, width } = Dimensions.get("window");

const DiscoveryQuiz = ({ quiz }) => {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedOption, setSelectedOption] = useState(null);
    const [timeLeft, setTimeLeft] = useState(150);
    const [progress, setProgress] = useState(1);
    const [lives, setLives] = useState(3);

    useEffect(() => {
        if (timeLeft > 0 && currentQuestionIndex !== null) {
            const timer = setInterval(() => {
                setTimeLeft((prevTime) => prevTime - 1);
                setProgress((timeLeft - 1) / 150);
            }, 1000);
    
            return () => clearInterval(timer);
        } else if (timeLeft === 0) {
            setCurrentQuestionIndex(null);
        }
    }, [timeLeft, currentQuestionIndex]);
    
    const currentQuestion = quiz.questions[currentQuestionIndex];

    const handleOptionPress = (option) => {
        setSelectedOption(option);
    
        if (option !== currentQuestion.correctOption) {
            setLives((prevLives) => prevLives - 1);
        }
    
        setTimeout(() => {
            setSelectedOption(null);
    
            if (lives - (option !== currentQuestion.correctOption ? 1 : 0) === 0) {
                setCurrentQuestionIndex(null);
            } else if (currentQuestionIndex < quiz.questions.length - 1) {
                setCurrentQuestionIndex(currentQuestionIndex + 1);
            } else {
                setCurrentQuestionIndex(null);
            }
        }, 1000);
    };
    
    return (
        <ImageBackground source={require('../assets/back/1.png')} style={{flex: 1, transform: [{ rotate: '180deg' }]}}>
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

                <Image source={quiz.image} style={styles.image} />

                {
                    currentQuestionIndex !== null && (
                        <View style={styles.iconsContainer}>
                            <TouchableOpacity style={styles.icon}>
                                <Icons type={'plus'} />
                            </TouchableOpacity>
                            <View>
                                <TouchableOpacity style={styles.icon}>
                                    <Icons type={'live'} />
                                </TouchableOpacity>
                                <Text style={styles.lives}>{lives}</Text>
                            </View>
                            <TouchableOpacity style={styles.icon}>
                                <Icons type={'hint'} />
                            </TouchableOpacity>
                        </View>    
                    )
                }

                {currentQuestionIndex !== null ? (
                    <>
                        <Text style={styles.question}>{currentQuestion.question}</Text>
                        {currentQuestion.options.map((option, index) => (
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
                    <Text style={styles.completedText}>Quiz Completed!</Text>
                )}
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
    iconsContainer: {
        alignItems: 'center',
        position: 'absolute',
        right: 35,
        top: height * 0.23
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
        marginBottom: height * 0.03
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
        fontWeight: "bold",
        textAlign: "center",
        color: "green",
    },
});

export default DiscoveryQuiz;
