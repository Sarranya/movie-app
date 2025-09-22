import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <div className='fixed flex items-center justify-between p-4 w-full absolute'>
      <h1 className='text-red-600 text-4xl font-bold cursor-pointer' onClick={() => navigate('/')}>NETFLIX</h1>
      <div>
        {/* <button className='pr-4'>Sign In</button>
        <button className='bg-red-600 px-6 py-2 rounded cursor-pointer'>Sign Up</button> */}
      </div>
    </div>
  )
}

export default Navbar