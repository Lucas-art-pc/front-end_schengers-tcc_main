import { Outlet } from "react-router-dom";
import { Footer } from "../../components/Footer";
import { Heading } from "../../components/Heading";

export const GuestLayout = () => {
  return (
    <>
      <Heading />
      
        <Outlet/>
      
      <Footer />
    </>
  );
};