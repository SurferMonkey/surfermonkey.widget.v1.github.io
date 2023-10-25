import React, { useState } from 'react';
import '../styles/Upload.css';
import { CHAIN_IDS } from '../configWidget';

const YourComponent = ({ globalVariable, setGlobalVariable }) => {
  const [fileUploaded, setFileUploaded] = useState(false);
  const [stringOut, setStringOut] = useState('');

  function selectNetName(value) {
    const chainDetails = CHAIN_IDS[value];
    return chainDetails ? chainDetails.name : "Unknown";
  }

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (file.type !== "application/json") {
        alert("Invalid file type. Please upload a JSON file.");
        return;
      }
      const maxSize = 0.002 * 1024 * 1024; // 2kb in bytes
      if (file.size > maxSize) {
        alert("File size is too large. Please upload a file smaller than 2 KB.");
        return;
      }
      // Process the JSON file
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const json = JSON.parse(e.target.result);
          let chainIdSource = selectNetName(json.sourceChainID)
          let chainIdTarget = selectNetName(json.destinationChainID)

          setGlobalVariable(json);
          setFileUploaded(true);
          setStringOut(`${file.name}... <br /> From ${chainIdSource} <br /> To: ${chainIdTarget}`)

          console.log("Print deposit object: ", json);
          document.getElementById("trans2").classList.remove("hidden");
        } catch (err) {
          console.error('Error parsing JSON:', err);
        }
      };
      reader.readAsText(file);
    }
  };

  return (
    <div className="button-container">
      <label className="button" htmlFor="file-upload">
        Upload JSON File
        <input
          type="file"
          id="file-upload"
          accept=".json"
          onChange={handleFileUpload}
          style={{ display: 'none' }}
        />
      </label>
      {fileUploaded && (
        <div className="upload-status">
          <span role="img" aria-label="checkmark">✔️</span>
          <span dangerouslySetInnerHTML={{ __html: stringOut }} />
        </div>
      )}
    </div>
  );
};

export default YourComponent;


