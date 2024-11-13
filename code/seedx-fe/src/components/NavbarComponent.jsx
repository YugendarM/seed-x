import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { TiShoppingCart } from 'react-icons/ti';
import { CiSearch } from 'react-icons/ci';
import { RiSeedlingFill } from 'react-icons/ri';
import { FaChevronDown } from 'react-icons/fa';
import InputComponent from '../elements/InputComponent';
import LinkComponent from '../elements/LinkComponent';
import ButtonComponent from '../elements/ButtonComponent';
import useUserContext from '../hooks/useUserContext';
import { GiBackwardTime } from 'react-icons/gi';

const NavbarComponent = () => {

  const {isUserLoggedIn, userProfile} = useUserContext()

  const [searchQuery, setSearchQuery] = useState("")
  const [isSearchPalletVisible, setIsSearchPalletVisible] = useState(false)
  const [recentSearches, setRecentSearches] = useState([])
  const [searchSuggestions, setSearchSuggestions] = useState(["askkdfn", ";kakns;djf"])

  const {pathname} = useLocation()
  const navigate = useNavigate()

  const navigateProduct = (category) => {
    navigate(`/products/?category=${encodeURIComponent(category)}`)
  }

  const handleSearchQueryChange = (event) => {
    setSearchQuery(event.target.value)
  }

  const handleSearch = (event) => {
    if(event.key === "Enter" && searchQuery.trim())
    {
      const updatedSearches = [searchQuery, ...recentSearches.filter(query => query !== searchQuery).slice(0, 4)]
      localStorage.setItem('recentSearches', JSON.stringify(updatedSearches))
      navigate(`/products/?query=${encodeURIComponent(searchQuery)}`)
    }
  }

  const handleRecentSearchclick = (query) => {
    setSearchQuery(query)
    navigate(`/products/?query=${encodeURIComponent(query)}`)
  }

  const makeSearchPalletVisible = () => {
    setIsSearchPalletVisible(true)
  }

  const makeSearchPalletInVisible = () => {
    setIsSearchPalletVisible(false)
  }

  useEffect(() => {
    const storedSearches = JSON.parse(localStorage.getItem('recentSearches')) || []
    setRecentSearches(storedSearches)
  }, [pathname])

  useEffect(() => {
    if(!pathname.includes("products")){
      setSearchQuery("")
    }
    setIsSearchPalletVisible(false)
  }, [pathname])

  return (
    <div className={`bg-white flex justify-center fixed top-0 z-30 w-full ${pathname === "/" || pathname.includes('login') || pathname.includes('signup') ? "shadow-none" : "shadow-lg"}`}>
    <div className={` bg-white w-full flex px-5 max-w-[1200px] py-4 items-center justify-between`}>
      <div className='flex items-center gap-10 w-[60%]'>
        <LinkComponent to={"/"}>
          {/* <img src={logo} className='h-10 w-10'/> */}
          <h1 className='text-white text-lg font-normal bg-seedxPrimaryGreen rounded-sm py-1.5 px-6 flex items-center gap-1'><RiSeedlingFill className='text-inherit text-2xl' />Seed'X</h1>
        </LinkComponent>
        {
          (pathname.includes("login") || pathname.includes('signup')) ||
          <div className='w-full relative'>
            <div className='flex items-center gap-2 w-full px-2'>
              <CiSearch  className='text-2xl'/>
              <InputComponent 
                onFocus={makeSearchPalletVisible} 
                onBlur={makeSearchPalletInVisible} 
                type="search" 
                onKeyDown={handleSearch} 
                value={searchQuery} 
                onChange={handleSearchQueryChange} 
                className='focus:outline-0 w-full text-base placeholder:text-gray-600' 
                placeholder='Search for Product, Category, City and More'
              />
            </div>
            {
              isSearchPalletVisible && 
              <div className='absolute left-0 right-0 bg-white rounded-md transition px-2 py-4'>
                {
                  recentSearches?.length>0 && searchQuery?.length === 0 &&
                  <div className='recent-search-container'>
                    {
                      recentSearches?.length > 0 &&
                      recentSearches?.map((query, index) => (
                        <ButtonComponent  
                          key={index}
                          onMouseDown={handleRecentSearchclick.bind(null, query)} 
                          className='flex items-center gap-4 w-full py-2'
                        >
                          <GiBackwardTime className='text-2xl'/>
                          {query}
                        </ButtonComponent>
                      ))
                    }
                  </div>
                }
                {
                  searchQuery?.length > 0 &&
                  <div className='search-suggestion-container flex flex-col items-start justify-center'>
                    {
                      searchSuggestions?.length > 0 &&
                      searchSuggestions?.map((query, index) => (
                        <ButtonComponent
                          key={index}
                          onMouseDown={handleRecentSearchclick.bind(null, query)} 
                          className='flex items-center gap-4 w-full py-2'
                        >
                          <CiSearch  className='text-xl'/>
                          {query}
                        </ButtonComponent>
                      ))
                    }
                  </div>
                }
              </div>
            }
          </div>
        }
      </div>
      <div>
        <nav className='md:flex items-center gap-12 hidden '>
          <LinkComponent to={"/"} className={`text-lg font-medium py-2 transition ${pathname === "/" ? "text-seedxTextGreen " : "text-gray-800 border-none"}`}>Home</LinkComponent>
          <div className='group relative'>
            <LinkComponent to={"/products"} className={`text-lg font-medium transition py-2 flex items-center gap-1 cursor-pointer ${pathname.includes("/products") ? "text-seedxTextGreen " : "text-gray-800 border-none"}`}>Products <FaChevronDown className='text-inherit text-xs' /></LinkComponent>
            <div className='w-60 text-lg bg-white shadow-custom-medium absolute right-0 top-full hidden group-hover:flex flex-col items-start overflow--scroll rounded-md'>
              <ButtonComponent onClick={navigateProduct.bind(null, "fruits")} className={'hover:bg-seedxSecondaryGreen hover:bg-opacity-50 w-full text-start py-2 px-3 transition'}>Fruits</ButtonComponent>
              <ButtonComponent onClick={navigateProduct.bind(null, "vegetables")} className={'hover:bg-seedxSecondaryGreen hover:bg-opacity-50 w-full text-start py-2 px-3 transition'}>Vegetables</ButtonComponent>
              <ButtonComponent onClick={navigateProduct.bind(null, "pulses")} className={'hover:bg-seedxSecondaryGreen hover:bg-opacity-50 w-full text-start py-2 px-3 transition'}>Pulses</ButtonComponent>
              <ButtonComponent onClick={navigateProduct.bind(null, "cereals")} className={'hover:bg-seedxSecondaryGreen hover:bg-opacity-50 w-full text-start py-2 px-3 transition'}>Cereals</ButtonComponent>
              <ButtonComponent onClick={navigateProduct.bind(null, "spices")} className={'hover:bg-seedxSecondaryGreen hover:bg-opacity-50 w-full text-start py-2 px-3 transition'}>Spices</ButtonComponent>
              <ButtonComponent onClick={navigateProduct.bind(null, "nuts")} className={'hover:bg-seedxSecondaryGreen hover:bg-opacity-50 w-full text-start py-2 px-3 transition'}>Nuts</ButtonComponent>
            </div>
          </div>
          {
            isUserLoggedIn ? 
            <>
              <LinkComponent to={"/viewcart"} className={`text-lg font-medium py-2 transition flex items-center gap-1 ${pathname.includes("/viewcart") ? "text-seedxTextGreen " : "text-gray-800 border-none"}`}><TiShoppingCart className='text-inherit text-2xl'/>Cart</LinkComponent>
              <LinkComponent to={"/account"} className={`text-lg font-medium py-2 transition flex items-center gap-1 capitalize ${pathname.includes("/profile") ? "text-seedxTextGreen " : "text-gray-800 border-none "}`}>{userProfile?.firstName}<img className='h-8 w-8' src='https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/2048px-Default_pfp.svg.png'/></LinkComponent>
            </>
            :
            <>
              <LinkComponent to={"/login"} className={`text-lg font-medium py-2 transition ${pathname.includes("/login") ? "text-seedxTextGreen " : "text-gray-800 border-none"}`}>Login</LinkComponent>
              <LinkComponent to={"/signup"} className={`text-lg font-medium py-2 transition ${pathname.includes("/signup") ? "text-seedxTextGreen " : "text-gray-800 border-none"}`}>Signup</LinkComponent>
            </>
          }
        </nav>
      </div>
    </div>
    </div>
  )
}

export default NavbarComponent
