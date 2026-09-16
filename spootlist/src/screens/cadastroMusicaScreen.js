import { useState } from "react";

import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";

import { carregarMusicas, salvarMusicas } from "../services/storage";

export default function CadastroMusicaScreen({ navigation }) {
  const [titulo, setTitulo] = useState("");
  const [artista, setArtista] = useState("");
  const [genero, setGenero] = useState("");
  const [link, setLink] = useState("");

  async function cadastrarMusica() {
    if (titulo.trim() === "" || artista.trim() === "" || genero.trim() === "") {
      Alert.alert("Atenção", "Preencha todos os campos.");

      return;
    }

    const musicas = await carregarMusicas();

    const novaMusica = {
      id: Date.now().toString(),
      titulo: titulo.trim(),
      artista: artista.trim(),
      genero: genero.trim(),
      link: link.trim(),
      concluida: false,
    };

    const novasMusicas = [...musicas, novaMusica];

    await salvarMusicas(novasMusicas);

    navigation.goBack();
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.conteudo}
    >
      <Text style={styles.label}>Nome da música</Text>

      <TextInput
        style={styles.input}
        placeholder="Ex: Bohemian Rhapsody"
        placeholderTextColor="#777"
        value={titulo}
        onChangeText={setTitulo}
      />

      <Text style={styles.label}>Artista</Text>

      <TextInput
        style={styles.input}
        placeholder="Ex: Queen"
        placeholderTextColor="#777"
        value={artista}
        onChangeText={setArtista}
      />

      <Text style={styles.label}>Gênero</Text>

      <TextInput
        style={styles.input}
        placeholder="Ex: Rock"
        placeholderTextColor="#777"
        value={genero}
        onChangeText={setGenero}
      />

      <TouchableOpacity style={styles.botao} onPress={cadastrarMusica}>
        <Text style={styles.textoBotao}>Cadastrar música</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
  },

  conteudo: {
    padding: 20,
  },

  label: {
    color: "#FFFFFF",
    fontSize: 16,
    marginBottom: 8,
    marginTop: 10,
  },

  input: {
    backgroundColor: "#282828",
    color: "#FFFFFF",
    padding: 15,
    borderRadius: 10,
    fontSize: 16,
  },

  botao: {
    backgroundColor: "#1DB954",
    padding: 16,
    borderRadius: 30,
    alignItems: "center",
    marginTop: 30,
  },

  textoBotao: {
    color: "#000000",
    fontWeight: "bold",
    fontSize: 16,
  },
});
