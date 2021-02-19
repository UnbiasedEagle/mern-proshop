import React from "react";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";

const App = () => {
  return (
    <React.Fragment>
      <Header></Header>
      <main className="py-3">
        <div className="container">
          <h1>Hello World</h1>
        </div>
      </main>
      <Footer></Footer>
    </React.Fragment>
  );
};

export default App;
