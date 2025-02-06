import { View, Text, Linking, StyleSheet } from 'react-native'
import React from 'react'

const parseAndRenderText = (text: string) => {
  if (!text) {
    return null;
  }
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  const parts = text.split(urlRegex);

  return parts.map((part, index) => {
    if (urlRegex.test(part)) {
      const url = part.startsWith('http') ? part : `https://${part}`;
      return (
        <Text key={index} style={styles.linkText} onPress={() => Linking.openURL(url)}>
          {part}
        </Text>
      );
    }
    return <Text key={index}>{part}</Text>;
  });
};

const styles = StyleSheet.create({
  linkText: {
    fontSize: 16,
    color: '#6200ee',
    textDecorationLine: 'underline',
  },
});

export default parseAndRenderText;