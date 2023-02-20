import { db } from "../config/firebase"
import { deleteDoc, doc  } from "@firebase/firestore"
import { Link } from "react-router-dom";

export const ListItem = ({item, id, reloadBook}) => {

let img = item.img
let title = item.title

    const deleteBook = async () => {
      const bookDoc = doc(db,"books", id)
      await deleteDoc(bookDoc)
      reloadBook
    } 

  return (
    <>

    <div className="group flex justify-center text-center relative">
    <div className="cursor-pointer object-fill ease-in-out duration-500 group-hover:-translate-y-3 transition-all">
      <img className="h-[500px] w-[292px] object-fill"src={img}></img>
    </div>
    <div className="absolute bg-black w-full h-full opacity-0 duration-500 group-hover:opacity-40 group-hover:-translate-y-3 transition-all"></div>
    <div className="absolute flex flex-col h-full justify-around w-full">
    <div className="invisible group-hover:visible text-3xl text-white duration-300">{title}</div>
    <div>

    </div>
    <Link to={`book/${item.title}/${item.id}`}className="invisible bg-black  bg-opacity-0 hover:bg-opacity-50 mx-20 group-hover:visible subpixel-antialiased border-blue-500 border-8 rounded-lg p-5 text-white text-xl font-bold scale-95 hover:scale-100 ease-in-out duration-300 ">See</Link>
    <button onClick={deleteBook} className="invisible mx-20 rounded-full bg-red-600 group-hover:visible subpixel-antialiased  p-5 text-white text-xl font-bold scale-95 hover:scale-100 ease-in-out duration-300 hover:bg-red-700">X</button>
    </div>
  
    </div>
      

    </>
  )
}


