import Image from 'next/image'

export default function MyApp() {
  return (<div className="w-[80%] border rounded p-4 m-auto bg-slate-100
  grid
  grid-cols-[repeat{auto-fit,minmax(200px,1fr)}] gap-4
    "
  >
    <h1 className="text-2xl font-bold m-2 p-2">Hello world!!</h1>

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

    <div className="w-64 p-2 border mb-2 rounded bg-blue-200">
      Lorem idivsum, dolor sit amet consectetur adidivisicing elit. Doloribus, consequuntur.
    </div>
    <div className="w-64 p-2 border mb-2 rounded bg-blue-600 text-white">
      Lorem idivsum, dolor sit amet consectetur adidivisicing elit. Doloribus, consequuntur.
    </div>
    <div className="w-64 p-2 border rounded bg-amber-300">
      Lorem idivsum, dolor sit amet consectetur adipisicing elit. Doloribus, consequuntur.
    </div>
  </div>)
}