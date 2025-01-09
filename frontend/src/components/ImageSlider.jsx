import { useState, useEffect } from "react";

const images = [
  "https://media.istockphoto.com/id/2150678874/photo/young-woman-boarding-an-airplane.jpg?s=1024x1024&w=is&k=20&c=eMfavGvBPTk6aJ3pGcHRtQOiPvl6Oje_RjQdi1kbSo8=",
  "https://cdn.pixabay.com/photo/2023/05/28/13/15/helicopter-8023696_640.jpg",
];

export function ImageSlider() {
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImage((prevImage) => (prevImage + 1) % images.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden">
      {images.map((src, index) => (
        <img
          key={src}
          src={src}
          alt={`Slide ${index + 1}`}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
            index === currentImage ? "opacity-100" : "opacity-0"
          }`}
          style={{ zIndex: index === currentImage ? 1 : 0 }}
        />
      ))}
      <div className="absolute inset-0 bg-black/40 z-10" />
    </div>
  );
}
