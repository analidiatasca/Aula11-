import notifier from "node-notifier"
import { initializeApp, cert } from "firebase-admin/app"
import { getFirestore } from "firebase-admin/firestore"
import { readFileSync } from "fs"

let bancoDeDados

try {
    const credenciais = JSON.parse(
        readFileSync(new URL("./credenciais.json", import.meta.url), "utf-8")
    )

    initializeApp({ credential: cert(credenciais) })
    bancoDeDados = getFirestore()

    notifier.notify({
        title: "superflix",
        message: "BANCO DE DADOS CONECTADO!",
        icon: "/"
    })
} catch (erro) {
    console.log("Erro na conexão:", erro.message)
}

export { bancoDeDados }