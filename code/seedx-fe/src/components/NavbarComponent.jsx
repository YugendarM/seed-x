import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import Cookies from 'js-cookie';
import { TiShoppingCart } from 'react-icons/ti';
import logo from "../../public/vite.svg"
import { CiSearch } from 'react-icons/ci';
import { RiSeedlingFill } from 'react-icons/ri';
import { FaChevronDown } from 'react-icons/fa';

const NavbarComponent = () => {

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const {pathname} = useLocation()

  useEffect(() => {
    const sessionToken = Cookies.get('SessionID');
    if (sessionToken) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [pathname]);  

  return (
    <div className={`z-30 w-full flex px-5 md:px-20 lg:px-56 py-4 items-center justify-between ${pathname === "/" ? "shadow-none" : "shadow-lg"}`}>
      <div className='flex items-center gap-10 w-[50%]'>
        <Link to={"/"}>
          {/* <img src={logo} className='h-10 w-10'/> */}
          <h1 className='text-white text-lg font-normal bg-seedxPrimaryGreen rounded-sm py-1.5 px-6 flex items-center gap-1'><RiSeedlingFill className='text-inherit text-2xl' />Seed'X</h1>
        </Link>
        <div className='flex items-center gap-2 w-full'>
          <CiSearch  className='text-2xl'/>
          <input className='focus:outline-0 w-full text-base placeholder:text-gray-600' placeholder='Search for Product, Category and More'/>
        </div>
      </div>
      <div>
        <nav className='md:flex items-center gap-12 hidden '>
          <Link to={"/"} className={`text-lg font-medium py-2 transition ${pathname === "/" ? "text-seedxTextGreen " : "text-gray-800 border-none"}`}>Home</Link>
          <Link to={"/products"} className={`text-lg font-medium py-2 transition flex items-center gap-1 ${pathname.includes("/products") ? "text-seedxTextGreen " : "text-gray-800 border-none"}`}>Products <FaChevronDown className='text-inherit text-xs' /></Link>
          {
            isLoggedIn ? 
            <>
              <Link to={"/viewcart"} className={`text-lg font-medium py-2 transition flex items-center gap-1 ${pathname.includes("/viewcart") ? "text-seedxTextGreen " : "text-gray-800 border-none"}`}><TiShoppingCart className='text-inherit text-2xl'/>Cart</Link>
              <Link to={"/profile"} className={`text-lg font-medium py-2 transition flex items-center gap-1 ${pathname.includes("/profile") ? "text-seedxTextGreen " : "text-gray-800 border-none"}`}>Yugendar <img className='h-8 w-8' src='https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/2048px-Default_pfp.svg.png'/></Link>
            </>
            :
            <>
              <Link to={"/login"} className={`text-lg font-medium py-2 transition ${pathname.includes("/login") ? "text-seedxTextGreen " : "text-gray-800 border-none"}`}>Login</Link>
              <Link to={"/signup"} className={`text-lg font-medium py-2 transition ${pathname.includes("/signup") ? "text-seedxTextGreen " : "text-gray-800 border-none"}`}>Signup</Link>
            </>
          }
        </nav>
      </div>
    </div>
  )
}

export default NavbarComponent
