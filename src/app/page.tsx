import Image from "next/image"
import Link from "next/link";
import Main_Layout from "@/app/component/main_layout";

export default function Home() {
    return (
        <Main_Layout>
            <b>
                Google
            </b>
            <ul className="p-5 bg-zinc-800 rounded-[10px]">
                <li>
                    <Link href="/googlemap">
                        Google Map Api
                    </Link>
                </li>
            </ul>
        </Main_Layout>
    );
}