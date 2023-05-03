import { Button } from "@mui/material"
import Link from "next/link"
import Router from "next/router"
import { useState } from "react"

export const Navbar = ({ activeClass }: any) => {
    // const [activeClass,setActiveClass] = useState(1);
    return (
        <div className="flex place-content-center">
            <button onClick={() => Router.push('/problem1')} className={`ml-10 px-5 py-2 hover:text-white-600 border-2 rounded-lg ${activeClass == 1 ? ' text-neutral-50 bg-sky-800' : 'bg-slate-200'}`}>Problem 1
            </button>
            <button onClick={() => Router.push('/problem2')} className={`ml-10 px-5 py-2 hover:text-white-600 border-2 rounded-lg ${activeClass == 2 ? ' text-neutral-50 bg-sky-800' : 'bg-slate-200'}`}>Problem 2
            </button>
            <button onClick={() => Router.push('/problem3')} className={`ml-10 px-5 py-2 hover:text-white-600 border-2 rounded-lg ${activeClass == 3 ? ' text-neutral-50 bg-sky-800' : 'bg-slate-200'}`}>Problem 3
            </button>
            <button onClick={() => Router.push('/problem4')} className={`ml-10 px-5 py-2 hover:text-white-600 border-2 rounded-lg ${activeClass == 4 ? ' text-neutral-50 bg-sky-800' : 'bg-slate-200'}`}>Problem 4
            </button>
        </div>
    )
}