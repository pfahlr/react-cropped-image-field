import React from "react";
import ReactDOM from "react-dom/client";
import CroppedImageField from "../src/CroppedImageField";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <div className="p-4">
      <CroppedImageField width={264} height={264} onSave={(base64) => console.log(base64)} />
    </div>
  </React.StrictMode>
);
