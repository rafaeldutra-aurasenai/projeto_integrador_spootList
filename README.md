# 🎵 SpotList

Aplicativo mobile de músicas inspirado em aplicativos de streaming, desenvolvido como Projeto Integrador do curso de **Programação para Dispositivos Móveis** do SENAI – Escola Ítalo Bologna.

O objetivo do projeto é permitir que o usuário cadastre e organize suas músicas favoritas, utilizando uma interface simples e intuitiva, mantendo os dados salvos no dispositivo e oferecendo um **player de áudio integrado ao próprio aplicativo**.

## 👥 Integrantes

- **Rafael Henrique de Carvalho Dutra**
- **Ana Katy Romão Vasconcellos**

## 📱 Sobre o projeto

O SpotList é um aplicativo desenvolvido para organizar uma lista pessoal de músicas.

O usuário pode cadastrar músicas informando dados como:

- 🎵 Nome da música
- 🎤 Artista
- 💿 Álbum
- 🎸 Gênero
- ❤️ Música favorita
- ✅ Status da música
- 🔊 URL direta do áudio
- 🖼️ URL da capa da música (opcional)

O aplicativo permite visualizar, adicionar, editar, excluir e reproduzir músicas, mantendo os dados armazenados mesmo depois que o aplicativo é fechado.

## ⚙️ Funcionalidades

### 🎵 Cadastro de músicas

Permite adicionar novas músicas à lista através de um formulário, incluindo informações como título, artista, álbum, gênero, favorito, status e URL direta do áudio.

### 📋 Lista de músicas

As músicas cadastradas são exibidas em uma lista utilizando o componente `FlatList`.

### ✏️ Edição

O usuário pode alterar as informações de uma música já cadastrada, incluindo a URL do áudio e a capa.

### 🗑️ Exclusão

É possível remover músicas da lista.

### ❤️ Favoritos

O usuário pode marcar músicas como favoritas para facilitar sua organização.

### ✅ Status

As músicas podem ter seu status atualizado, permitindo identificar quais já foram ouvidas.

### ▶️ Player de música integrado

Ao tocar em **▶ Ouvir**, o aplicativo abre a tela **PlayerScreen**, mantendo a reprodução dentro do SpotList.

O player possui:

- 🖼️ Capa da música
- 🎵 Nome da música
- 🎤 Artista
- 🎸 Gênero
- 📊 Barra de progresso interativa
- ⏮️ Música anterior
- ▶️ Reproduzir
- ⏸️ Pausar
- ⏭️ Próxima música
- ⏱️ Exibição do tempo atual e duração da música

A navegação entre as músicas é feita a partir das músicas cadastradas no aplicativo.

### 🔊 Reprodução de áudio

A reprodução é realizada utilizando a biblioteca **`expo-audio`**.

Para funcionar corretamente, o campo de áudio deve receber uma **URL direta e reproduzível de um arquivo ou stream de áudio**, como uma URL que forneça diretamente um arquivo MP3 ou M4A.

> **Importante:** uma URL que apenas abre uma página de um serviço de música não é necessariamente uma URL de áudio reproduzível. Nesse caso, é necessário cadastrar uma fonte de áudio direta e autorizada para reprodução.

### 💾 Persistência de dados

As informações são armazenadas no dispositivo utilizando **AsyncStorage**, permitindo que os dados continuem disponíveis mesmo depois de fechar ou reabrir o aplicativo.

## 🛠️ Tecnologias utilizadas

- **React Native**
- **Expo**
- **JavaScript**
- **React Navigation**
- **AsyncStorage**
- **FlatList**
- **expo-audio**

## 📂 Estrutura do projeto

```text
SpotList/
│
├── assets/
│   ├── icon.png
│   ├── splash-icon.png
│   └── ...
│
├── src/
│   │
│   ├── components/
│   │   └── MusicaItem.js
│   │
│   ├── screens/
│   │   ├── homeScreen.js
│   │   ├── cadastroMusicaScreen.js
│   │   ├── editarMusicaScreen.js
│   │   └── playerScreen.js
│   │
│   ├── navigation/
│   │   └── appNavigator.js
│   │
│   └── services/
│       └── storage.js
│
├── App.js
├── app.json
├── index.js
├── package.json
└── README.md
```

