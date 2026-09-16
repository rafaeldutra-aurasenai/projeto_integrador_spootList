import { useCallback, useEffect, useState } from "react";

import {
  ActivityIndicator,
  Alert,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { useFocusEffect } from "@react-navigation/native";

import MusicaItem from "../components/MusicaItem";

import { carregarMusicas, salvarMusicas } from "../services/storage";

export default function HomeScreen({ navigation }) {
  const [musicas, setMusicas] = useState([]);
  const [carregando, setCarregando] = useState(true);

  async function carregarDados() {
    setCarregando(true);

    const dados = await carregarMusicas();

    setMusicas(dados);
    setCarregando(false);
  }

  useFocusEffect(
    useCallback(() => {
      carregarDados();
    }, []),
  );

  async function concluirMusica(id) {
    const novasMusicas = musicas.map((musica) => {
      if (musica.id === id) {
        return {
          ...musica,
          concluida: !musica.concluida,
        };
      }

      return musica;
    });

    setMusicas(novasMusicas);
    await salvarMusicas(novasMusicas);
  }

  function excluirMusica(id) {
    Alert.alert(
      "Excluir música",
      "Tem certeza que deseja excluir esta música?",
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Excluir",
          style: "destructive",

          onPress: async () => {
            const novasMusicas = musicas.filter((musica) => musica.id !== id);

            setMusicas(novasMusicas);
            await salvarMusicas(novasMusicas);
          },
        },
      ],
    );
  }

  if (carregando) {
    return (
      <View style={styles.centralizado}>
        <ActivityIndicator size="large" color="#1DB954" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Suas músicas</Text>

      <Text style={styles.subtitulo}>
        {musicas.length} música(s) cadastrada(s)
      </Text>

      <FlatList
        data={musicas}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <MusicaItem
            musica={item}
            onOuvir={() => ouvirMusica(item.link)}
            onExcluir={() => excluirMusica(item.id)}
            onEditar={() =>
              navigation.navigate("Editar", {
                musica: item,
              })
            }
          />
        )}
        ListEmptyComponent={
          <Text style={styles.listaVazia}>
            Nenhuma música cadastrada ainda 🎵
          </Text>
        }
      />

      <TouchableOpacity
        style={styles.botaoAdicionar}
        onPress={() => navigation.navigate("Cadastro")}
      >
        <Text style={styles.textoBotao}>+ Adicionar música</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
    padding: 20,
  },

  centralizado: {
    flex: 1,
    backgroundColor: "#121212",
    justifyContent: "center",
    alignItems: "center",
  },

  titulo: {
    color: "#FFFFFF",
    fontSize: 28,
    fontWeight: "bold",
  },

  subtitulo: {
    color: "#B3B3B3",
    marginTop: 5,
    marginBottom: 20,
  },

  listaVazia: {
    color: "#B3B3B3",
    textAlign: "center",
    marginTop: 50,
    fontSize: 16,
  },

  botaoAdicionar: {
    backgroundColor: "#1DB954",
    padding: 16,
    borderRadius: 30,
    alignItems: "center",
    marginTop: 10,
  },

  textoBotao: {
    color: "#000000",
    fontSize: 16,
    fontWeight: "bold",
  },
});
