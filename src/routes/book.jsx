import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../config/firebase';

function Book() {
  const { id } = useParams(); // obtém o ID da URL
  const [bookData, setBookData] = useState({}); // armazena os dados do livro

  useEffect(() => {
    async function fetchBookData() {
      try {
        const docRef = doc(db, 'books', id);
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
    <div className="">
    <div className="flex mt-10 mx-auto container">
      <img className="w-[300px] h-[500px] object-fill" src={bookData.img}></img>
      <div className="flex flex-col ml-20">
      <h2 className="text-center font-bold text-5xl mb-10">{bookData.title}</h2>
      <p className="text-2xl">{bookData.text}</p>
      <div className="text-right mt-20 mx-2">
      <Link to="/"className="bg-blue-600 p-5 hover:text-white rounded-lg">Back to Home page</Link>
      </div>
     
      </div>
    </div>
    </div>
  );
}

export default Book;
