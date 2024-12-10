import React,
{ useState, useEffect, useRef } 
from 'react';
// import { Animated, View, ImageBackground, StyleSheet } from 'react-native';
import { enableScreens } from 'react-native-screens';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { MusicProvider } from './src/constants/music';
import MusicPlayer from './src/components/MusicPlayer';

import HomeScreen from './src/screens/HomeScreen';
import AchievementsScreen from './src/screens/AchievementsScreen';
import SettingsScreen from './src/screens/SettingsScreen';
import ModeScreen from './src/screens/ModeScreen';
import TopicsScreen from './src/screens/TopicsScreen';
import DiscoveryQuizScreen from './src/screens/DiscoveryQuizScreen';

import WelcomeModal from './src/components/WelcomeModal';

enableScreens();

const Stack = createStackNavigator();

const App = () => {
    // const [loaderIsEnded, setLoaderIsEnded] = useState(false);
    // const [prog, setProg] = useState(0);
  
    // const firstImageAnim = useRef(new Animated.Value(0)).current;
    // const loaderImageAnim = useRef(new Animated.Value(0)).current;

    // const firstLoaderImage = require('./src/assets/newDiz/loader1.jpg');
    // const loaderImage = require('./src/assets/newDiz/loader2.jpg');

    // useEffect(() => {
    //     Animated.timing(firstImageAnim, {
    //         toValue: 1,
    //         duration: 1500,
    //         useNativeDriver: true,
    //     }).start(() => {
    //             Animated.timing(loaderImageAnim, {
    //                 toValue: 1,
    //                 duration: 2000,
    //                 useNativeDriver: true,
    //             }).start(() => {
    //                     setLoaderIsEnded(true);
    //             });
    //     });
    // }, []);

    const [welcomeModalVisible, setWelcomeModalVisible] = useState(true);

    const handleWelcomeVisible = () => {
        setWelcomeModalVisible(!welcomeModalVisible);
    };
  
    return (
        <MusicProvider>
            <MusicPlayer />
                <NavigationContainer>
                {/* {
                    !loaderIsEnded ? (
                        <View style={{ flex: 1 }}>
                            <ImageBackground style={{ flex: 1 }} source={loaderImage}>
                                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>

                                    <Animated.View style={[styles.imageContainer, { opacity: firstImageAnim }]}>
                                        <ImageBackground source={firstLoaderImage} style={styles.image} />
                                    </Animated.View>

                                    <Animated.View style={[styles.imageContainer, { opacity: loaderImageAnim }]}>
                                        <ImageBackground source={loaderImage} style={styles.image} />
                                    </Animated.View>
                                    
                                </View>
                            </ImageBackground>
                        </View>
                    ) : ( */}
                        <WelcomeModal visible={welcomeModalVisible} onClose={handleWelcomeVisible}/>
                        <Stack.Navigator initialRouteName="HomeScreen">
                            <Stack.Screen 
                                name="HomeScreen" 
                                component={HomeScreen} 
                                options={{ headerShown: false }} 
                            />
                            <Stack.Screen 
                                name="AchievementsScreen" 
                                component={AchievementsScreen} 
                                options={{ headerShown: false }} 
                            />
                            <Stack.Screen 
                                name="SettingsScreen" 
                                component={SettingsScreen} 
                                options={{ headerShown: false }} 
                            />
                            <Stack.Screen 
                                name="ModeScreen" 
                                component={ModeScreen} 
                                options={{ headerShown: false }} 
                            />
                            <Stack.Screen 
                                name="TopicsScreen" 
                                component={TopicsScreen} 
                                options={{ headerShown: false }} 
                            />
                            <Stack.Screen 
                                name="DiscoveryQuizScreen" 
                                component={DiscoveryQuizScreen} 
                                options={{ headerShown: false }} 
                            />
                        </Stack.Navigator>
                        {/* )
                    } */}
                </NavigationContainer>
        </MusicProvider>
    );
};

// const styles = StyleSheet.create({
//     imageContainer: {
//         flex: 1,
//         justifyContent: 'center',
//         alignItems: 'center',
//         position: 'absolute',
//         width: '100%',
//         height: '100%',
//     },
//     image: {
//         width: '100%',
//         height: '100%',
//         justifyContent: 'center',
//         alignItems: 'center',
//     },
// });


export default App;
