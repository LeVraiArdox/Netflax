import React, { useState } from 'react';
import { StyleSheet, Image, Pressable } from 'react-native';

import { Text, View } from './Themed';

import { Episode } from './Series';

import Colors from '@/constants/Colors';
import { useColorScheme } from '@/components/useColorScheme';

import VideoScreen from './Video';

export default function About({ description, episodesInfos, image }: { description: string; episodesInfos?: Episode[]; image: string }) {
  const episodeList: Array<Episode> = episodesInfos !== undefined ? Array.isArray(episodesInfos) ? episodesInfos : JSON.parse(episodesInfos as unknown as string) : [];
  const [videoIndex, setVideoIndex] = useState(0);

  const placeHolderComments = [
    { user: 'User1', comment: 'Great content!' },
    { user: 'User2', comment: 'Really enjoyed this series.' },
    { user: 'User3', comment: 'Looking forward to more episodes!' },
  ];
  return (
      <View style={styles().container}>
        <Image source={image ? { uri: image } : require("@/assets/images/placeholder.png")} style={styles().image} />

        <View style={{ marginVertical: 20 }}></View>

        <Text style={styles().text}>
            {description}
        </Text>
        <View style={{ marginVertical: 10 }}></View>

        {episodeList.length > 0 && (
            <>
                <Text style={[styles().text, { fontWeight: 'bold', marginBottom: 10 }]}>Episodes:</Text>

                <View>
                    {episodeList.map((episode: { title: string; duration: string; description: string }) => (
                        <Pressable style={styles().episodeBox} key={episode.title} onPress={() => {
                            const index = episodeList.findIndex((ep) => ep.title === episode.title);
                            setVideoIndex(index);
                        }}>
                            <Text style={[styles().text, { fontWeight: '600', marginBottom: 5 }]}>{episode.title} ({episode.duration})</Text>
                            <Text style={styles().subText}>{episode.description}</Text>
                        </Pressable>
                    ))}
                </View>
            </>
        )}

        <VideoScreen videoIndex={videoIndex} />

        <View style={styles().commentsContainer}>
            <Text style={[styles().text, { fontWeight: 'bold', marginBottom: 10 }]}>Commentaires:</Text>
            {placeHolderComments.map((comment, index) => (
                <View key={index} style={{ flexDirection: 'row', marginBottom: 10 }}>
                    <Image source={require('@/assets/images/avatar_placeholder.png')} style={styles().commentAvatar} />
                    <View>
                        <Text style={styles().commentAuthor}>{comment.user}</Text>
                        <Text style={styles().commentText}>{comment.comment}</Text>
                    </View>
                </View>
            ))}
        </View>

        <View style={{ height: 30 }}></View>
    </View>
  );
}

const styles = () => {
  const colorScheme = useColorScheme();
  return StyleSheet.create({
    container: {
        alignItems: 'center',
    },
    homeScreenFilename: {
        marginVertical: 7,
    },
    codeHighlightContainer: {
        borderRadius: 3,
        paddingHorizontal: 4,
    },
    text: {
        fontSize: 17,
        textAlign: 'center',
        color: Colors[colorScheme ?? 'light'].onSecondaryContainer,
    },
    subText: {
        fontSize: 15,
        textAlign: 'center',
        color: Colors[colorScheme ?? 'light'].onSecondaryContainer,
    },
    helpContainer: {
        marginTop: 15,
        marginHorizontal: 20,
        alignItems: 'center',
    },
    helpLink: {
        paddingVertical: 15,
    },
    helpLinkText: {
        textAlign: 'center',
    },
    image: {
        width: 250,
        height: 375,
        borderRadius: 10,
        alignSelf: 'center',
    },
    episodeBox: {
        marginBottom: 2,
        backgroundColor: Colors[colorScheme ?? 'light'].surfaceContainerLow,
        padding: 10,
        borderRadius: 5,
        width: 350,
    },
    commentsContainer: {
        marginTop: 20,
        width: 350,
        backgroundColor: Colors[colorScheme ?? 'light'].surfaceContainerLow,
        borderRadius: 10,
        padding: 10,
    },
    commentAvatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginRight: 10,
    },
    commentAuthor: {
        fontSize: 16,
        fontWeight: '600',
        color: Colors[colorScheme ?? 'light'].onSurface,
    },
    commentText: {
        fontSize: 15,
        color: Colors[colorScheme ?? 'light'].onSurfaceVariant,
    },
  });
}