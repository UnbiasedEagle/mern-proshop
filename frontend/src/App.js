import React from "react";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import HomeScreen from "./screens/HomeScreen";

const App = () => {
  return (
    <React.Fragment>
      <Header></Header>
      <main className="py-3">
        <div className="container">
          <HomeScreen></HomeScreen>
        </div>
      </main>
      <Footer></Footer>
    </React.Fragment>
  );
};

export default App;
