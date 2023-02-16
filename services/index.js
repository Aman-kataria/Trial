import axios from "axios";

export const getCharacterData = async () => {
  try {
    const response = await axios.get(
      `https://rickandmortyapi.com/api/character`
    );
    return response.data;
  } catch (e) {
    console.log(e);
  }
};
export const getEpisodeData = async (Id) => {
  try {
    const response = await axios.get(
       `${Id}`
      //"https://rickandmortyapi.com/api/episode/1"

    );
    return response.data;
  } catch (e) {
    console.log(e);
  }
};