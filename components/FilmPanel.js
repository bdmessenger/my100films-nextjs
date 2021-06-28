import Image from 'next/image'
import { useRouter } from 'next/router'

export default function FilmPanel({id, title, image}) {
    const { push } = useRouter()

    const notFoundImage = image === 'https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-38-picture-4ee37443c461fff5bc221b43ae018a5dae317469c8e2479a87d562537dd45fdc.svg'

    return (
        <div onClick={() => push(`/film/${id}`)} className="relative cursor-pointer bg-blue-700 rounded-md w-full h-40 select-none shadow-2xl">
            <Image className="rounded-md" alt={title} src={image} layout="fill"/>
            <div className={`transition bg-blue-900 ${!notFoundImage ? 'lg:bg-opacity-30' : ''} duration-500 rounded-md absolute top-0 left-0 w-full h-full bg-opacity-80 hover:bg-opacity-80`}>
                <div className={`transition duration-500 ${ !notFoundImage ? 'lg:opacity-0' : ''} hover:opacity-100 w-full h-full flex justify-center items-center text-center p-4`}>
                    <span className="md:text-lg lg:text-xl text-blue-50 font-semibold">{title}</span>
                </div>
            </div>
        </div>
    )
}
