import { Button } from './Button/Button';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Loader } from './Loader/Loader';
import { Searchbar } from './Searchbar/Searchbar';
import { fetchData } from './api/api';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState } from 'react';
import { useEffect } from 'react';

export const App = () => {
  const [searcheQuery, setSearcheQuery] = useState('');
  const [page, setPage] = useState(1);
  const [dataImages, setDataImages] = useState([]);
  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const imagesApi = async () => {
      if (!searcheQuery) return;
      try {
        setIsLoading(true);
        const data = await fetchData(searcheQuery, page);

        if (data.totalHits === 0) {
          toast.warning('Not a valid request. Please enter a valid value!', {
            autoClose: 1000,
            hideProgressBar: true,
            theme: 'colored',
          });
          return;
        }
        if (page === 1) {
          toast.success(`Hooray! We found ${data.total} images.`, {
            autoClose: 1000,
            hideProgressBar: true,
            theme: 'colored',
          });
        }
        setDataImages(prevState => [...prevState, ...data.hits]);
        setTotal(data.totalHits);
      } catch (error) {
        setError(error.message);
        toast.error(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    imagesApi();
  }, [searcheQuery, page]);

  const handleFormSubmit = searcheQuerySubmit => {
    if (searcheQuery !== searcheQuerySubmit) {
      setSearcheQuery(searcheQuerySubmit);
      setPage(1);
      setDataImages([]);
    }
  };
  const buttonLoadMore = () => {
    setPage(prevState => prevState + 1);

    // page: prevState.page + 1,
  };
  return (
    <>
      <Searchbar onSubmit={handleFormSubmit} />
      {!error && (
        <div>
          <p>{error}</p>
        </div>
      )}
      {dataImages.length > 0 && <ImageGallery images={dataImages} />}
      {isLoading && <Loader />}
      {!isLoading && total !== dataImages.length && (
        <Button onClick={buttonLoadMore} />
      )}
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
};

// export class oldApp extends Component {
//   state = {
//     searcheQuery: '',
//     page: 1,
//     dataImages: [],
//     total: 0,
//     isLoading: false,
//     error: null,
//   };
//   async componentDidUpdate(_, prevState) {
//     const { searcheQuery, page } = this.state;
//     if (prevState.searcheQuery !== searcheQuery || prevState.page !== page) {
//       this.setState({ isLoading: true });
//       try {
//         const data = await fetchData(searcheQuery, page);

//         if (data.totalHits === 0) {
//           toast.warning('Not a valid request. Please enter a valid value!', {
//             autoClose: 1000,
//             hideProgressBar: true,
//             theme: 'colored',
//           });
//           return;
//         }
//         if (page === 1) {
//           toast.success(`Hooray! We found ${data.total} images.`, {
//             autoClose: 1000,
//             hideProgressBar: true,
//             theme: 'colored',
//           });
//         }
//         this.setState(prevState => ({
//           dataImages: [...prevState.dataImages, ...data.hits],
//           total: data.totalHits,
//         }));
//       } catch (error) {
//         this.setState({ error });
//         toast.error(error.message);
//       } finally {
//         this.setState({ isLoading: false });
//       }
//     }
//   }
//   handleFormSubmit = searcheQuery => {
//     this.setState({ searcheQuery, page: 1, dataImages: [] });
//   };
//   buttonLoadMore = () => {
//     this.setState(prevState => {
//       return { page: prevState.page + 1 };
//     });

//     // page: prevState.page + 1,
//   };
//   render() {
//     const { dataImages, isLoading, total } = this.state;
//     return (
//       <>
//         <Searchbar onSubmit={this.handleFormSubmit} />
//         {dataImages.length > 0 && <ImageGallery images={dataImages} />}
//         {isLoading && <Loader />}
//         {!isLoading && total !== dataImages.length && (
//           <Button onClick={this.buttonLoadMore} />
//         )}
//         <ToastContainer
//           position="top-right"
//           autoClose={5000}
//           hideProgressBar={false}
//           newestOnTop={false}
//           closeOnClick
//           rtl={false}
//           pauseOnFocusLoss
//           draggable
//           pauseOnHover
//           theme="light"
//         />
//       </>
//     );
//   }
// }
