import Modal from "react-modal";
import { useState, useEffect } from "react";
import css from "./App.module.css";
import SearchBar from "./SearchBar/SearchBar";
import toast, { Toaster } from "react-hot-toast";
import { getPhotos } from "./ApiService/GetPhotos";
import ImageGallery from "./ImageGallery/ImageGallery";
import { RotatingLines } from "react-loader-spinner";
import { LoadMoreBtn } from "./LoadMoreBtn/LoadMoreBtn";
import ImageModal from "./ImageModal/ImageModal";

Modal.setAppElement("#root");

export default function App() {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [gallery, setGallery] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [totalResults, setTotalResults] = useState(0);
  const [isEndOfCollection, setIsEndOfCollection] = useState(false);
  const [isNoResults, setIsNoResults] = useState(false);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [modalImageUrl, setModalImageUrl] = useState("");
  const [modalImageAlt, setModalImageAlt] = useState("");

  useEffect(() => {
    if (!query) return;

    const handleGallery = async () => {
      try {
        setIsLoading(true);
        setIsError(false);
        const value = await getPhotos(query, page);

        if (page === 1 && value.total === 0) {
          setIsNoResults(true);
          setGallery([]);
          toast.error("There is no image matching your request ");
        } else {
          setIsNoResults(false);
          setGallery((prevValue) => [...prevValue, ...value.results]);
        }

        setTotalResults(value.total);

        if ((page - 1) * 15 + value.results.length >= value.total) {
          setIsEndOfCollection(true);
        } else {
          setIsEndOfCollection(false);
        }
      } catch (error) {
        setIsError(true);
        console.error("Error fetching gallery:", error);
      } finally {
        setIsLoading(false);
      }
    };

    handleGallery();
  }, [query, page]);

  const getQuery = (value) => {
    setQuery(value);
    setPage(1);
    setGallery([]);
    setIsEndOfCollection(false);
    setIsNoResults(false);
  };

  const handleLoadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const openModal = (imageUrl, imageAlt) => {
    setModalImageUrl(imageUrl);
    setModalImageAlt(imageAlt);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };
  const customStyles = {
    content: {
      position: "fixed",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      padding: "0",
      border: "none",
      background: "white",
      overflow: "hidden",
    },
    overlay: {
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: "rgba(0, 0, 0, 0.75)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
  };

  return (
    <div className={css.container}>
      <div className={css.titleCont}>
        <h1 className={css.title}>
          Start your search of high-quality photos in the largest open
          collection.
        </h1>
      </div>
      <SearchBar onSubmit={getQuery} />
      <Toaster />
      {isError && (
        <p className={css.warningText}>
          Sorry! There was an error. Try to reload!
        </p>
      )}
      {isNoResults && <p className={css.warningText}>No images found.</p>}
      {gallery.length > 0 && (
        <ImageGallery gallery={gallery} onImageClick={openModal} />
      )}
      {isLoading && (
        <p className={css.loadingText}>Loading photos, please wait...</p>
      )}
      {isEndOfCollection && !isLoading && !isNoResults && (
        <p className={css.warningText}>No more images to display.</p>
      )}
      {!isEndOfCollection && gallery.length > 0 && !isLoading && (
        <LoadMoreBtn onClick={handleLoadMore} />
      )}
      {isLoading && (
        <div className={css.loaderContainer}>
          <RotatingLines visible={isLoading} />
        </div>
      )}
      <ImageModal
        isOpen={modalIsOpen}
        onClose={closeModal}
        customStyles={customStyles}
        imageUrl={modalImageUrl}
        imageAlt={modalImageAlt}
      />
    </div>
  );
}
