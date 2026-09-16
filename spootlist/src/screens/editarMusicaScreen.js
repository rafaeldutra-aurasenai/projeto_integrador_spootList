import { useState } from "react";

import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";

import {
  carregarMusicas,
  salvarMusicas,
} from "../services/storage";

export default function EditarMusicaScreen({
  route,
  navigation,
}) {
  const { musica } = route.params;

  const [titulo, setTitulo] = useState(musica.titulo);
  const [artista, setArtista] = useState(musica.artista);
  const [genero, setGenero] = useState(musica.genero);
  const [link, setLink] = useState(musica.link || "");

  async function salvarEdicao() {
    if (
      titulo.trim() === "" ||
      artista.trim() === "" ||
      genero.trim() === "" ||
      link.trim() === ""
    ) {
      Alert.alert(
        "Atenção",
        "Preencha todos os campos, incluindo o link da música."
      );

      return;
    }

    const linkNormalizado = link.trim();

    if (
      !linkNormalizado.startsWith("http://") &&
      !linkNormalizado.startsWith("https://")
    ) {
      Alert.alert(
        "Link inválido",
        "Digite um link começando com http:// ou https://"
      );

      return;
    }

    const musicas = await carregarMusicas();

    const novasMusicas = musicas.map((item) => {
      if (item.id === musica.id) {
        return {
          ...item,
          titulo: titulo.trim(),
          artista: artista.trim(),
          genero: genero.trim(),
          link: linkNormalizado,
        };
      }

      return item;
    });

    await salvarMusicas(novasMusicas);

    navigation.goBack();
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.conteudo}
    >
      <Text style={styles.label}>
        Nome da música
      </Text>

      <TextInput
        style={styles.input}
        value={titulo}
        onChangeText={setTitulo}
        placeholderTextColor="#777"
      />

      <Text style={styles.label}>
        Artista
      </Text>

      <TextInput
        style={styles.input}
        value={artista}
        onChangeText={setArtista}
        placeholderTextColor="#777"
      />

      <Text style={styles.label}>
        Gênero
      </Text>

      <TextInput
        style={styles.input}
        value={genero}
        onChangeText={setGenero}
        placeholderTextColor="#777"
      />

      <Text style={styles.label}>
        Link da música
      </Text>

      <TextInput
        style={styles.input}
        value={link}
        onChangeText={setLink}
        placeholder="Cole o link do YouTube, Spotify etc."
        placeholderTextColor="#777"
        autoCapitalize="none"
        keyboardType="url"
      />

      <Text style={styles.dica}>
        Você pode alterar o link caso queira abrir outra versão da música.
      </Text>

      <TouchableOpacity
        style={styles.botao}
        onPress={salvarEdicao}
      >
        <Text style={styles.textoBotao}>
          Salvar alterações
        </Text>
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

  dica: {
    color: "#999999",
    fontSize: 13,
    lineHeight: 18,
    marginTop: 10,
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