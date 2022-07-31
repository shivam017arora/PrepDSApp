import React, { Component } from "react";
const context = React.createContext();
const { Provider } = context;

class PostsContextProvider extends Component {
  state = {
    data: null,
    loading: true,
  };

  //update state 'data'
  updateData = (data) => {
    this.setState((prevState) => ({
      ...prevState,
      data: data,
    }));
  };

  //update state 'loading'
  updateLoading = (loading) => {
    this.setState((prevState) => ({
      ...prevState,
      loading: loading,
    }));
  };

  render() {
    return (
      <Provider
        value={{
          data: this.state.data,
          loading: this.state.loading,
          updateData: this.updateData,
          updateLoading: this.updateLoading,
        }}
      >
        {this.props.children}
      </Provider>
    );
  }
}

export { PostsContextProvider, context as PostsContext };
