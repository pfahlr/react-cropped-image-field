import React, { useState, useCallback } from "react";
import Cropper from "react-easy-crop";
import getCroppedImg from "./utils/cropImage";
import PropTypes from "prop-types";


const  CroppedImageField = ({
  name = "profile_image",
  aspect = 1,
  width = 256,
  height = 256,
  onChange = () => {},
  defaultValue = "",
}) => {
  const [imageSrc, setImageSrc] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [cropSize, setCropSize] = useState({width:width,height:height});
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  const onCropComplete = useCallback((_, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
    //setImageSrc(croppedAreaPixels);
  }, []);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setImageSrc(reader.result);
    reader.readAsDataURL(file);
  };

  const handleCropImage = async () => {
    const croppedImage = await getCroppedImg(imageSrc, croppedAreaPixels);
    onSave(croppedImage); // base64 string
    setImageSrc(croppedImage);
  };

  const onSave= (image) => {
    console.log(image);
    setImageSrc(image);
  }

  return (
    <div className="relative">
      <img src={imageSrc}/>
      <input type="hidden" name={name} value={imageSrc} />
      <input type="file" accept="image/*" onChange={handleFileChange} />
      {imageSrc && (
          <>
          <div className="relative w-full h-64 bg-gray-800 mt-4">
          <Cropper
            image={imageSrc}
            crop={crop}
            zoom={zoom}
            aspect={aspect}
            cropSize={cropSize}
            
            onCropSizeChange={setCropSize}
            onCropChange={setCrop}
            onZoomChange={setZoom}
            onCropComplete={onCropComplete}
          />
        </div>
        </>
      )}

      {imageSrc && (

  <div className="absolute bottom-2 right-2 z-50" style={{'position':'absolute', 'bottom':'100px', 'right':'100px'}}>
    <button
      className="px-4 py-2 bg-blue-600 text-white rounded shadow-lg"
      onClick={handleCropImage}
    >
      Crop & Save
    </button>
  </div>
      )}
    </div>
  );
}
CroppedImageField.propTypes = {
  name: PropTypes.string,
  aspect: PropTypes.number,
  width: PropTypes.number,
  height: PropTypes.number,
  onChange: PropTypes.func,
  defaultValue: PropTypes.string,
};

export default CroppedImageField;