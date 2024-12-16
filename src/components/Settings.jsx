import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, Vibration, Dimensions, ImageBackground, Image, TextInput, ScrollView } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useMusic } from '../constants/music.js';
import Icons from './Icons.jsx';

const { height } = Dimensions.get('window');

const Settings = () => {
    const { isPlaying, togglePlay } = useMusic();
    const [showResetConfirmation, setShowResetConfirmation] = useState(false);
    const [vibrationEnabled, setVibrationEnabled] = useState(true);
    const [name, setName] = useState("");
    const [age, setAge] = useState(null);
    const [uploadedImage, setUploadedImage] = useState({ uri: Image.resolveAssetSource(require('../assets/avatar/user.png')).uri });
    const [buttonText, setButtonText] = useState("Create account");
    const [errorName, setErrorName] = useState("");
    const [errorAge, setErrorAge] = useState("");
  
    const loadProfile = async () => {
        try {
          const storedData = await AsyncStorage.getItem('userProfile');
          const storedImageUri = await AsyncStorage.getItem('uploadedImage');
  
          if (storedData) {
            const parsedData = JSON.parse(storedData);
            setName(parsedData.name);
            setAge(parsedData.age);
            setButtonText("Save changes");
          } else {
            setName("");
            setAge(null);
            setButtonText("Create account");
          }
  
          if (storedImageUri) {
            setUploadedImage({ uri: storedImageUri });
          } else {
            setUploadedImage({ uri: Image.resolveAssetSource(require('../assets/avatar/user.png')).uri });
          }
  
          setErrorName("");
          setErrorAge("");
        } catch (error) {
          console.error('Error loading user profile:', error);
        }
      };

      useEffect(() => {  

        loadProfile();
        loadSettings();
        
    }, []);
  
    const handleNameChange = (text) => {
      setName(text);
    };
  
    const handleAgeChange = (text) => {
      setAge(text)
    };
  
    const handleSubmit = async () => {
      if (name.length > 13) {
        setErrorName("Name cannot exceed 13 characters.");
        return;
      }
  
      const numericAge = parseInt(age, 10);
      if (!numericAge || numericAge <= 0) {
          setErrorAge("Age must be a valid positive number.");
          return;
      }
  
      try {
          await AsyncStorage.setItem('userProfile', JSON.stringify({ name, age }));
  
        if (uploadedImage.uri) {
          await AsyncStorage.setItem('uploadedImage', uploadedImage.uri);
      }
  
        console.log('User profile saved successfully!');
        setButtonText("Save changes");
      } catch (error) {
        console.error('Error saving user profile:', error);
      }
    };
  
    const uploadImageFromLibrary = () => {
      launchImageLibrary(
        { mediaType: 'photo', quality: 1 },
        (response) => {
          if (response.didCancel) {
            console.log('User cancelled image picker');
          } else if (response.errorMessage) {
            Alert.alert('Error', response.errorMessage);
          } else {
            const imageUri = response.assets[0].uri;
            setUploadedImage({uri: imageUri});
          }
        }
      );
    };  

    const loadSettings = async () => {
            try {
                const storedVibration = await AsyncStorage.getItem('vibrationEnabled');
                if (storedVibration !== null) {
                    setVibrationEnabled(JSON.parse(storedVibration));
                }
            } catch (error) {
                console.log('Error loading settings:', error);
            }
        };

    const handleToggleLoudness = async () => {
        togglePlay();
    };

    const handleToggleVibration = async () => {
        const newVibrationState = !vibrationEnabled;
        setVibrationEnabled(newVibrationState);

        try {
            await AsyncStorage.setItem('vibrationEnabled', JSON.stringify(newVibrationState));
            if (newVibrationState) {
                Vibration.vibrate();
            }
        } catch (error) {
            console.log('Error saving vibration setting:', error);
        }
    };

    const handleReset = async () => {
        try {
            await AsyncStorage.setItem('userProfile', "");
            await AsyncStorage.removeItem('uploadedImage');
            await AsyncStorage.removeItem('totalScore');
            await AsyncStorage.removeItem('archive');
            await AsyncStorage.removeItem('purchasedItems');
            await AsyncStorage.removeItem('ingredients');
            await AsyncStorage.removeItem('preparation');
            await AsyncStorage.removeItem('purchasedStories');
            await AsyncStorage.removeItem('rewardTimer');

            setShowResetConfirmation(false);

            Alert.alert('Progress Reset', 'Your progress has been reset successfully!', [
                { text: 'OK', onPress: () => console.log('OK Pressed') }
            ]);

            if (vibrationEnabled) {
                Vibration.vibrate();
            }

            await loadProfile(); 
            await loadSettings();

        } catch (error) {
            console.error('Error resetting progress:', error);
            Alert.alert('Error', 'There was a problem resetting your progress. Please try again later.');
        }
    };

    return (
        <ImageBackground source={require('../assets/back/2.png')} style={{flex: 1, transform: [{ rotate: '180deg' }]}}>
            <View style={styles.container}>
                {showResetConfirmation ? (
                    <>
                        <Text style={styles.confirmationText}>
                        Are you sure you want to reset your account? This action will delete your profile, including your user name, uploaded photo, score,archive, and purchased articles!
                        </Text>
                        <TouchableOpacity style={styles.resetBtn} onPress={handleReset}>
                            <Text style={styles.btnText}>Reset</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.cancelReset} onPress={() => setShowResetConfirmation(false)}>
                            <Text style={styles.cancelBtnText}>Close</Text>
                        </TouchableOpacity>
                    </>
                ) : (
                    <>
                        <Text style={styles.title}>Settings</Text>

                        <ScrollView style={{width: '100%'}}>

                            <View style={[styles.avatarPlaceholder, uploadedImage && styles.imagePlaceholder]}>
                            <Image source={uploadedImage} style={styles.uploadedAvatarImage} />
                        </View>
                        <TouchableOpacity style={styles.btnUploadImage} onPress={uploadImageFromLibrary}>
                            <Text style={[styles.btnText, {color: '#63cc58'}]}>Upload photo</Text>
                        </TouchableOpacity>

                            <View style={styles.inputContainer}>
                            <TextInput
                                value={name}
                                placeholder="Enter your name"
                                placeholderTextColor="#9af294"
                                onChangeText={handleNameChange}
                                style={styles.input}
                            />
                            {errorName ? (
                                <Text style={styles.errorText}>{errorName}</Text>
                            ) : null}
                            <TextInput
                                value={age}
                                placeholder="Enter your age"
                                placeholderTextColor="#9af294"
                                onChangeText={handleAgeChange}
                                style={styles.input}
                            />
                            {errorAge ? (
                                <Text style={styles.errorText}>{errorAge}</Text>
                            ) : null}
                            <TouchableOpacity style={styles.btnCreate} onPress={handleSubmit}>
                                <Text style={styles.btnCreateText}>{buttonText}</Text>
                            </TouchableOpacity>
                            </View>

                            <View style={styles.regulatorContainer}>
                                <View style={[{width: 60, height: 60}, !isPlaying && {opacity: 0.4}]}>
                                    <Icons type={'music'} />
                                </View>
                                <Text style={[styles.toggleText, isPlaying ? styles.toggleTextOn : styles.toggleTextOff]}>
                                    {isPlaying ? 'On' : 'Off'}
                                </Text>
                                <TouchableOpacity style={[styles.toggleContainer, isPlaying ? styles.toggleContainer : styles.toggleContainerOff]} onPress={handleToggleLoudness}>
                                    <View style={[styles.toggle, isPlaying ? styles.toggleOn : styles.toggleOff]}></View>
                                </TouchableOpacity>
                            </View>

                            <View style={styles.regulatorContainer}>
                                <View style={[{width: 60, height: 60}, !vibrationEnabled && {opacity: 0.4}]}>
                                    <Icons type={'vibration'} />
                                </View>
                                <Text style={[styles.toggleText, vibrationEnabled ? styles.toggleTextOn : styles.toggleTextOff]}>
                                    {vibrationEnabled ? 'On' : 'Off'}
                                </Text>
                                <TouchableOpacity style={[styles.toggleContainer, vibrationEnabled ? styles.toggleContainer : styles.toggleContainerOff]} onPress={handleToggleVibration}>
                                    <View style={[styles.toggle, vibrationEnabled ? styles.toggleOn : styles.toggleOff]}></View>
                                </TouchableOpacity>
                            </View>

                            <View style={{height: height * 0.02}} />

                            <TouchableOpacity style={styles.resetBtn} onPress={() => setShowResetConfirmation(true)}>
                                <Text style={styles.btnText}>Reset</Text>
                            </TouchableOpacity>

                        </ScrollView>

                    </>
                )}
            </View>
        </ImageBackground>
    );
};



