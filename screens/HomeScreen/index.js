import React, { useState, useEffect } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  FlatList,
  TextInput,
} from 'react-native';
import { getCharacterData, getEpisodeData } from '../../services/index';
import axios from 'axios';

const HomeScreen = () => {
  const [characters, setCharacters] = useState(null);
  // const [episode, setEpisode] = useState(null);
  const [loading, setLoading] = useState(false);
  const [inputText, setInputText] = useState('');
  const [charactersUnfiltered, setCharactersUnfiltered] = useState(null);
  const [searchResultStatus, setSearchResultStatus] = useState(false);

  const handleFilter = (text) => {
    setInputText(text);

    if (text !== '') {
      let searchedCharacterList = charactersUnfiltered.filter((item) =>
        item.name.toLowerCase().includes(text.toLowerCase()) ? item : null
      );
      setCharacters(searchedCharacterList);
      if (searchedCharacterList.length === 0) {
        setSearchResultStatus(true);
      }
      console.log('value===>', text);
    } else {
      setCharacters(charactersUnfiltered);
    }
  };

  //fetches the character data from the api
  const fetchCharactersData = async () => {
    setLoading(true);
    const fetchedCharactersData = await getCharacterData();
    setCharacters(fetchedCharactersData.results);
    setCharactersUnfiltered(fetchedCharactersData.results);
    setLoading(false);
  };
  
  useEffect(() => {
    fetchCharactersData();
  }, []);

  const CharacterItem = ({ characterDetails }) => {
    //Api call for episode name
    const [episodeName, setEpisodeName] = useState();
    axios.get(characterDetails.episode[0]).then((response) => {
      console.log(response);
      setEpisodeName(response.data.name);
    });

    return (
      <View style={styles.root}>
        <Image style={styles.image} source={{ uri: characterDetails.image }} />
        <View style={styles.rightContainer}>
          <Text style={{ fontSize: 16, fontWeight: 'bold' }} numberOfLines={2}>
            {characterDetails.name}
          </Text>
          <Text style={{ fontSize: 12, fontWeight: 'bold' }}>{characterDetails.gender}</Text>
          <Text style={{ fontSize: 14,fontWeight: 'bold' , color:characterDetails.status =="Alive" ?"green" :"red" }}>{characterDetails.status}</Text>
          <Text style={styles.episode} >
            First seen in
          </Text>
          <Text numberOfLines={2}> "{episodeName}"</Text>
        </View>
      </View>
    );
  };
  return (
    <View style={styles.page}>
      <TextInput
        value={inputText}
        onChangeText={(text) => {
          handleFilter(text);
        }}
        placeholder={'Search Your Favourite Character'}
        style={styles.textInput}
      />

      <FlatList
        data={characters}
        renderItem={({ item }) => <CharacterItem characterDetails={item} />}
        keyExtractor={({ id }, index) => `${id}${index}`}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  page: {
    padding: 10,
  },
  root: {
    flexDirection: 'row',
    margin: 5,
    marginHorizontal: 5,
    borderWidth: 2,
    borderColor: 'black',
    borderRadius: 8,
    elevation: 4,
  },
  image: {
    flex: 3,
    height: 150,
  },
  rightContainer: {
    padding: 10,
    backgroundColor: 'yellow',
    flex: 3,
  },
  episode: {
    paddingVertical: 5,
    marginTop: 5,
    fontSize: 15,
  },

  textInput: {
    height: 50,
    padding: 5,
    marginHorizontal: 5,
    borderWidth: 2,
    borderRadius: 10,
    textAlign: 'left',
    backgroundColor:"lightgrey"
  },
});
export default HomeScreen;
