import { BellIcon } from '@heroicons/react/24/outline'
import { useState, useEffect } from 'react'
import LoadingCircle from '../Skeleton/LoadingCircle'
import LoadingRect from '../Skeleton/LoadingRect'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { Link } from 'react-router-dom'


interface AdminData {
  full_name: string,
  title: string
}

const Navbar = () => {
  const [adminData, setAdminData] = useState<AdminData | null>(null);
  const navigate = useNavigate()
  const AppUrl = import.meta.env.VITE_APP_API_URL;

  useEffect(()=> {
    const token = localStorage.getItem('token')
    
    if (!token) {
      navigate('/admin/login')
      return;
    }

    axios
      .get(`${AppUrl}/admin_info`,{
        headers: {Authorization: `Bearer ${token}`}
      })
        .then((result)=> {
            if (result.data && result.data.user) {
              setAdminData(result.data.user);
            } else {
              navigate('/admin/login');
            }
            
        })
        .catch((error)=> {
          console.log(error)
          navigate('/admin/login')
        })

  }, [navigate])

  return (
    <div className="w-full h-[80px] bg-[#fff] fixed left-0 right-0 top-0 z-[3000] border-b border-solid border-slate-300 p-[10px] flex flex-row justify-between items-center">
      <div>
        <img src="/images/logo1b.png" className="w-[160px] z-[3000]" alt="Gilles Logo" />
      </div>
      <div className="flex flex-row space-x-[12px] items-center">
        <div className="bg-white w-[50px] h-[50px] relative border-[1px] border-solid border-slate-300 flex justify-center items-center font-bold text-slate-300 rounded-[15px] cursor-pointer hover:border-slate-500 hover:text-slate-500">
            <BellIcon className="size-6" />
            <div className="bg-red-500 w-[8px] h-[8px] rounded-full absolute top-0 right-0"></div>
        </div>
        <div className="flex flex-row space-x-[10px] items-center hover:bg-gray-200 pl-[4px] pr-[4px] pt-[2px] pb-[2px] rounded-[2px]">
            {adminData ? 
              <>
                <div className="bg-blue-500 text-white font-bold flex justify-center items-center w-[50px] h-[50px] rounded-full cursor-pointer p-[5px]">C</div>
                <Link to={'/admin/profile'}>
                  <div className="w-[80px] pl-[6px] pr-[6px] pt-[2px] pb-[2px] flex flex-col space-y-[2px] cursor-pointer md:w-[150px]">
                      <div>
                          <div><h4 className="font-[500] text-[16px] text-slate-500 capitalize md:text-[18px]">{adminData.full_name}</h4></div>
                      </div>
                      <div className="mt-[-4px]">
                          <div><p className="font-[300] text-[14px] text-slate-500/[80%] capitalize md:text-[16px]">{adminData.title}</p></div>
                      </div>
                  </div>
                </Link>
              </>
                :
              <>
                <LoadingCircle />
                <LoadingRect />
              </>
            }
            
        </div>
      </div>
    </div>
  )
}

export default Navbar