const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        padding: 20,
        paddingTop: height * 0.08,
        paddingBottom: height * 0.12,
        alignItems: 'center',
        justifyContent: 'flex-start',
        transform: [{ rotate: '180deg' }]
    },
    title: {
        fontWeight: '900',
        fontSize: 30,
        textAlign: 'center',
        marginBottom: height * 0.06,
        color: '#7de075',
    },
    regulatorContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        justifyContent: 'space-around',
        marginBottom: height * 0.04,
    },
    regulatorText: {
        fontSize: 22,
        textAlign: 'center',
        fontWeight: 'bold',
        color: '#19fa02'
    },
    toggleContainer: {
        padding: 7,
        width: 100,
        height: 50,
        alignItems: 'center',
        borderWidth: 1,
        borderRadius: 30,
        borderColor: '#19fa02',
    },
    toggleContainerOff: {
        borderColor: '#728f77',
    },
    toggleText: {
        fontSize: 16,
    },
    toggleTextOn: {
        color: '#19fa02',
    },
    toggleTextOff: {
        color: '#728f77',
    },
    toggle: {
        borderRadius: 30,
        width: '45%',
        height: '100%',
    },
    toggleOn: {
        backgroundColor: '#19fa02',
        alignSelf: 'flex-end',
    },
    toggleOff: {
        backgroundColor: '#728f77',
        alignSelf: 'flex-start',
    },
    btnText: {
        fontSize: 19,
        fontWeight: '800',
        color: '#306e29',
    },
    resetBtn: {
        width: '100%',
        padding: 15,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 30,
        borderWidth: 3,
        borderColor: '#306e29',
        backgroundColor: '#63cc58',
    },
    confirmationText: {
        fontSize: 20,
        fontWeight: '500',
        textAlign: 'center',
        marginBottom: height * 0.1,
        marginTop: height * 0.15,
        color: '#7be070',
        backgroundColor: '#20421d',
        borderRadius: 10,
        padding: 10
    },
    cancelReset: {
        width: '100%',
        borderColor: '#63cc58',
        borderWidth: 3,
        borderRadius: 30,
        padding: 15,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: height * 0.02
    },
    cancelBtnText: {
        fontSize: 19,
        fontWeight: '800',
        color: '#63cc58',
    },
    upperContainer: {
        width: "100%",
        padding: 20,
        alignItems: "center"
      }, 
    
      avatarPlaceholder: {
        width: 150,
        height: 150,
        borderRadius: 100,
        overflow: 'hidden',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
        marginBottom: 20,
        alignSelf: 'center'
      },
    
      imagePlaceholder: {
        padding: 0
      },
    
      uploadedAvatarImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover'
      },
    
      inputContainer: {
        width: "100%",
        justifyContent: "space-between"
      },
    
      input: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        marginVertical: height * 0.01,
        borderWidth: 1,
        borderColor: "#9af294",
        borderRadius: 10,
        width: "100%",
        fontSize: 17,
        color: '#10d602',
      },
    
      btnCreate: {
        width: '100%',
        padding: 15,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 30,
        borderWidth: 3,
        borderColor: '#63cc58',
        backgroundColor: '#306e29',
        marginBottom: height * 0.05,
        marginTop: height * 0.03
      },
    
      btnCreateText: {
        fontSize: 18,
        color: '#63cc58',
        fontWeight: '800'
      },
    
      btnUploadImage: {
        padding: 10,
        paddingHorizontal: 20,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 2,
        borderColor: '#63cc58',
        borderRadius: 10,
        width: '100%',
        marginBottom: 20
      },
    
      errorText: {
        color: '#63cc58',
        fontSize: 14,
        position: 'absolute',
        top: 100
      }    
});

export default Settings;
