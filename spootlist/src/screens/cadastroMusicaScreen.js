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

export default function CadastroMusicaScreen({
  navigation,
}) {
  const [titulo, setTitulo] = useState("");
  const [artista, setArtista] = useState("");
  const [genero, setGenero] = useState("");
  const [audioUrl, setAudioUrl] = useState("");
  const [capaUrl, setCapaUrl] = useState("");

  async function cadastrarMusica() {
    if (
      titulo.trim() === "" ||
      artista.trim() === "" ||
      genero.trim() === "" ||
      audioUrl.trim() === ""
    ) {
      Alert.alert(
        "Atenção",
        "Preencha todos os campos, incluindo o endereço do áudio."
      );

      return;
    }

    const audioUrlNormalizado = audioUrl.trim();

    if (
      !audioUrlNormalizado.startsWith("http://") &&
      !audioUrlNormalizado.startsWith("https://")
    ) {
      Alert.alert(
        "Link inválido",
        "Digite uma URL começando com http:// ou https://"
      );

      return;
    }

    const extensoesAudio = [
      ".mp3",
      ".mp4",
      ".m4a",
      ".aac",
      ".wav",
      ".ogg",
      ".flac",
      ".webm",
      ".m3u",
      ".m3u8",
    ];

    const urlSemQuery = audioUrlNormalizado.split("?")[0].split("#")[0].toLowerCase();
    const atendeExtensao = extensoesAudio.some((extensao) => urlSemQuery.endsWith(extensao));
    const eStreaming = /(?:stream|audio|media|playlist|manifest|podcast|listen)/i.test(audioUrlNormalizado);

    if (!atendeExtensao && !eStreaming) {
      Alert.alert(
        "Link de áudio inválido",
        "Use uma URL de áudio ou stream válida. O app aceita links de áudio e plataformas de streaming, não apenas arquivos MP3/MP4."
      );

      return;
    }

    const musicas = await carregarMusicas();

    const novaMusica = {
      id: Date.now().toString(),
      titulo: titulo.trim(),
      artista: artista.trim(),
      genero: genero.trim(),
      audioUrl: audioUrlNormalizado,
      link: audioUrlNormalizado,
      capaUrl: capaUrl.trim(),
      concluida: false,
    };

    const novasMusicas = [
      ...musicas,
      novaMusica,
    ];

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
        placeholder="Ex: Bohemian Rhapsody"
        placeholderTextColor="#777"
        value={titulo}
        onChangeText={setTitulo}
      />

      <Text style={styles.label}>
        Artista
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Ex: Queen"
        placeholderTextColor="#777"
        value={artista}
        onChangeText={setArtista}
      />

      <Text style={styles.label}>
        Gênero
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Ex: Rock"
        placeholderTextColor="#777"
        value={genero}
        onChangeText={setGenero}
      />

      <Text style={styles.label}>
        URL direta do áudio
      </Text>

      <TextInput
        style={styles.input}
        placeholder="URL direta do áudio (MP3, M4A...)"
        placeholderTextColor="#777"
        value={audioUrl}
        onChangeText={setAudioUrl}
        autoCapitalize="none"
        keyboardType="url"
      />

      <Text style={styles.dica}>
        Use uma URL direta para um arquivo de áudio reproduzível pelo app. Páginas de serviços de música não são arquivos de áudio.
      </Text>

      <Text style={styles.label}>
        URL da capa (opcional)
      </Text>

      <TextInput
        style={styles.input}
        placeholder="https://.../capa.jpg"
        placeholderTextColor="#777"
        value={capaUrl}
        onChangeText={setCapaUrl}
        autoCapitalize="none"
        keyboardType="url"
      />

      <TouchableOpacity
        style={styles.botao}
        onPress={cadastrarMusica}
      >
        <Text style={styles.textoBotao}>
          Cadastrar música
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
