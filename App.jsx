import React, { useState } from 'react';
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
import LegendsQuizScreen from './src/screens/LegendsQuizScreen';
import ArchiveScreen from './src/screens/ArchiveScreen';
import MoreScreen from './src/screens/MoreScreen';
import TastesScreen from './src/screens/TastesScreen';
import RecipeScreen from './src/screens/RecipeScreen';
import MozartScreen from './src/screens/MozartScreen';

import WelcomeModal from './src/components/WelcomeModal';

enableScreens();

const Stack = createStackNavigator();

const App = () => {
    const [modalVisible, setModalVisible] = useState(true);

    const handleModalVisible = () => {
        setModalVisible(!modalVisible);
    };
  
    return (
        <MusicProvider>
            <MusicPlayer />
                <NavigationContainer>
                    <WelcomeModal visible={modalVisible} onClose={handleModalVisible}/>
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
                        <Stack.Screen 
                            name="LegendsQuizScreen" 
                            component={LegendsQuizScreen} 
                            options={{ headerShown: false }} 
                        />
                        <Stack.Screen 
                            name="ArchiveScreen" 
                            component={ArchiveScreen} 
                            options={{ headerShown: false }} 
                        />
                        <Stack.Screen 
                            name="MoreScreen" 
                            component={MoreScreen} 
                            options={{ headerShown: false }} 
                        />
                        <Stack.Screen 
                            name="TastesScreen" 
                            component={TastesScreen} 
                            options={{ headerShown: false }} 
                        />
                        <Stack.Screen 
                            name="RecipeScreen" 
                            component={RecipeScreen} 
                            options={{ headerShown: false }} 
                        />
                        <Stack.Screen 
                            name="MozartScreen" 
                            component={MozartScreen} 
                            options={{ headerShown: false }} 
                        />
                    </Stack.Navigator>
                </NavigationContainer>
        </MusicProvider>
    );
};

export default App;
