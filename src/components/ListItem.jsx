import { db } from "../config/firebase"
import { deleteDoc, doc  } from "@firebase/firestore"
import { Link } from "react-router-dom";

export const ListItem = ({item, userId, user, fetch}) => {


const img = item.img
const title = item.title
const id = item.id

    // const deleteBook = async () => {
    //   try {
    //     const bookDoc = doc(db,"users", userId, "books", id)
    //     await deleteDoc(bookDoc)
    //     fetch()

    //   }

    //   catch (err) {
    //     console.log(err)
    //   }
    // } 

  return (
    <>
    <div className="hover:invisible">
      <img className="h-[300px] w-[200px] "src={img}></img>
    </div>
    </>
  )
}


