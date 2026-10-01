import { getFirestore } from "firebase-admin/firestore"
 
const db = getFirestore()
const usuarios = db.collection("Usuarios")




export { usuarios }



