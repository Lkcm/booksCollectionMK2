import { auth, db } from "../config/firebase";
import {signOut} from "@firebase/auth";
import { useNavigate,  useParams } from "react-router-dom"
import Modal from "../components/Modal";
import { useState, useEffect } from "react"
import { getDocs, collection, doc, getDoc} from "firebase/firestore"
import { ListItem } from "../components/ListItem"

import { Navigate, Link } from "react-router-dom";



function UserBooks() {
  
  const [data, setData ] = useState([]);
  const [ userData, setUserData] = useState([]);
  const [ bookData, setBookData] = useState({});
  const { id } = useParams();
  const userId = id
  
  const navigate = useNavigate(); // adicione esta linha

  const fetchData = async () => {
    let list = []
    try{
      const querySnapshot = await getDocs(collection(db, "users", userId, "books"));
      querySnapshot.forEach((doc) => {
        list.push({ id: doc.id, ...doc.data()})
      })
      setData(list);
    }catch(err){
      console.log(err)
    }
  }
  
  useEffect(() => {
    fetchData()
  }, [])
  
  useEffect(() => {
    async function fetchUserData() {
      try {
        const docRef = doc(db, 'users', userId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setUserData(docSnap.data());
        } else {
          console.log('O documento não existe!');
        }
      } catch (error) {
        console.log(error);
      }
    }
    fetchUserData();
  }, []);
  
  const logout = async () => {
    try {
      await signOut(auth);
      navigate("/"); // adicione esta linha
    } catch (err) {
      console.log(err);
    }
  };
  
  const ShowBooks = () => {
    return (
      data.map((item, index ) => (      
        <img key={index} className="scale-75 transition transform hover:-translate-y-1 hover:cursor-pointer " onClick={() => {setBookData(item)}} src={item.img}/>
        ))
    )
    }

    const BookResume = () => {
      if(bookData.text?.length >= 300) {
        return (
          <div className="mx-20">
            <p className="text-white ">{bookData.text.slice(0, 150)}...</p>
          </div>
        )
      } else {
        return(
        <p className="text-white ">{bookData.text}</p>
        )
      }
      
    }

    const ShowBook = () => {
      if(bookData.id?.length == undefined) {
        return (
        <div className="min-h-[603px] flex items-center  justify-center">
          <h1 className="text-white lg:text-9xl xsm:text-5xl sm:text-7xl">Book's Collection</h1>
          </div>
        )
      } else {
        return (

        <div>
          <div className="z-20">
            <div className="flex sm:flex-col xsm:flex-col lg:flex-row">

          <img className="w-fit max-h-[563px] min-h-[563px] lg:ml-20 xsm:self-center" src={bookData.img}/>

          
          <div className="flex flex-col items-center gap-10 w-[94vw]">
          <h1 className="antialiased flex  mt-20 text-white font-semibold lg:text-5xl md:text-4xl xsm:text-3xl">{bookData.title}</h1>
          <BookResume/>
          <div className="flex justify-center">
          <Link to={`/${id}/book/${bookData.title}/${bookData.id}`} className="text-white font-semibold text-2xl bg-slate-700 py-3 lg:px-[10rem] xsm:px-10  hover:bg-slate-800 rounded-full">See the Book</Link>
          </div>
          </div>


          {/* BACKGROUND IMAGE */}

            </div>
          </div>
          {/* <div className=" z-10">
            <img src={bookData.img} className=" object-fill opacity-[3%] blur-sm w-screen h-[45rem]"/>
          </div> */}
        </div>


        )
      }
     
    }

  return (
    <>


    {/* //Bar */}
    
    <div className="flex flex-row-reverse bg-black py-2 px-10 justify-between items-center shadow-[-20px_40px_10px_30px_rgba(0,0,0,1)] z-30 ">
      <div className="flex items-center gap-5">

      <Modal fetch={fetchData}/>
      <img className="rounded-full h-14" src={userData.photoURL}/>
      </div>
      <button onClick={logout}>
        <svg width="36" height="45" viewBox="0 0 45 56" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" clipRule="evenodd" d="M7.5 4.30769C6.50544 4.30769 5.55161 4.76154 4.84835 5.56939C4.14509 6.37723 3.75 7.47291 3.75 8.61539V47.3846C3.75 48.5271 4.14509 49.6228 4.84835 50.4306C5.55161 51.2385 6.50544 51.6923 7.5 51.6923H22.5C23.4946 51.6923 24.4484 51.2385 25.1517 50.4306C25.8549 49.6228 26.25 48.5271 26.25 47.3846V36.6154C26.25 36.0442 26.4475 35.4963 26.7992 35.0924C27.1508 34.6885 27.6277 34.4615 28.125 34.4615C28.6223 34.4615 29.0992 34.6885 29.4508 35.0924C29.8025 35.4963 30 36.0442 30 36.6154V47.3846C30 49.6696 29.2098 51.8609 27.8033 53.4766C26.3968 55.0923 24.4891 56 22.5 56H7.5C5.51088 56 3.60322 55.0923 2.1967 53.4766C0.790177 51.8609 0 49.6696 0 47.3846V8.61539C0 6.33044 0.790177 4.13909 2.1967 2.52339C3.60322 0.90769 5.51088 0 7.5 0H22.5C24.4891 0 26.3968 0.90769 27.8033 2.52339C29.2098 4.13909 30 6.33044 30 8.61539V19.3846C30 19.9559 29.8025 20.5037 29.4508 20.9076C29.0992 21.3115 28.6223 21.5385 28.125 21.5385C27.6277 21.5385 27.1508 21.3115 26.7992 20.9076C26.4475 20.5037 26.25 19.9559 26.25 19.3846V8.61539C26.25 7.47291 25.8549 6.37723 25.1517 5.56939C24.4484 4.76154 23.4946 4.30769 22.5 4.30769H7.5ZM20.075 17.8626C20.4261 18.2664 20.6234 18.8138 20.6234 19.3846C20.6234 19.9554 20.4261 20.5028 20.075 20.9067L15.775 25.8462H43.125C43.6223 25.8462 44.0992 26.0731 44.4508 26.477C44.8025 26.8809 45 27.4288 45 28C45 28.5712 44.8025 29.1191 44.4508 29.523C44.0992 29.9269 43.6223 30.1538 43.125 30.1538H15.775L20.075 35.0933C20.2592 35.2905 20.407 35.5283 20.5095 35.7925C20.6119 36.0567 20.667 36.3419 20.6715 36.6311C20.6759 36.9203 20.6296 37.2076 20.5353 37.4758C20.441 37.744 20.3006 37.9876 20.1226 38.1921C19.9445 38.3966 19.7325 38.5579 19.499 38.6662C19.2655 38.7745 19.0155 38.8277 18.7637 38.8226C18.5119 38.8175 18.2637 38.7542 18.0337 38.6365C17.8037 38.5188 17.5967 38.349 17.425 38.1374L9.925 29.5221C9.57388 29.1182 9.37665 28.5708 9.37665 28C9.37665 27.4292 9.57388 26.8818 9.925 26.478L17.425 17.8626C17.7766 17.4592 18.2531 17.2327 18.75 17.2327C19.2469 17.2327 19.7234 17.4592 20.075 17.8626Z" fill="white"/>
        </svg>
      </button>
    </div>


    {/* //Middle */}


    <div className=" mx-auto bg-black">
          <div className="">
              <ShowBook/>
              <div className="mx-20 grid gap-y-10 mt-20 lg:grid-cols-5 md:grid-cols-3 md:gap-10 xsm:grid-cols-1 xsm:content-center">
              <ShowBooks/>
              </div>
          </div>
        </div>
    </>
  );
}

export default UserBooks;