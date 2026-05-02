import { View, StyleSheet, Button, Text, TouchableOpacity, ScrollView, Image } from 'react-native';
import * as Speech from 'expo-speech';
import { useState, useRef } from 'react';
import { ResizeMode, Video } from 'expo-av';

export default function HomeScreen() {
    const [status, setStatus] = useState({});
    const [btnID, setBtnID] = useState<string | null>(null);

    const videoCaption = "After watching the video above, you may already have some ideas for this activity. Please proceed to the activity instructions. Good luck and have fun!";
    const videoRef = useRef(null);

    const overview = "Students measure and compare sound levels in different classroom activities.";
    const equipment = "•	Mobile phone with STEMM Lab app.";
    const instructions = "1.	Measure noise from different actions (dropping objects (pens, books) talking, walking, stamping your feet).\n2.	Record sound levels and locations.\n3.	Map loud and quiet zones.";

    const handleSpeech = (id: string, text: string) => {
        if (btnID == id) {
            Speech.stop();
            setBtnID(null);
        }
        else {
            Speech.stop();
            setBtnID(id);
            Speech.speak(text, {
                onDone: () => setBtnID(null),
                onStopped: () => setBtnID(null),
            });
        }
    };

    return (
        <View style={styles.mainContainer}>
            <View style={styles.titleContainer}>
                <Text style={styles.activityTitle}>
                    Sound Pollution Hunter
                </Text>
            </View>
            <View style={styles.content}>
                <View style={styles.videoContainer}>
                    <Video
                        ref={videoRef}
                        source={{uri: 'https://www.w3schools.com/html/mov_bbb.mp4'}}
                        style={{width: 350, height: 200}}
                        useNativeControls
                        resizeMode={ResizeMode.CONTAIN}
                        isLooping={false}
                        onPlaybackStatusUpdate={(status) => setStatus(status)}
                    />
                </View>
            </View>

            <ScrollView contentContainerStyle={styles.content}>
                <View style={styles.videoCaption}>
                    <Text style={styles.text}>
                        {videoCaption}
                    </Text>

                    <TouchableOpacity onPress={() => handleSpeech('videoCaption', videoCaption)} style={styles.speakBtn}>
                        <Text style={styles.speakBtnText}>
                            {btnID === 'videoCaption' ? "🔈" : "🔊"}
                        </Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.line} />

                <View>
                    <Text style={styles.heading}>
                        Overview
                    </Text>

                    <View style={styles.textWithAudio}>
                        <Text style={styles.text}>
                            {overview}
                        </Text>

                        <TouchableOpacity onPress={() => handleSpeech('overview', overview)} style={styles.speakBtn}>
                            <Text style={styles.speakBtnText}>
                                {btnID === 'overview' ? "🔈" : "🔊"}
                            </Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.line} />

                    <Text style={styles.heading}>
                        Equipment
                    </Text>

                    <View style={styles.textWithAudio}>
                        <Text style={styles.text}>
                            {equipment}
                        </Text>

                        <TouchableOpacity onPress={() => handleSpeech('equipment', equipment)} style={styles.speakBtn}>
                            <Text style={styles.speakBtnText}>
                                {btnID === 'equipment' ? "🔈" : "🔊"}
                            </Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.line} />

                    <Text style={styles.heading}>
                        Instructions
                    </Text>

                    <View style={styles.textWithAudio}>
                        <Text style={styles.text}>
                            {instructions}
                        </Text>

                        <TouchableOpacity onPress={() => handleSpeech('instructions', instructions)} style={styles.speakBtn}>
                            <Text style={styles.speakBtnText}>
                                {btnID === 'instructions' ? "🔈" : "🔊"}
                            </Text>
                        </TouchableOpacity>
                    </View>
                    
                    <View style={styles.line} />

                    <Text style={styles.heading}>
                        Diagram
                    </Text>

                    <Image 
                        source={require('../assets/images/diag.png')} 
                        style={styles.image} 
                    />
                </View>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    mainContainer: {
        backgroundColor: 'white',
        flex: 1,
    },

    titleContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: 50,
        backgroundColor: '#d9d9d9'
    },

    activityTitle: {
        fontSize: 20,
        fontWeight: 'bold',
    },

    content: {
        backgroundColor: 'white',
        margin: 30,
    },

    videoContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

    videoCaption: {
        flexDirection: 'row',
        gap: 15,
        alignItems: 'center',
        justifyContent: 'center',
    },

    textWithAudio: {
        flexDirection: 'row',
        gap: 15,
        alignItems: 'center',
    },

    text: {
        fontSize: 16,
    },

    heading: {
        fontSize: 18,
        fontWeight: 'bold',
    },

    buttonContainer: {
        width: 35,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'stretch',
    },

    speakBtn: {
        padding: 8,
        justifyContent: 'center',
        alignItems: 'center',
    },

    speakBtnText: {
        fontSize: 24,
    },

    line: {
        height: 1,
        backgroundColor: '#CCCCCC',
        width: '100%',
        marginVertical: 10,
    },

    image: {
        height: 500,
        width: 500,
        margin: 10,
    },
});