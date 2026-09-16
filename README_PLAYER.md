# MyMusic — PlayerScreen

Esta versão transforma o botão `▶ Ouvir` em um player interno do aplicativo.

## O que foi adicionado

- Tela `PlayerScreen` dentro do MyMusic.
- Capa da música.
- Nome, artista e gênero.
- Barra de progresso clicável.
- Tempo atual e duração.
- `⏮` música anterior.
- `▶/Ⅱ` reproduzir/pausar.
- `⏭` próxima música.
- Reprodução automática ao abrir o player quando existe uma URL de áudio válida.
- Suporte a URL remota de áudio usando `expo-audio`.

## Importante sobre o campo de áudio

O player interno precisa receber o endereço de um **arquivo/stream de áudio reproduzível**, como uma URL HTTPS que entregue áudio (por exemplo, MP3 ou M4A).

Uma página de um serviço de música não é, por si só, um arquivo de áudio e não pode ser entregue diretamente ao `expo-audio` como fonte do player.

## Instalação

Dentro da pasta do projeto:

```bash
npm install
```

O `package.json` inclui:

```json
"expo-audio": "~57.0.5"
```

Depois:

```bash
npx expo start
```

## Cadastro

No cadastro existem agora:

- Nome da música
- Artista
- Gênero
- URL direta do áudio
- URL da capa (opcional)

As músicas antigas que só têm o campo `link` continuam sendo lidas como fonte de áudio pelo player, mas esse `link` precisa ser uma URL de áudio reproduzível.
