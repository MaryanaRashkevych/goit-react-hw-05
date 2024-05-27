
import css from "./ImageItem.module.css";


export default function ImageItem({ photo, onImageClick }) {
    const handleClick = () => {
      onImageClick(photo.urls.regular, photo.alt_description);
    };
    return (
        
      <ul className={css.galleryItem} onClick={handleClick}>
        
        <img src={photo.urls.small} alt={photo.alt_description} className={css.image} />
      </ul>
    );
  }