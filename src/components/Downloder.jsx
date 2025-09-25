import { useState } from "react";

const Downloder = ({ client }) => {
  const [linkInput, setLinkInput] = useState("");
  const [status, setStatus] = useState("");
  const [fileUri, setFileUri] = useState("");

const handleDownload = () => {
  console.log("1. 'handleDownload' function was called."); 

  if (!linkInput || !linkInput.trim()) {
    setStatus("Please paste a magnet link first.");
    return; // This stops the function from continuing if the input is empty.
  }

  // The rest of your function stays exactly the same.
  client.add(linkInput, (torrent) => {
    console.log("2. SUCCESS: Connected to peer and received torrent metadata.");
    setStatus('Connecting to peers...');

   const interval = setInterval(() => {
    
      const progress = (torrent.progress * 100).toFixed(1);
      setStatus(`Downloading... ${progress}%`);
   }, 50);
    

    torrent.on('done', () => {
       clearInterval(interval);
      setStatus('Download complete!');
      const file = torrent.files[0];
      console.log('inspecting the file object :' , file)

      if (file) {
        file.blob()
          .then(blob => {
            const url = URL.createObjectURL(blob);
            setFileUri(url);
          })
          .catch(err => {
            console.error(err.message);
          });
      }
    });
  });
};

  return (
    <div>
      <h2>Download The file </h2>
      <input
      name="download link input"
        type="text"
        value={linkInput}
        onChange={(e) => setLinkInput(e.target.value)}
      />
      <button onClick={handleDownload}>Download</button>
      <p>{status}</p>
      <p>{fileUri && <a href={fileUri}>Download Finished File</a>}</p>
    </div>
  );
};

export default Downloder;
