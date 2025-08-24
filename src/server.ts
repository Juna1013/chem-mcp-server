import express from "express";
import fetch from "node-fetch";

const app = express();
const port = 3000;

// PubChem API のレスポンス型を定義
interface CidResponse {
    IdentifierList: {
        CID: number[];
    };
}

app.get("/cid/:compound", async (req, res) => {
    try {
        const compound = req.params.compound;
        const url = `https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/name/${compound}/cids/JSON`;

        const response = await fetch(url);

        // 👇 修正点①: json() の戻り値を CidResponse にキャスト
        const cidJson = (await response.json()) as CidResponse;

        // 👇 修正点②: 型安全にアクセス可能
        const cid = cidJson.IdentifierList.CID[0];
        res.json({ cid });
    } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch CID" });
    }
});

app.get("/smiles/:compound", async (req, res) => {
    try {
        const compound = req.params.compound;
        const url = `https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/name/${compound}/cids/JSON`;

        const response = await fetch(url);

        // 👇 修正点③: こちらも同じくキャスト
        const cidJson = (await response.json()) as CidResponse;

        const cid = cidJson.IdentifierList.CID[0];

        const smilesUrl = `https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/cid/${cid}/property/CanonicalSMILES/JSON`;
        const smilesResponse = await fetch(smilesUrl);
        const smilesJson = await smilesResponse.json();

        res.json(smilesJson);
    } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch SMILES" });
    }
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