## 🎧 PlayerScreen

A `PlayerScreen` foi adicionada ao projeto para que o botão **▶ Ouvir** não precise abrir uma página externa.

O fluxo de reprodução funciona da seguinte forma:

```text
Lista de músicas
       │
       ▼
   ▶ Ouvir
       │
       ▼
   PlayerScreen
       │
       ├── ⏮ Anterior
       ├── ▶/⏸ Reproduzir/Pausar
       └── ⏭ Próxima
```

A tela recebe o `id` da música selecionada, carrega os dados armazenados e inicia a reprodução do áudio quando uma URL válida estiver disponível.

## 💾 Persistência de dados

Foi escolhido o **AsyncStorage** para a persistência dos dados porque o aplicativo trabalha com informações simples e em um volume relativamente pequeno.

As músicas são convertidas para JSON e armazenadas localmente no dispositivo.

Exemplo de uma música:

```javascript
{
  id: "1",
  titulo: "Nome da música",
  artista: "Nome do artista",
  album: "Nome do álbum",
  genero: "Pop",
  favorita: true,
  concluida: false,
  audioUrl: "https://exemplo.com/audio.mp3",
  link: "https://exemplo.com/audio.mp3",
  capaUrl: "https://exemplo.com/capa.jpg"
}
```

### Campos relacionados ao player

- `audioUrl`: URL direta usada pelo `expo-audio` para reproduzir a música.
- `link`: mantido como compatibilidade com músicas cadastradas em versões anteriores do aplicativo.
- `capaUrl`: URL opcional da imagem da capa. Quando não é informada, o aplicativo utiliza o ícone do próprio app como imagem padrão.

## 🔄 CRUD

O projeto implementa as quatro operações principais do CRUD:

| Operação | Função no aplicativo |
| --- | --- |
| **Create** | Cadastrar uma nova música |
| **Read** | Listar as músicas cadastradas |
| **Update** | Editar informações e atualizar o status |
| **Delete** | Excluir uma música |

## 🎯 Objetivo acadêmico

O projeto foi desenvolvido para colocar em prática os conhecimentos de:

- Desenvolvimento de interfaces para dispositivos móveis;
- Componentização no React Native;
- Utilização de `FlatList`;
- Navegação entre telas;
- Implementação de operações CRUD;
- Persistência de dados no dispositivo;
- Reprodução de áudio em aplicativo mobile;
- Utilização de `expo-audio`;
- Organização de um projeto mobile.

## 🚀 Como executar o projeto

### 1. Clone o repositório

```bash
git clone URL_DO_REPOSITORIO
```

### 2. Entre na pasta

```bash
cd SpotList
```

### 3. Instale as dependências

```bash
npm install
```

A dependência `expo-audio` está declarada no `package.json` e será instalada junto com as demais dependências.

### 4. Execute o projeto

```bash
npx expo start
```

Depois, o aplicativo pode ser executado utilizando um dispositivo físico com o **Expo Go** ou um emulador compatível.

## 🧪 Testando o Player

Para testar o player:

1. Cadastre uma música.
2. Preencha a **URL direta do áudio** com uma fonte de áudio reproduzível e autorizada.
3. Opcionalmente, informe uma URL para a capa.
4. Salve a música.
5. Na lista, toque em **▶ Ouvir**.
6. O aplicativo abrirá a `PlayerScreen`.
7. Utilize **▶/⏸**, **⏮** e **⏭** para controlar a reprodução.
8. Também é possível tocar em diferentes pontos da barra de progresso para avançar ou voltar na música.

## ⚠️ Observação sobre URLs de áudio

O SpotList não transforma automaticamente páginas de serviços de streaming em arquivos de áudio.

Por isso, o campo **URL direta do áudio** deve apontar para uma fonte de áudio que possa ser reproduzida diretamente pelo aplicativo. Use somente conteúdos que você tenha autorização para reproduzir ou disponibilizar dessa forma.

## 📚 Projeto Integrador

**SENAI – Escola Ítalo Bologna**

**Curso:** Programação para Dispositivos Móveis

**Tema:** Aplicativo de gerenciamento de músicas

**Integrantes:** Rafael Henrique de Carvalho Dutra e Ana Katy Romão Vasconcellos
