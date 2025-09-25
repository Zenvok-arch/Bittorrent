import { useEffect , useState } from "react"
import * as WebTorrent from 'webtorrent';
import Seeder from "./components/Seeder";
import Downloder from "./components/Downloder";

function App() {

const [client, setClient] = useState('')

  useEffect(() => {
  const webTorrentClient = new WebTorrent.default({
    tracker: {
      ws: 'ws://192.168.29.141:8000'
    }
  });
    setClient(webTorrentClient)
   console.log("WebTorrent client ready");
  
    return () => {
      webTorrentClient.destroy();
      setClient(null)
      console.log("WebTorrent client destroyed.");

    }
  }, [])
  

  return (
    <>
<div className="absolute inset-0 -z-10 h-full w-full items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]"></div>
    
      <div className="text-white">
        
        <h1 className="text-4xl font-bold h-20 flex justify-center items-center">
          Web<span className="text-[#63e]">Torrent</span> 
        </h1>
        <Seeder  client={client}/>
        <Downloder client={client}/>
      </div>
    </>
  )
}

export default App
