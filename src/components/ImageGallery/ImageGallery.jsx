import css from './ImageGallery.module.css'
import ImageItem from '../ImageItem/ImageItem';


  export default function ImageGallery({ gallery, onImageClick }) {
    
    return (
      <ul className={css.gallery}>
        {gallery.map((photo) => (
          <ImageItem key={photo.id} photo={photo} onImageClick={onImageClick} />
        ))}
      </ul>
    );
  }