import React from "react";
import Link from "next/link";

export default function Main_Layout({children}: { children: React.ReactNode }) {
    return (<>
        <div className="bg-zinc-700 text-white flex justify-center py-2">
            <div className="w-[95%] md:container">
                <Link className="noneStyleLink" href={"/"}>
                    <span className="relative top-[-6px] font-bold text-[20px]">⌜</span>
                    <span className="text-yellow-300 font-bold text-[20px]">Billie</span>
                    <small className="text-[0.6rem] font-bold ml-[5px] text-green-500">mini project</small>
                    <span className="relative bottom-[-6px] font-bold text-[20px]">⌟</span>
                </Link>
            </div>
        </div>
        <div className="text-white flex justify-center">
            <div className="w-[95%] md:container min-h-[100vh] bg-zinc-500 p-5">
                {children}
            </div>
        </div>
    </>)
}