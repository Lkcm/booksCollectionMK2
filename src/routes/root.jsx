import { Bar } from "../components/Bar";


export default function Root() {

  return (
    <>
      <div>
        <Bar/>

          <div className="w-full h-screen -mt-20 flex items-center justify-center">
            <p className="text-6xl text-slate-400 font-bold">
              You need to sign first
            </p>
          </div>


      </div>  
    </>
  )
}
