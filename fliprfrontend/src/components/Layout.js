import ComplexNavbar from "./Navbar";


export default function Layout({ children }) {

  return (
    <>
      <ComplexNavbar/>
      <main>{children}</main>
    </>
  )
}