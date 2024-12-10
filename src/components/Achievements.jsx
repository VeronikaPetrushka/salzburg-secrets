import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, Dimensions, ImageBackground, TouchableOpacity, Share, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import Icons from './Icons';

const { height, width } = Dimensions.get('window');

const avatars = [
  require('../assets/avatar/1.png'),
  require('../assets/avatar/2.png'),
  require('../assets/avatar/3.png'),
  require('../assets/avatar/4.png'),
  require('../assets/avatar/5.png'),
  require('../assets/avatar/6.png'),
  require('../assets/avatar/7.png'),
  require('../assets/avatar/8.png'),
  require('../assets/avatar/9.png'),
  require('../assets/avatar/10.png'),
]

const Achievements = () => {
  const navigation = useNavigation();
  const [totalScore, setTotalScore] = useState(0);
  const [users, setUsers] = useState([]);

  const generateRandomName = () => {
    const firstNames = [
        'Sophia', 'Emma', 'Isabella', 'Olivia', 'Ava', 'Mia', 
        'Charlotte', 'Amelia', 'Harper', 'Evelyn', 'Aria', 'Scarlett', 
        'Luna', 'Layla', 'Zoe', 'Lily', 'Ella', 'Chloe', 
        'Aubrey', 'Aurora', 'Violet', 'Penelope', 'Hazel', 'Sadie', 
        'Paisley', 'Ellie', 'Nora', 'Isla', 'Mila', 'Rose'
    ];
        
    const lastNames = [
        'Anderson', 'Thomas', 'Taylor', 'White', 'Harris', 'Clark', 
        'Lewis', 'Young', 'Walker', 'Hall', 'Allen', 'King', 
        'Wright', 'Scott', 'Green', 'Adams', 'Baker', 'Gonzalez',
        'Nelson', 'Carter', 'Mitchell', 'Perez', 'Roberts', 'Turner',
        'Phillips', 'Campbell', 'Parker', 'Evans', 'Edwards', 'Collins'
    ];
    const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
    const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
    return `${firstName} ${lastName}`;
  };

  const generateUsers = () => {
    const generatedUsers = [];
    for (let i = 0; i < 10; i++) {
      const user = {
        name: generateRandomName(),
        score: Math.floor(Math.random() * (11500) + 500),
        avatar: avatars[Math.floor(Math.random() * avatars.length)],
      };
      generatedUsers.push(user);
    }
    setUsers(generatedUsers);
  };

  useEffect(() => {
    const fetchTotalScore = async () => {
      const score = await AsyncStorage.getItem('totalScore');
      setTotalScore(score ? parseInt(score) : 0);
    };

    fetchTotalScore();
    generateUsers();
  }, []);

  const handleShare = async () => {
    try {
      const result = await Share.share({
        message: `Look, I scored ${totalScore} points at 'Salzburg: City of Secrets'! Can you beat my score? Join and find out hidden gems of Salzburg !`,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          console.log('Shared with activity type:', result.activityType);
        } else {
          console.log('Shared successfully!');
        }
      } else if (result.action === Share.dismissedAction) {
        console.log('Share dismissed');
      }
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  return (
    <ImageBackground source={require('../assets/back/1.png')} style={{flex: 1, transform: [{ rotate: '180deg' }]}}>
        <View style={styles.container}>
        <TouchableOpacity style={styles.back} onPress={() => navigation.goBack()}>
            <Icons type={"home"} />
        </TouchableOpacity>
        <View style={{flexDirection: 'row', alignItems: 'center', marginBottom: height * 0.03}}>
            <Text style={styles.totalScore}>{totalScore}</Text>
            <View style={{width: 40, height: 40, marginLeft: 10}}>
                <Icons type={'score'} />
            </View>
        </View>
        
        <FlatList
            data={users}
            renderItem={({ item }) => (
            <View style={styles.userContainer}>
                <Image source={item.avatar} style={{width: 50, height: 50}} />
                <Text style={styles.userName}>{item.name}</Text>
                <Text style={styles.userScore}>{item.score}</Text>
            </View>
            )}
            keyExtractor={(item, index) => index.toString()}
            contentContainerStyle={styles.list}
        />

        <TouchableOpacity style={styles.shareButton} onPress={handleShare}>
            <Text style={styles.shareButtonText}>Share reached score</Text>
        </TouchableOpacity>
        </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'flex-start',
        padding: 20,
        paddingTop: height * 0.07,
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
  totalScore: {
    fontSize: 26,
    fontWeight: '900',
    color: '#65fc5b',
  },
  list: {
    width: width * 0.87,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  userContainer: {
    width: height * 0.23,
    height: height * 0.23,
    padding: 15,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 120,
    borderWidth: 3,
    borderColor: '#19a616',
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  userName: {
    fontSize: 15,
    fontWeight: '600',
    color: '#065201',
    textAlign: 'center'
  },
  userScore: {
    fontSize: 18,
    color: '#555',
    fontWeight: '800'
  },
  shareButton: {
    width: 220,
    backgroundColor: '#65fc5b',
    borderRadius: 25,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: '#065201'
  },
  shareButtonText: {
    color: '#065201',
    fontWeight: '800',
    fontSize: 16,
  },
});

export default Achievements;
