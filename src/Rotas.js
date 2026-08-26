import express from "express";
import { conteudo } from "./database/Conteudo.js"
import Joi from "joi"

const rotas = express.Router()

const esquema = Joi.object({
  capa: Joi.string().uri().required(),
  trilha: Joi.string().uri().required(),
  titulo: Joi.string().required(),
  descricao: Joi.string(),
  genero: Joi.string().required(),
  ano: Joi.number().required(),
  duracao: Joi.number().required(),
  faixa: Joi.number().required()
})


rotas.get("/conteudos", function(requisicao, resposta) {
  conteudo.get()
    .then(function(query) {
      const resultados = query.docs.map(function(doc) {
        return { id: doc.id, ...doc.data() }
      })
 
      if (resultados.length > 0)
        resposta.status(200).json(resultados)
      else resposta.status(404).json({
        mensagem: "Nenhum resultado encontrado!"
      })
    })
    .catch(function(erro) {
      resposta.status(500).json({ mensagem: erro.message })
    })
})


rotas.get("/conteudo/:codigo", function(requisicao, resposta) {
  const { codigo } = requisicao.params
})

rotas.get("/generos", function(requisicao, resposta) {
  conteudo.get()
    .then(function(query) {
      const resultados = query.docs.map(function(doc) {
        return { id: doc.id, ...doc.data() }
      })
      if (resultados.length > 0) {
        var lista = new Array()
        resultados.map(function(item) {
          if (!lista.includes(item.genero))
            return lista.push(item.genero)
        })
        resposta.status(200).json(lista)
      } else resposta.status(404).json({
        mensagem: "Nenhum resultado encontrado!"
      })
    })
    .catch(function(erro) {
      resposta.status(500).json({ mensagem: erro.message })
    })
})

rotas.post("/conteudo", async function(requisicao, resposta) {
  const corpo = requisicao.body
  try {
    const validado = await esquema.validateAsync(corpo)
    conteudo.add(validado)
      .then(function(referencia) {
        resposta.status(201).json({ id: referencia.id, ...validado })
      })
      .catch(function(erro) {
        resposta.status(500).json({ mensagem: erro.message })
      })
  } catch (erro) {
    resposta.status(400).json({ mensagem: erro.message })
  }
})



export default rotas