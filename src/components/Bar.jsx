import Modal from "./Modal";
import { Auth } from "./Auth";

export const Bar = () => {
  return (
       <div className="flex bg-slate-700 p-4  justify-between">    
        <Auth/>   
        <Modal/>
</div>
  )
}

