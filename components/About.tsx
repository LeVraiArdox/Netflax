import React, { useState } from 'react';
import { StyleSheet, Image, Pressable } from 'react-native';

import { Text, View } from './Themed';

import { Episode } from './Series';

import Colors from '@/constants/Colors';
import { useColorScheme } from '@/components/useColorScheme';

import VideoScreen from './Video';

export default function About({ title, description, director, episodesInfos, image, type }: { title: string; description: string; director: string; episodesInfos: Episode[]; image: string; type: string }) {
  const episodeList: Array<Episode> = episodesInfos !== undefined ? Array.isArray(episodesInfos) ? episodesInfos : JSON.parse(episodesInfos as unknown as string) : [];
  const [videoIndex, setVideoIndex] = useState(0);
  return (
      <View style={styles().getStartedContainer}>
        <Image source={{ uri: image || require("@/assets/images/placeholder.png") }} style={styles().image} />

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
    </View>
  );
}

const styles = () => {
  const colorScheme = useColorScheme();
  return StyleSheet.create({
    getStartedContainer: {
        alignItems: 'center',
        marginHorizontal: 50,
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
        width: 300,
    },
  });
}