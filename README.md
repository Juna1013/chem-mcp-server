# chem-mcp-server

MCP（Model Context Protocol）サーバーで、AIエージェント（Claudeなど）が **2D化学構造式** を描画し、PubChemから **基本的な化学情報**（分子式、分子量、IUPAC名、SMILES、InChIKey）を取得できるサーバーです。

## 🚀 特徴

- 2D **SVG構造図** の生成
- **化合物名** または **SMILES** で検索可能
- **分子式、分子量、IUPAC名、SMILES、InChIKey** を返す

## 📦 インストール方法

```bash
git clone https://github.com/YOURNAME/chem-mcp-server.git
cd chem-mcp-server
npm install
```

## 🛠 使い方

### 本番用

```bash
npm run build
npm start
```

### 開発用

```bash
npm run dev
```

## ⚡ Claude 連携方法

`claude_desktop_config.json` に以下を追加します：

```json
{
  "mcpServers": {
    "chem": {
      "command": "node",
      "args": ["/path/to/chem-mcp-server/dist/server.js"]
    }
  }
}
```

これでClaudeに以下のように質問できます：

```basg
"アスピリンの構造式と分子式を教えて。"
```

## 📜 ライセンス

MIT License
Copyright (c) 2025 YOUR NAME
