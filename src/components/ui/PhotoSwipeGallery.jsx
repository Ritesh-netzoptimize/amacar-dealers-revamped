import React from 'react';
import { Gallery, Item } from 'react-photoswipe-gallery';
import 'photoswipe/dist/photoswipe.css';
import { Eye } from 'lucide-react';

const PhotoSwipeGallery = ({ 
  images, 
  vehicleName, 
  className = "", 
  imageClassName = "",
  showOverlay = true,
  onImageClick = null 
}) => {
  if (!images || images.length === 0) {
    return (
      <div className={`w-full h-full bg-gradient-to-br from-neutral-50 to-neutral-100 flex items-center justify-center ${className}`}>
        <span className="text-neutral-400 text-sm">No images available</span>
      </div>
    );
  }

  return (
    <Gallery>
      <div className={`relative group/image ${className}`}>
        {/* Show only the first image */}
        <Item
          original={images[0]}
          thumbnail={images[0]}
          width="1200"
          height="800"
          alt={`${vehicleName} - Image 1`}
        >
          {({ ref, open }) => (
            <div
              ref={ref}
              onClick={(e) => {
                e.preventDefault();
                if (onImageClick) {
                  onImageClick(e);
                } else {
                  open(e);
                }
              }}
              className={`relative overflow-hidden cursor-pointer ${imageClassName}`}
            >
              <img
                src={images[0]}
                alt={`${vehicleName} - Image 1`}
                className="w-full h-full object-cover object-center transition-transform duration-300 group-hover/image:scale-105"
              />
              
              {/* Overlay for better UX */}
              {showOverlay && (
                <div className="absolute inset-0 bg-black/0 group-hover/image:bg-black/40 transition-all duration-300 flex items-center justify-center">
                  <div className="opacity-0 group-hover/image:opacity-100 transition-opacity duration-200">
                    <div className="flex items-center gap-1.5">
                      <Eye className="w-3.5 h-3.5 text-white" />
                      <span className="text-white text-sm font-medium tracking-wide">
                        View
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </Item>
        
        {/* Add all images to the gallery for PhotoSwipe navigation */}
        {images.slice(1).map((image, index) => (
          <Item
            key={index + 1}
            original={image}
            thumbnail={image}
            width="1200"
            height="800"
            alt={`${vehicleName} - Image ${index + 2}`}
          >
            {({ ref, open }) => (
              <div ref={ref} onClick={open} style={{ display: 'none' }}>
                <img src={image} alt={`${vehicleName} - Image ${index + 2}`} />
              </div>
            )}
          </Item>
        ))}
        
        {/* Image counter */}
        {images.length > 1 && (
          <div className="absolute top-2 right-2 bg-black/50 text-white text-xs px-2 py-1 rounded-full">
            1 / {images.length}
          </div>
        )}
      </div>
    </Gallery>
  );
};

export default PhotoSwipeGallery;
