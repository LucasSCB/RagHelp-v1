const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.json({
        status: 'Online',
        mensagem: 'Backend RagHelp Funcionando'
    });
});


app.get("/api/test/monster/:id", async (req, res) => {
    const { id} = req.params;
    
    try {
        const resposta = await fetch(`https://ragnapi.com/api/v1/re-newal/monsters/${id}`);

        const dados = await resposta.json();

        res.json(dados);
    } catch (error) {
        res.status(500).json({erro: true, mensagem: 'Erro ao buscar os dados do monstro.'});
    }
});


app.get("/api/test/item/:id", async (req, res) => {
    const { id } = req.params;

    try{
        const resposta = await fetch(`https://ragnapi.com/api/v1/re-newal/items/${id}`);

        const dados = await resposta.json();

        res.json(dados);
    }catch (error) {
        res.status(500).json({erro: true, mensagem: 'Erro ao buscar os dados do item.'});
    }
});

app.get("/api/monsters/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const resposta = await fetch(
      `https://ragnapi.com/api/v1/re-newal/monsters/${id}`
    );

    if (!resposta.ok) {
      return res.status(404).json({
        erro: true,
        mensagem: "Monstro não encontrado"
      });
    }

    const dados = await resposta.json();

    const mobLimpo = {
      id: id,
      nome: dados.monster_info || dados.name || "Nome não encontrado",
      imagem: dados.gif || dados.image || "",
      level: dados.main_stats?.level || "Não informado",
      hp: dados.main_stats?.hp || "Não informado",
      elemento: dados.main_stats?.element || "Não informado",
      raca: dados.main_stats?.race || "Não informado",
      drops: dados.drops || []
    };

    res.json(mobLimpo);
  } catch (erro) {
    res.status(500).json({
      erro: true,
      mensagem: "Erro ao processar monstro"
    });
  }
});

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});