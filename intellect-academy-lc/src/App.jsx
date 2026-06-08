import Navbar from "./components/navbar/Navbar";
import Hero from "./components/hero/Hero";
import About from "./components/about/About"
import Courses from "./components/courses/Courses";
import Branches from "./components/branches/Branches";
import Reviews from "./components/reviews/Reviews"
// import Footer from "./components/Footer";

function App() {
  return (
    <>
      <Navbar />
      <Hero />
      <About/>
      <Courses />
      <Branches />
      <Reviews/>
      {/* <Footer /> */} 
    </>
  );
}

export default App;