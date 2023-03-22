import { Auth } from "./Auth";

export const Bar = () => {


  return (
    <div className="flex bg-slate-700 py-2 px-10 justify-between items-center ">
      <h1 className="text-2xl font-bold text-white ">Book's Collection</h1>
      <Auth />
      
    </div>
  );
};