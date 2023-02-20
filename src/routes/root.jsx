import { useEffect, useState } from "react";
import { getDocs, collection, doc} from "firebase/firestore" // getDoc pega somente de 1
import { db } from "../config/firebase";
import { ListItem } from "../components/ListItem"
import { Bar } from "../components/Bar";


export default function Root() {
  
  const [data, setData ] = useState([]);
  
  useEffect(() => {
    const fetchData = async () => {
      let list = []
      try{
        const querySnapshot = await getDocs(collection(db, "books"));
        querySnapshot.forEach((doc) => {
          list.push({ id: doc.id, ...doc.data()})
        })
        setData(list);
      }catch(err){
        console.log(err)
      }
    }
    fetchData()
  }, [])

        
        const ShowBook = () => {

          return (
            data.map((item, index ) => (
              <ListItem key={index} item={item} id={data[index].id}/>
              )))
            }
            
  return (
    <>

<div>
  <Bar/>
  <div className="container mx-auto mt-20">
  <div className="grid lg:grid-cols-5 md:grid-cols-2 md:gap-10 gap-5">
  <ShowBook/>
  </div>
  </div>


</div>
    
    </>
  )
}
