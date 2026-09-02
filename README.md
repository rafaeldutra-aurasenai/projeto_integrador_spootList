# 🎵 SpotList

Aplicativo mobile de músicas inspirado em aplicativos de streaming, desenvolvido como Projeto Integrador do curso de **Programação para Dispositivos Móveis** do SENAI – Escola Ítalo Bologna.

O objetivo do projeto é permitir que o usuário cadastre e organize suas músicas favoritas, utilizando uma interface simples e intuitiva e mantendo os dados salvos no dispositivo.

## 👥 Integrantes

* **Rafael Henrique de Carvalho Dutra**
* **Ana Katy Romão Vasconcellos**

## 📱 Sobre o projeto

O SpotList é um aplicativo desenvolvido para organizar uma lista pessoal de músicas.

O usuário pode cadastrar músicas informando dados como:

* 🎵 Nome da música
* 🎤 Artista
* 💿 Álbum
* 🎸 Gênero
* ❤️ Música favorita
* ✅ Status da música

O aplicativo permite visualizar, adicionar, editar e excluir músicas, mantendo os dados armazenados mesmo depois que o aplicativo é fechado.

## ⚙️ Funcionalidades

### 🎵 Cadastro de músicas

Permite adicionar novas músicas à lista através de um formulário.

### 📋 Lista de músicas

As músicas cadastradas são exibidas em uma lista utilizando o componente `FlatList`.

### ✏️ Edição

O usuário pode alterar as informações de uma música já cadastrada.

### 🗑️ Exclusão

É possível remover músicas da lista.

### ❤️ Favoritos

O usuário pode marcar músicas como favoritas para facilitar sua organização.

### ✅ Status

As músicas podem ter seu status atualizado, permitindo identificar quais já foram ouvidas.

### 💾 Persistência de dados

As informações são armazenadas no dispositivo utilizando **AsyncStorage**, permitindo que os dados continuem disponíveis mesmo depois de fechar ou reabrir o aplicativo.

## 🛠️ Tecnologias utilizadas

* **React Native**
* **Expo**
* **JavaScript**
* **React Navigation**
* **AsyncStorage**
* **FlatList**

## 📂 Estrutura do projeto

```text
SpotList/
│
├── assets/
│
├── src/
│   │
│   ├── components/
│   │   └── MusicaItem.js
│   │
│   ├── screens/
│   │   ├── HomeScreen.js
│   │   ├── CadastroMusicaScreen.js
│   │   └── EditarMusicaScreen.js
│   │
│   ├── navigation/
│   │   └── AppNavigator.js
│   │
│   └── services/
│       └── storage.js
│
├── App.js
├── package.json
└── README.md
```

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
  concluida: false
}
```

## 🔄 CRUD

O projeto implementa as quatro operações principais do CRUD:

| Operação   | Função no aplicativo                    |
| ---------- | --------------------------------------- |
| **Create** | Cadastrar uma nova música               |
| **Read**   | Listar as músicas cadastradas           |
| **Update** | Editar informações e atualizar o status |
| **Delete** | Excluir uma música                      |

## 🎯 Objetivo acadêmico

O projeto foi desenvolvido para colocar em prática os conhecimentos de:

* Desenvolvimento de interfaces para dispositivos móveis;
* Componentização no React Native;
* Utilização de `FlatList`;
* Navegação entre telas;
* Implementação de operações CRUD;
* Persistência de dados no dispositivo;
* Organização de um projeto mobile.

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

### 4. Execute o projeto

```bash
npx expo start
```

Depois, o aplicativo pode ser executado utilizando um dispositivo físico com o **Expo Go** ou um emulador compatível.

## 📚 Projeto Integrador

**SENAI – Escola Ítalo Bologna**

**Curso:** Programação para Dispositivos Móveis

**Tema:** Aplicativo de gerenciamento de músicas

**Integrantes:** Rafael Henrique de Carvalho Dutra e Ana Katy Romão Vasconcellos
