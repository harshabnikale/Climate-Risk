import Link from "next/link"
import { useState } from "react"

export const Navbar = ({ activeClass }: any) => {
    // const [activeClass,setActiveClass] = useState(1);
    return (
        <div className="flex place-content-center mt-5">
            <button className={`ml-10 px-5 py-2 hover:text-white-600 border-2 rounded-lg ${activeClass == 1 ? ' text-neutral-50 bg-sky-800' : 'bg-slate-200'}`}>
                <Link href="/problem1">Problem 1</Link>
            </button>
            <button className={`ml-10 px-5 py-2 hover:text-white-600 border-2 rounded-lg ${activeClass == 2 ? ' text-neutral-50 bg-sky-800' : 'bg-slate-200'}`}>
                <Link href="/problem2">Problem 2</Link>
            </button>
            <button className={`ml-10 px-5 py-2 hover:text-white-600 border-2 rounded-lg ${activeClass == 3 ? ' text-neutral-50 bg-sky-800' : 'bg-slate-200'}`}>
                <Link href="/problem3">Problem 3</Link>
            </button>
            <button className={`ml-10 px-5 py-2 hover:text-white-600 border-2 rounded-lg ${activeClass == 4 ? ' text-neutral-50 bg-sky-800' : 'bg-slate-200'}`}>
                <Link href="/problem4">Problem 4</Link>
            </button>
        </div>
    )
}