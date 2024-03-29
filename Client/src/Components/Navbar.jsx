import React,{useState} from 'react'
import {HiMenuAlt4} from 'react-icons/hi'
import {AiOutlineClose} from 'react-icons/ai'
import logo from '../images/logo.png'

const NavbarItem = ({title,classprop})=>{
  return(
        <li className={`mx-4 cursor-pointer ${classprop} `}>
            {title}
        </li>
  )
}

const Navbar = () => {
  const [ToggleMenu, setToggleMenu] = useState(false);
  return (
    <>
    <nav className='w-full flex md:justify-center justify-between items-center p-4'>
       <div className='md:flex-[0.5] flex-initial justify-centre items-center'>
           <img src={logo} alt='' className='w-32 cursor-pointer ' />
       </div>
    
    <ul className='text-white md:flex hidden list-none flex-row justify-centre items-centre flex-initial'>
           {["Market","Exchange","Tutorial","Wallet"].map((item,index)=>(
                <NavbarItem key={item+index} title={item}/>
           ))}
           <li className='bg-[#2952e3] py-1 px-7 mx-4 rounded-full cursor-pointer hover:bg-[#2546bd]'>
            Login
           </li>
    </ul>
    <div className='flex relative'>
       {ToggleMenu?<AiOutlineClose fontSize={28} className='text-white md:hidden cursor-pointer' onClick={()=> setToggleMenu(false)} />:<HiMenuAlt4 fontSize={28} className='text-white md:hidden cursor-pointer' onClick={()=> setToggleMenu(true)} />}
       {ToggleMenu && (
        <ul className='z-10 fixed top-0 right-2 p-3 w-[70vw] h-screen shadow-2xl md:hidden list-none flex flex-col justify-start items-end rounded-md blue-glassmorphism text-white animate-slide-in'>
          <li className='text-xl w-full my-2'>
               <AiOutlineClose onClick={()=> setToggleMenu(false)}/>
          </li>
          {["Market","Exchange","Tutorial","Wallet"].map((item,index)=>(
                <NavbarItem key={item+index} title={item} classprop='my-2 text-lg'/>
           ))}
        </ul>
       )}
    </div>
    </nav>
    </>
  )
}

export default Navbar