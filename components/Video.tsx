import { useVideoPlayer, VideoView } from 'expo-video';
import { StyleSheet, View } from 'react-native';

const videoSources = [
    'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    'https://storage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
    'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    ];

export default function VideoScreen({ videoIndex = 0 }: { videoIndex?: number }) {
  const player = useVideoPlayer(videoSources[videoIndex], player => {
    player.loop = false;
    player.play();
  });

  return (
    <View style={styles.contentContainer}>
      <VideoView style={styles.video} player={player} allowsFullscreen allowsPictureInPicture />
    </View>
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    borderRadius: 10,
    overflow: 'hidden',
    marginTop: 20,
  },
  video: {
    width: 350,
    height: 275,
  },
});
