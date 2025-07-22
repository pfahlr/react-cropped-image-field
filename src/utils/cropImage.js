export default function getCroppedImg(imageSrc, cropPixels, width = 256, height = 256) {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.src = imageSrc;
    image.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext("2d");

      const scaleX = image.naturalWidth / image.width;
      const scaleY = image.naturalHeight / image.height;

      ctx.drawImage(
        image,
        cropPixels.x * scaleX,
        cropPixels.y * scaleY,
        cropPixels.width * scaleX,
        cropPixels.height * scaleY,
        0,
        0,
        width,
        height
      );

      canvas.toBlob((blob) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.readAsDataURL(blob);
      }, "image/jpeg");
    };
    image.onerror = reject;
  });
}
