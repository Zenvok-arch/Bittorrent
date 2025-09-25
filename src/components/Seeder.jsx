import { useState } from "react";

const Seeder = ({ client }) => {
  const [magnetLink, setMagnetLink] = useState("");
  const [copied, setCopied] = useState(false);
  const handleFileSelect = (e) => {
    const file = e.target.files[0];

    if (file && client) {
      client.seed(file, (torrent) => {
        console.log("seeding and created magnet link:", torrent.magnetURI);
        setMagnetLink(torrent.magnetURI);
      });
    }
  };

   const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(magnetLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // Reset "copied" state after 2 seconds
    } catch (err) {
      console.error('Failed to copy text: ', err);
      alert('Failed to copy text. Please try again.');
    }
  };

  return (
    <div className="h-[300px]">
      <h2 className="text-2xl text-center mt-10 mb-5 font-medium">
        Choose a <span className="text-[#63e]">file</span>
      </h2>
      <div className="flex flex-col gap-3.5 justify-center items-center">
        <input className="" onChange={handleFileSelect} type="file" />
        {magnetLink && (
          <div className="flex flex-col items-center w-full relative gap-2 mt-4">
            <p className="font-medium">Magnet Link:</p>
            <textarea
              readOnly
              value={magnetLink}
              className="w-2/3 h-20 p-2 text-sm text-white border rounded-md overscroll-none resize-none bg-black "
              onClick={(e) => e.target.select()}
            />

            
             <button onClick={handleCopy} className="absolute -bottom-7 right-1/5"> <img width={24} src={!copied ? "copy.png" : "mark.png"} alt="copy" /></button>
            
          </div>
        )}
      </div>
    </div>
  );
};

export default Seeder;
