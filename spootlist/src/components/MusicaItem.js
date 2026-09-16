import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function MusicaItem({
  musica,
  onOuvir,
  onExcluir,
  onEditar,
}) {
  return (
    <View style={styles.card}>
      <TouchableOpacity
        style={styles.informacoes}
        onPress={onEditar}
      >
        <Text style={styles.titulo}>
          🎵 {musica.titulo}
        </Text>

        <Text style={styles.artista}>
          {musica.artista}
        </Text>

        <Text style={styles.genero}>
          {musica.genero}
        </Text>
      </TouchableOpacity>

      <View style={styles.botoes}>
        <TouchableOpacity
          style={styles.botaoOuvir}
          onPress={onOuvir}
        >
          <Text style={styles.textoOuvir}>
            ▶ Ouvir
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.botaoExcluir}
          onPress={onExcluir}
        >
          <Text style={styles.textoExcluir}>
            Excluir
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#282828",
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },

  informacoes: {
    marginBottom: 12,
  },

  titulo: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
  },

  artista: {
    color: "#B3B3B3",
    fontSize: 15,
    marginTop: 4,
  },

  genero: {
    color: "#1DB954",
    marginTop: 4,
  },

  botoes: {
    flexDirection: "row",
    gap: 10,
  },

  botaoOuvir: {
    backgroundColor: "#1DB954",
    padding: 10,
    borderRadius: 8,
  },

  textoOuvir: {
    color: "#000000",
    fontWeight: "500",
  },

  botaoExcluir: {
    backgroundColor: "#555",
    padding: 10,
    borderRadius: 8,
  },

  textoExcluir: {
    color: "#FFFFFF",
  },
});