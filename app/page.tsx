'use client'

import Image from "next/image";
import { useEffect, useState } from "react";
import { Product } from "./methods/product.class";
import { motion } from 'framer-motion'

//@ts-ignore
import doilor from "@/mockup_doilor";
//@ts-ignore
import maekhan from "@/mockup_maekhan";
//@ts-ignore
import sanpatong from "@/mockup_sanpatong";
import { IPClass } from "./methods/ip.class";
import { IoSettingsSharp } from "react-icons/io5";
import { BsDatabaseFillGear } from "react-icons/bs";
import { toast, ToastContainer } from "react-toastify";
import { LiaThListSolid } from "react-icons/lia";
import { MdProductionQuantityLimits } from "react-icons/md";
import { RiSortAsc } from "react-icons/ri";

export default function Home() {

  let [notifyList, setNotifyList] = useState<object[] | null | any>(null)
  let [products, setProducts] = useState<object[] | null | any>(null)
  let [searchProduct, setSearchProduct] = useState<object[] | null | any>(null)
  let [select, setSelect] = useState<number>(0)
  let [error, setError] = useState<boolean>(false)
  let [modal, setModal] = useState<boolean>(false)
  let [ipList, setIpList] = useState<object[] | null | any>(null)

  let [doilorServer, setDoilorServer] = useState<object | any>([])
  let [maekhanServer, setMaekhanServer] = useState<object | any>([])
  let [sanpatongServer, setSanpatongServer] = useState<object | any>([])

  let [type, setType] = useState<number>(0)
  let [page, setPage] = useState<number>(1)
  let [totalPage, setTotalPage] = useState<number>(0)

  let [keyword, setKeyword] = useState<string>('')

  let [notfound, setNotfound] = useState<boolean>(false)

  let [asc, setAsc] = useState<boolean>(false)
  let [desc, setDesc] = useState<boolean>(false)

  let [refresh, setRefresh] = useState<number>(0)

  let [currentIp, setCurrentIp] = useState<string>('doilor20.ddns.net:3001')

  const showPage = [1, 2, 3, 4, 5]

  const intial = async () => {

    setNotifyList([])
    setProducts([])

    setError(false)
    const pd = new Product()

    // console.log("IP CHECK : ", allIP)

    try {

      let productsItem

      productsItem = await pd.remainItem(currentIp)

      let array: object[] = []

      productsItem.map((item: { Message: string }) => {
        let name = item.Message.split('คงเหลือ')[0]
        let qty = item.Message.split('คงเหลือ')[1]

        let payload = {
          name: name,
          qty: parseInt(qty)
        }

        array.push(payload)
      })

      setNotifyList(array)

      //@ts-ignore
      // setIpList(allIP.data)

    } catch (err) {
      setError(true)
    }
  }

  // dl20.ddns.net ดอยหล่อ
  // mk20.ddns.net แม่ขาน
  // spt20.ddns.net สันป่าตอง

  useEffect(() => {
    intial()
  }, [currentIp])

  return (
    <div className="p-[40px] max-[391px]:p-[30px]">

      <ToastContainer />

      <motion.div onClick={(e) => {
        if (e.target == e.currentTarget) {
          setModal(false)
        }
      }} initial={{ opacity: 0, pointerEvents: 'none' }} animate={modal ? { opacity: 1, pointerEvents: 'initial' } : { opacity: 0, pointerEvents: 'none' }} className="w-full h-full bg-black/20 fixed left-0 top-0 justify-center items-center flex z-[1]">
        <div className="w-[500px] h-[300px] bg-white p-[20px] rounded-[8px] shadow-md max-[391px]:w-[360px]">

          <div className="flex gap-[10px] items-center mb-[10px]">
            <p className="font-[medium] text-[20px]">ตั้งค่า</p>
            <BsDatabaseFillGear size={20} />
          </div>

          <div className="w-full flex flex-col gap-[5px]">
            <div className="flex justify-between">
              <div>
                <p className="font-[medium]">{doilorServer.tag}</p>
                <p className="text-[12px] font-[light] text-gray-400">สถานะ (ออนไลน์)</p>
              </div>
              <input onChange={(e) => {
                setDoilorServer({ ip: e.target.value, tag: doilorServer.tag })
              }} className="border-[1px] border-gray-400 rounded-[4px] outline-none p-[5px]" value={doilorServer.ip}></input>
            </div>

            <div className="flex justify-between">
              <div>
                <p className="font-[medium]">{maekhanServer.tag}</p>
                <p className="text-[12px] font-[light] text-gray-400">สถานะ (ออนไลน์)</p>
              </div>
              <input onChange={(e) => {
                setMaekhanServer({ ip: e.target.value, tag: maekhanServer.tag })
              }} className="border-[1px] border-gray-400 rounded-[4px] outline-none p-[5px]" value={maekhanServer.ip}></input>
            </div>

            <div className="flex justify-between">
              <div>
                <p className="font-[medium]">{sanpatongServer.tag}</p>
                <p className="text-[12px] font-[light] text-gray-400">สถานะ (ออนไลน์)</p>
              </div>
              <input onChange={(e) => {
                setSanpatongServer({ ip: e.target.value, tag: sanpatongServer.tag })
              }} className="border-[1px] border-gray-400 rounded-[4px] outline-none p-[5px]" value={sanpatongServer.ip}></input>
            </div>
          </div>

          <div className="w-full h-[] flex justify-center mt-[20px]">
            <div onClick={() => {
              let ip = new IPClass()

              let payload = [
                doilorServer,
                maekhanServer,
                sanpatongServer
              ]

              ip.updateConfig(payload).then((res) => {
                toast("Update Successfully", { theme: 'light', hideProgressBar: true, type: 'success', autoClose: 1500, closeButton: false })
                setModal(false)
              })
            }} className="w-[50%] h-[40px] bg-blue-600 text-white flex justify-center items-center rounded-[8px] cursor-pointer">
              <p className="font-[medium]">อัพเดต (UPDATE)</p>
            </div>
          </div>
        </div>
      </motion.div>

      <div className="absolute right-[40px] cursor-pointer max-[391px]:top-12 max-[391px]:right-3">
        <IoSettingsSharp onClick={() => {
          setModal(true)
        }} size={25} />
      </div>

      <div className="w-full flex justify-center items-center">
        <div className="relative">
          <input disabled={type == 0 ? true : false} value={keyword} onChange={(e) => {
            if (e.target.value.length <= 0) {
              setSearchProduct([])
            }
            setKeyword(e.target.value)
          }} onKeyDown={async (e) => {

          }} placeholder="Feature is not available" className="w-[300px] h-[40px] text-center font-[light] bg-white rounded-full shadow-md border-[1px] mb-[20px] flex outline-none focus:ring-2 ring-blue-400"></input>

          {searchProduct && searchProduct.length > 0 ? <div onClick={() => {
            setKeyword('')
            setSearchProduct([])
          }} className="absolute right-5 top-[10px] cursor-pointer">
            <p className="font-[light] text-[14px] text-blue-500">ล้างค่า</p>
          </div> : null}
        </div>
      </div>

      <motion.div className={`w-full h-[70px] mb-[20px] flex justify-between border-[1px] rounded-[16px] shadow-md p-[5px] gap-[10px]`}>
        <motion.div initial={{ backgroundColor: 'white' }} animate={select == 0 ? { backgroundColor: '#60a5facc', color: 'white' } : { backgroundColor: '#ffffff' }} transition={{ duration: 0.2 }} onClick={() => {
          setSelect(0)
          // setPage(1)
          setCurrentIp("49.49.25.12:3001")
        }} className={`flex justify-center items-center w-full flex-col space-y-[-5px] rounded-[12px] cursor-pointer relative`}>
          <p className="font-[medium] text-[18px]">ดอยหล่อ</p>
          <p className="font-[light] text-[14px]">Doilor</p>
        </motion.div>
        <motion.div initial={{ backgroundColor: 'white' }} animate={select == 1 ? { backgroundColor: '#60a5facc', color: 'white' } : { backgroundColor: '#ffffff' }} transition={{ duration: 0.2 }} onClick={() => {
          setSelect(1)
          // setPage(1)
          setCurrentIp("mk20.ddns.net:3001")
        }} className={`flex justify-center items-center w-full flex-col space-y-[-5px] rounded-[12px] cursor-pointer`}>
          <p className="font-[medium] text-[18px]">แม่ขาน</p>
          <p className="font-[light] text-[14px]">Maekhan</p>
        </motion.div>
        <motion.div initial={{ backgroundColor: 'white' }} animate={select == 2 ? { backgroundColor: '#60a5facc', color: 'white' } : { backgroundColor: '#ffffff' }} transition={{ duration: 0.2 }} onClick={() => {
          setSelect(2)
          // setPage(1)
          setCurrentIp("spt20.ddns.net:3001")
        }} className={`flex justify-center items-center w-full flex-col space-y-[-5px] rounded-[12px] cursor-pointer`}>
          <p className="font-[medium] text-[18px]">สันป่าตอง</p>
          <p className="font-[light] text-[14px]">Sanpatong</p>
        </motion.div>
      </motion.div>

      {searchProduct && searchProduct.length > 0 ? <p className="mb-[20px] font-[light]">กำลังค้นหา keyword : {keyword}</p> : null}

      {searchProduct && searchProduct.length > 0 || type == 0 ? null : <div className="w-full h-[50px] border-[1px] mb-[10px] grid grid-cols-8 justify-center items-center text-center rounded-[8px]">
        {showPage ? showPage.map((item) => {
          return (
            <div onClick={() => {
              setPage(item)
            }} className={`h-full flex justify-center items-center rounded-[8px] cursor-pointer ${item == page ? 'bg-black text-white' : ''}`}>
              <p>{item}</p>
            </div>
          )
        }) : null}
        <div>
          <p>...</p>
        </div>
        <div className={`h-full flex justify-center items-center rounded-[8px] cursor-pointer ${(totalPage - 1) == page ? 'bg-black text-white' : ''}`} onClick={() => {
          setPage(totalPage - 1)
        }}>
          <p>{totalPage - 1}</p>
        </div>
        <div className={`h-full flex justify-center items-center rounded-[8px] cursor-pointer ${totalPage == page ? 'bg-black text-white' : ''}`} onClick={() => {
          setPage(totalPage)
        }}>
          <p>{totalPage}</p>
        </div>
      </div>}

      <div className="mb-[20px]">
        <p className="font-[medium]">สินค้าแจ้งเตือน ทั้งหมด {notifyList ? notifyList.length : 0} ชิ้น</p>
      </div>

      <table className="w-full">
        <thead className="w-full text-gray-300 bg-black/80  h-[40px]">
          {error ? <tr className="text-center font-[medium]">
            <td className="rounded-tl-[8px] rounded-tr-[8px]">พบข้อผิดพลาดบางอย่าง</td>
          </tr> : notfound ? <tr className="text-center font-[medium]">
            <td className="rounded-tl-[8px] rounded-tr-[8px] h-[40px]">สินค้า (Products)</td>
          </tr> : <tr className="text-center font-[medium]">
            <td className="rounded-tl-[8px] h-[40px]">สินค้า (Products)</td>
            <td className="rounded-tr-[8px] h-[40px]">คงเหลือ (Remain)</td>
          </tr>}
        </thead>
        <tbody>
          {notifyList && notifyList.length > 0 && !error && type == 0 ? notifyList.map((item: { name: string, qty: number }, index: number) => {
            return (
              <tr className={`text-center h-[50px]`}>
                <td className="font-[medium]">{item.name}</td>
                <td className="font-[medium]">{item.qty}</td>
              </tr>
            )
          }) : null}

          {notfound ? <tr className="w-full text-center">
            <td className="font-[light]">ไม่พบสินค้านี้</td>
          </tr> : null}

          {error ? <tr className="w-full text-center h-[50px]">
            <td>Server not response</td>
          </tr> : null}
        </tbody>
      </table >

      {type == 0 ? !notifyList || notifyList.length <= 0 && !error ? <div className="w-full h-[100vh] pointer-events-none left-0 top-0 flex justify-center items-center fixed">
        <div role="status">
          <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-400 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
          </svg>
          <span className="sr-only">Loading...</span>
        </div>
      </div> : null : null}

      {type == 1 ? !products || products.length <= 0 && !error ? <div className="w-full h-[100vh] pointer-events-none left-0 top-0 flex justify-center items-center fixed">
        <div role="status">
          <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-400 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
          </svg>
          <span className="sr-only">Loading...</span>
        </div>
      </div> : null : null}

      {/* 
      {type == 1 ? products && products.length > 0 ? <div className="w-full h-[40px] bg-white/20 backdrop-blur-lg border-[1px] rounded-[8px] mt-[20px] fixed bottom-5">

      </div> : null : null} */}

    </div >
  );
}
