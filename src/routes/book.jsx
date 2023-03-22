import { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { doc, getDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../config/firebase';

function Book() {
  const { id, uid } = useParams(); // obtém o ID da URL
  const [bookData, setBookData] = useState({}); // armazena os dados do livro

  console.log(id, uid)

  const navigate = useNavigate()

  const deleteBook = async () => {
    const bookDoc = doc(db,"users", uid, "books", id)
    await deleteDoc(bookDoc);
    navigate(`/${uid}`)
  }

  useEffect(() => {
    async function fetchBookData() {
      try {
        const docRef = doc(db, 'users', uid, 'books', id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setBookData(docSnap.data());
        } else {
          console.log('O documento não existe!');
        }
      } catch (error) {
        console.log(error);
      }
    }
    fetchBookData();
  }, [id]);


  return (
    <div className="pb-10 bg-black text-white h-max">
    <div className="flex pt-10 mx-auto container xsm:flex-col">
      <img className="w-[300px] h-[500px] object-fill xsm:self-center" src={bookData.img}></img>
      <div className="flex flex-col ml-20 xsm:ml-0 ">
      <h2 className="text-center font-bold text-5xl mb-10 xsm:text-3xl xsm:mt-10">{bookData.title}</h2>
      <p className="text-2xl xsm:text-lg">{bookData.text}</p>
      <div className=" pt-20 mx-2 gap-10 flex flex-row-reverse xsm:gap-4">
      <Link to={`/${uid}`} className="rounded-lg bg-purple-600  subpixel-antialiased  lg:p-5 text-white text-xl font-bold scale-95  hover:bg-purple-700 xsm:text-sm xsm:p-3">Back to Home page</Link>
      <button onClick={deleteBook} className="rounded-lg bg-red-600  subpixel-antialiased  lg:p-5 text-white text-xl font-bold scale-95  hover:bg-red-700 xsm:text-sm xsm:p-3">Delete Book</button>
      </div>
     
      </div>
    </div>
    </div>
  );
}

export default Book;
