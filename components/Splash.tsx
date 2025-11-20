import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { useVideoPlayer, VideoView } from 'expo-video';
import * as SplashScreen from 'expo-splash-screen';

type VideoSplashProps = {
  onFinish: () => void;
};

export default function VideoSplash({ onFinish }: VideoSplashProps) {
  const player = useVideoPlayer(require('@/assets/images/intro.mp4'), (player) => {
    player.loop = false;
    player.play();
  });

  useEffect(() => {
    SplashScreen.hideAsync();

    const subscription = player.addListener('playToEnd', () => {
      onFinish();
    });

    return () => {
      subscription.remove();
    };
  }, [player, onFinish]);

  return (
    <View style={styles.container}>
      <VideoView 
        style={styles.video} 
        player={player} 
        contentFit="cover"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  video: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
});