import express from "express";

const rotas = express.Router()

rotas.get("/conteudos", function(requisicao, resposta) {
 //consultar os conteudos no banco de dados
})

rotas.get("/genero", function(requisicao, resposta) {
 //consultar os generos no banco de dados
})

rotas.get("/conteudo/:codigo", function(requisicao, resposta) {
 //consultar um conteúdo único no banco de dados
})

rotas.post("/conteudo", function(requisicao, resposta) {
 //salvar um conteúdo no banco de dados
})

export default rotas