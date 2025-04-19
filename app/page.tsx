import Image from 'next/image'
import { Bungee_Tint } from "next/font/google";
import Link from 'next/link';

const bungee = Bungee_Tint({
  subsets: ["latin"],
  weight: "400",
});

export default function MyApp() {
  return (<div>
    {/* grid-cols-1 gap-4 
      sm:grid-cols-2
      md:grid-cols-3
      lg:grid-cols-4
      xl:grid-cols-5

      flex flexwrap */}

    <h1 className={`${bungee.className} "font-bold m-2 p-2"`}>Hello world!!</h1>
    <Link className="w-15 p-2 bg-blue-500 text-white" href={'/FOO'}> go to foo
    </Link>

    <div className="w-[80%] border rounded p-4 m-auto bg-slate-100 
     grid 
    grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-4">
      <Image
        className='p-2 m-4'
        src="https://computing.psu.ac.th/th/wp-content/uploads/2023/09/PSU-CoC-ENG_01_x49.png"
        width={150}
        height={150}
        alt="PSU Logo"
      />

      <Image
        className="p-2 m-4"
        src="/next.svg"
        width={150}
        height={150}
        alt="Next.js Logo"
      />

      <div className="w-64 p-2 border mb-2 rounded bg-blue-200 hover:bg-blue-700 hover:text-blue-50">
        Lorem idivsum, dolor sit amet consectetur adidivisicing elit. Doloribus, consequuntur.
      </div>
      <div className="w-64 p-2 border mb-2 rounded bg-blue-600 text-white">
        Lorem idivsum, dolor sit amet consectetur adidivisicing elit. Doloribus, consequuntur.
      </div>
      <div className="w-64 p-2 border rounded bg-amber-300">
        Lorem idivsum, dolor sit amet consectetur adipisicing elit. Doloribus, consequuntur.
      </div>
  
    </div>

  </div>)
}