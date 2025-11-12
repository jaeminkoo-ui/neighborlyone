import { useState, useEffect } from "react";
import hero1 from "../assets/hero/hero1.jpg";
import hero2 from "../assets/hero/hero2.jpg";
import hero3 from "../assets/hero/hero3.jpg";
import hero4 from "../assets/hero/hero4.jpg";

const heroImages = [hero1, hero2, hero3, hero4];

export default function HeroSlideshow({ children, className = "" }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loadedImages, setLoadedImages] = useState({});

  // Preload all images
  useEffect(() => {
    const imagePromises = heroImages.map((src, index) => {
      return new Promise((resolve) => {
        const img = new Image();
        img.onload = () => {
          setLoadedImages(prev => ({ ...prev, [index]: true }));
          resolve();
        };
        img.onerror = () => {
          console.error(`Failed to load image: ${src}`);
          resolve();
        };
        img.src = src;
      });
    });

    Promise.all(imagePromises).then(() => {
      console.log("All images preloaded");
    });
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % heroImages.length);
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`relative w-full overflow-hidden ${className}`}>
      {/* Background Images */}
      <div className="absolute inset-0">
        {heroImages.map((image, index) => (
          <div
            key={image}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentIndex ? "opacity-100" : "opacity-0"
            }`}
            style={{
              backgroundImage: `url(${image})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          />
        ))}
        {/* Dark Overlay - 70% opacity */}
        <div className="absolute inset-0 bg-black opacity-70" />
      </div>

      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex gap-2">
        {heroImages.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === currentIndex
                ? "bg-white w-8"
                : "bg-white/50 hover:bg-white/75"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

