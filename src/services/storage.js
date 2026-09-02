import AsyncStorage from "@react-native-async-storage/async-storage";

const CHAVE_STORAGE = "@mymusic:musicas";

export async function carregarMusicas() {
  try {
    const musicasSalvas = await AsyncStorage.getItem(CHAVE_STORAGE);

    if (musicasSalvas !== null) {
      return JSON.parse(musicasSalvas);
    }

    return [];
  } catch (erro) {
    console.log("Erro ao carregar músicas:", erro);
    return [];
  }
}

export async function salvarMusicas(musicas) {
  try {
    await AsyncStorage.setItem(
      CHAVE_STORAGE,
      JSON.stringify(musicas)
    );
  } catch (erro) {
    console.log("Erro ao salvar músicas:", erro);
  }
}