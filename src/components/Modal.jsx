import { useState, useEffect } from "react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore" // getDoc pega somente de 1
import { db, storage} from "../config/firebase";
import { ref, uploadBytesResumable, getDownloadURL } from '@firebase/storage';
import { useParams } from "react-router";

export default function Modal({fetch}) {
  
  
  const [showModal, setShowModal] = useState(false);
  const [img, setImg] = useState("");
  const [file, setFile] = useState("")
  const [newBookTitle, setNewBookTitle] = useState("");
  const [newBookResume, setNewBookResume] = useState("");
  const [ progress, setProgress ] = useState(0)

  const { id } = useParams();
  const userId = id
  
  useEffect(() => {
    const uploadFile = () => {
      
      new Date().getTime() + file.name
      const storageRef = ref(storage, file.name)
      const uploadTask = uploadBytesResumable(storageRef, file);
      
      uploadTask.on('state_changed',
      (snapshot) => {
        
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        (setProgress(progress));
        switch (snapshot.state) {
          case 'paused':
            console.log('Upload is paused');
            break;
            case 'running':
              console.log('Upload is running');
              break;
              default:
                break;
              }
            },
            (err) => {
              console.log(err)
            },
            () => {
              getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                setImg(downloadURL)
              });
            }
            );
          };
          file && uploadFile();
        },[file])


        const handleAddTask = async () => {

          try{
            await addDoc(collection(db, "users", userId, "books"), {
              title: newBookTitle,
              text: newBookResume,
              img: img,
              Timestamp: serverTimestamp()
            });
            fetch()
            setShowModal(false);
          }catch(err){
            console.log(err);
          }
        };
              
      

  return (
    <>
      <button
        className=" text-white font-semibold hover:underline hover:decoration-2 text-md ease-linear transition-all duration-150"
        type="button"
        onClick={() => setShowModal(true)}
      >
        Add Book
      </button>
      {showModal ? (
        <>
          <div
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
          >
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col  w-full  bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-3xl font-semibold">
                    Insert a Book
                  </h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}




                <div className="relative p-6 flex flex-col gap-4">
                <input className="bg-slate-200 p-3 rounded-lg border-b-4 border-black"  onChange={(e) => setNewBookTitle(e.target.value)}placeholder="Title..."/>
                <form>
                    <textarea onChange={(e) => setNewBookResume(e.target.value)} className="bg-slate-200 p-3 rounded-lg border-b-4 border-black w-full min-h-[200px]"placeholder="Text..."></textarea>
                 </form>
                <input className=""type="file" onChange={(e) => setFile(e.target.files[0])}/>
                <progress value={progress} max={100} className="rounded-sm"/>
                </div>
                {/*footer*/}



                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button>
                  <button
                    className="bg-purple-700 text-white hover:bg-purple-800 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={handleAddTask}
                  >
                    Add Book
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-75 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
}