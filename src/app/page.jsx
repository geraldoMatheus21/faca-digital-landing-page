import FloatingButton from "@/components/floating-button";
import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import AboutUs from "@/containers/about";
import Contact from "@/containers/contact";
import Home from "@/containers/home";
import Works from "@/containers/works";

export default function App() {
  return (
    <>
      <Navbar />
      <FloatingButton />
      <Home />
      <Works />
      <AboutUs />
      <Contact />
      <Footer />
    </>
  );
}
