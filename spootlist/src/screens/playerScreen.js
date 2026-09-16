import { useEffect, useMemo, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import {
  useAudioPlayer,
  useAudioPlayerStatus,
  setAudioModeAsync,
} from "expo-audio";

import { carregarMusicas } from "../services/storage";

const CAPA_PADRAO = require("../../assets/icon.png");

function formatarTempo(segundos = 0) {
  if (!Number.isFinite(segundos)) return "0:00";

  const total = Math.max(0, Math.floor(segundos));
  const minutos = Math.floor(total / 60);
  const segundosRestantes = String(total % 60).padStart(2, "0");

  return `${minutos}:${segundosRestantes}`;
}

export default function PlayerScreen({ route, navigation }) {
  const musicaId = route.params?.musicaId;
  const autoPlay = route.params?.autoPlay ?? true;

  const [musicas, setMusicas] = useState([]);
  const [musica, setMusica] = useState(null);
  const [indice, setIndice] = useState(-1);
  const [carregandoMusica, setCarregandoMusica] = useState(true);
  const [larguraBarra, setLarguraBarra] = useState(1);

  const audioUrl = useMemo(() => {
    if (!musica) return null;
    return musica.audioUrl?.trim() || musica.link?.trim() || null;
  }, [musica]);

  const player = useAudioPlayer({
    updateInterval: 250,
    downloadFirst: false,
  });

  const status = useAudioPlayerStatus(player);

  useEffect(() => {
    if (!audioUrl) return;

    player.replace(audioUrl);
  }, [audioUrl, player]);

  useEffect(() => {
    async function preparar() {
      setCarregandoMusica(true);

      const dados = await carregarMusicas();
      setMusicas(dados);

      const indiceEncontrado = dados.findIndex(
        (item) => item.id === musicaId
      );

      if (indiceEncontrado === -1) {
        setCarregandoMusica(false);
        Alert.alert(
          "Música não encontrada",
          "Não foi possível encontrar esta música no MyMusic."
        );
        navigation.goBack();
        return;
      }

      setIndice(indiceEncontrado);
      setMusica(dados[indiceEncontrado]);
      setCarregandoMusica(false);
    }

    preparar();
  }, [musicaId, navigation]);

  useEffect(() => {
    setAudioModeAsync({
      playsInSilentMode: true,
      shouldPlayInBackground: false,
      interruptionMode: "doNotMix",
    }).catch((erro) => {
      console.log("Não foi possível configurar o áudio:", erro);
    });
  }, []);

  useEffect(() => {
    if (!autoPlay) return;
    if (audioUrl && status.isLoaded && !status.playing) {
      player.play();
    }
  }, [audioUrl, autoPlay, status.isLoaded, status.playing, player]);

  useEffect(() => {
    return () => {
      if (status.isLoaded) {
        player.pause();
        player.seekTo(0);
      }
    };
  }, [player, status.isLoaded]);

  useEffect(() => {
    if (status.error) {
      Alert.alert(
        "Não foi possível reproduzir",
        "O endereço cadastrado não está respondendo como stream de áudio válido. Tente uma URL direta de mídia, stream ou arquivo de áudio acessível pelo dispositivo."
      );
    }
  }, [status.error]);

  function tocarPausar() {
    if (!audioUrl) {
      Alert.alert(
        "Áudio não cadastrado",
        "Edite esta música e informe uma URL válida de stream ou arquivo de áudio."
      );
      return;
    }

    if (!status.isLoaded) {
      player.replace(audioUrl);
      player.play();
      return;
    }

    if (status.playing) {
      player.pause();
    } else {
      player.play();
    }
  }

  function avancar() {
    if (musicas.length === 0 || indice < 0) return;

    const proximoIndice = (indice + 1) % musicas.length;
    const proximaMusica = musicas[proximoIndice];

    setIndice(proximoIndice);
    setMusica(proximaMusica);

    if (proximaMusica.audioUrl || proximaMusica.link) {
      player.replace(proximaMusica.audioUrl || proximaMusica.link);
      player.play();
    }
  }

  function voltar() {
    if (musicas.length === 0 || indice < 0) return;

    const indiceAnterior =
      indice === 0 ? musicas.length - 1 : indice - 1;
    const musicaAnterior = musicas[indiceAnterior];

    setIndice(indiceAnterior);
    setMusica(musicaAnterior);

    if (musicaAnterior.audioUrl || musicaAnterior.link) {
      player.replace(musicaAnterior.audioUrl || musicaAnterior.link);
      player.play();
    }
  }

  function tocarNaBarra(event) {
    if (!status.duration || larguraBarra <= 0) return;

    const porcentagem = Math.max(
      0,
      Math.min(1, event.nativeEvent.locationX / larguraBarra)
    );

    player.seekTo(porcentagem * status.duration);
  }

  if (carregandoMusica || !musica) {
    return (
      <View style={styles.carregando}>
        <ActivityIndicator size="large" color="#1DB954" />
        <Text style={styles.textoCarregando}>Carregando música...</Text>
      </View>
    );
  }

  const progresso =
    status.duration > 0
      ? Math.min(1, status.currentTime / status.duration)
      : 0;

  const capa = musica.capaUrl?.trim()
    ? { uri: musica.capaUrl.trim() }
    : CAPA_PADRAO;

  return (
    <View style={styles.container}>
      <View style={styles.topo}>
        <Pressable
          style={styles.botaoVoltar}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.iconeVoltar}>‹</Text>
        </Pressable>

        <Text style={styles.textoTopo}>TOCANDO AGORA</Text>

        <View style={styles.espacoTopo} />
      </View>

      <View style={styles.conteudo}>
        <Image source={capa} style={styles.capa} />

        <Text style={styles.titulo}>{musica.titulo}</Text>
        <Text style={styles.artista}>{musica.artista}</Text>
        <Text style={styles.genero}>{musica.genero}</Text>

        <View style={styles.areaProgresso}>
          <Pressable
            style={styles.trilha}
            onLayout={(event) =>
              setLarguraBarra(event.nativeEvent.layout.width)
            }
            onPress={tocarNaBarra}
          >
            <View
              style={[
                styles.progresso,
                { width: `${progresso * 100}%` },
              ]}
            />
          </Pressable>

          <View style={styles.tempos}>
            <Text style={styles.tempo}>
              {formatarTempo(status.currentTime)}
            </Text>
            <Text style={styles.tempo}>
              {formatarTempo(status.duration)}
            </Text>
          </View>
        </View>

        <View style={styles.controles}>
          <Pressable style={styles.controleSecundario} onPress={voltar}>
            <Text style={styles.iconeControle}>⏮</Text>
          </Pressable>

          <Pressable style={styles.botaoPlay} onPress={tocarPausar}>
            <Text style={styles.iconePlay}>
              {status.playing ? "Ⅱ" : "▶"}
            </Text>
          </Pressable>

          <Pressable style={styles.controleSecundario} onPress={avancar}>
            <Text style={styles.iconeControle}>⏭</Text>
          </Pressable>
        </View>

        {!audioUrl && (
          <Text style={styles.aviso}>
            Esta música ainda não possui um áudio. Edite o cadastro para adicionar a URL direta do arquivo de áudio.
          </Text>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
  },

  carregando: {
    flex: 1,
    backgroundColor: "#121212",
    justifyContent: "center",
    alignItems: "center",
  },

  textoCarregando: {
    color: "#B3B3B3",
    marginTop: 12,
  },

  topo: {
    height: 64,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
  },

  botaoVoltar: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: "#282828",
    alignItems: "center",
    justifyContent: "center",
  },

  iconeVoltar: {
    color: "#FFFFFF",
    fontSize: 34,
    lineHeight: 36,
    marginTop: -3,
  },

  textoTopo: {
    color: "#B3B3B3",
    fontSize: 12,
    fontWeight: "bold",
    letterSpacing: 1.5,
  },

  espacoTopo: {
    width: 42,
  },

  conteudo: {
    flex: 1,
    paddingHorizontal: 24,
    alignItems: "center",
    justifyContent: "center",
  },

  capa: {
    width: 280,
    height: 280,
    borderRadius: 14,
    marginBottom: 30,
    backgroundColor: "#282828",
  },

  titulo: {
    color: "#FFFFFF",
    fontSize: 25,
    fontWeight: "bold",
    textAlign: "center",
  },

  artista: {
    color: "#B3B3B3",
    fontSize: 17,
    marginTop: 7,
  },

  genero: {
    color: "#1DB954",
    fontSize: 14,
    marginTop: 5,
  },

  areaProgresso: {
    width: "100%",
    marginTop: 34,
  },

  trilha: {
    height: 6,
    backgroundColor: "#444444",
    borderRadius: 3,
    overflow: "hidden",
  },

  progresso: {
    height: "100%",
    backgroundColor: "#1DB954",
    borderRadius: 3,
  },

  tempos: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
  },

  tempo: {
    color: "#999999",
    fontSize: 12,
  },

  controles: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 35,
    marginTop: 32,
  },

  controleSecundario: {
    width: 52,
    height: 52,
    alignItems: "center",
    justifyContent: "center",
  },

  iconeControle: {
    color: "#FFFFFF",
    fontSize: 28,
  },

  botaoPlay: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: "#1DB954",
    alignItems: "center",
    justifyContent: "center",
  },

  iconePlay: {
    color: "#000000",
    fontSize: 30,
    fontWeight: "bold",
  },

  aviso: {
    color: "#999999",
    textAlign: "center",
    fontSize: 12,
    lineHeight: 17,
    marginTop: 28,
  },
});
