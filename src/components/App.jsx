import { Component } from 'react';
import { Button } from './Button/Button';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Loader } from './Loader/Loader';
import { Searchbar } from './Searchbar/Searchbar';
import { fetchData } from './api/api';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
//
export class App extends Component {
  state = {
    searcheQuery: '',
    page: 1,
    dataImages: [],
    total: 0,
    isLoading: false,
    error: null,
  };
  async componentDidUpdate(prevProps, prevState) {
    const { searcheQuery, page } = this.state;
    if (prevState.searcheQuery !== searcheQuery || prevState.page !== page) {
      this.setState({ isLoading: true });
      try {
        const data = await fetchData(searcheQuery, page);
        if (data.length === 0) {
          return;
        } else if (data.totalHits === 0) {
          toast.warning('Not a valid request. Please enter a valid value!', {
            autoClose: 1000,
            hideProgressBar: true,
            theme: 'colored',
          });
        }
        this.setState(prevState => ({
          dataImages: [...prevState.dataImages, ...data.hits],
          total: data.total,
        }));
        toast.success(`Hooray! We found ${data.total} images.`, {
          autoClose: 1000,
          hideProgressBar: true,
          theme: 'colored',
        });
      } catch (error) {
        this.setState({ error });
        toast.error(error.message);
      } finally {
        this.setState({ isLoading: false });
      }
    }
  }
  handleFormSubmit = searcheQuery => {
    this.setState({ searcheQuery, page: 1, dataImages: [] });
  };
  buttonLoadMore = () => {
    this.setState(prevState => {
      return { page: prevState.page + 1 };
    });

    // page: prevState.page + 1,
  };
  render() {
    const { dataImages, isLoading } = this.state;
    return (
      <>
        <Searchbar onSubmit={this.handleFormSubmit} />
        {dataImages.length > 0 && <ImageGallery images={dataImages} />}
        {isLoading && <Loader />}
        {dataImages.length >= 12 && <Button onClick={this.buttonLoadMore} />}
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
  }
}
