import { fetchFilmById } from '../../utils'
import Image from 'next/image'
import { useRouter } from 'next/router'
import Layout from '../../components/Layout'
import { IoMdArrowBack } from 'react-icons/io'

export default function FilmPage({film: {title, poster, backdrop, year, rating, date, country, genres, runtime, tagline, overview, directors, crew, cast, recommendations }}) {
    const { push, back } = useRouter()

    return (
        <Layout>
            <div className="md:container md:mx-auto md:p-4">
                <div className="flex items-center gap-1 px-2 mt-4 cursor-pointer mb-5 underline w-max" onClick={() => back()}>
                    <IoMdArrowBack/>
                    Go Back
                </div>
                <div className="mb-6 flex rounded-none gap-x-5 flex-col md:flex-row relative md:items-center md:w-auto md:rounded-md md:p-8 md:bg-blue-800 ">
                    <Image className="select-none opacity-10 md:rounded-md" alt={`${title}-backdrop`} src={backdrop} layout="fill"/>
                    <div id="film-poster" className="select-none p-4 bg-blue-800 w-full md:bg-transparent md:w-2/4 md:p-0 lg:w-1/4 relative">
                        <Image className="opacity-60 md:opacity-0 md:rounded-md" alt={`${title}-backdrop`} src={backdrop} layout="fill"/>
                        <div className="bg-blue-100 w-1/4 md:w-full relative border border-blue-200 rounded-md">
                            <Image className="relative rounded-md" alt={`${title}-poster`} src={poster} layout="responsive" width={360} height={500} />
                        </div>
                    </div>
                    <div id="film-info" className="relative z-10 bg-blue-800 md:p-4 md:bg-transparent md:w-3/4 flex flex-col gap-6">
                        <h2 className="text-center p-4 pb-0 md:p-0 text-3xl md:text-4xl lg:text-5xl font-bold max-w-4xl md:text-left">
                            {title}
                            <span className="text-2xl md:text-3xl lg:text-4xl opacity-70"> ({year})</span>
                        </h2>
                        <div className="p-4 text-center md:text-left leading-loose bg-blue-900 border-t border-b md:border-0 md:bg-transparent md:p-0">
                            <span className="opacity-80 px-3 py-1.5 border mr-2">{rating}</span>
                            <span className="mr-2">{date} {country && `(${country})`}</span>
                            { genres && <span className="mr-2">• {genres.join(', ')}</span> }
                            { runtime && <span>• {runtime}</span> }
                        </div>
                        {tagline && <span className="px-4 italic opacity-80 text-center md:px-0 md:text-left">{tagline}</span> }
                        { overview && (
                            <div className="max-w-4xl px-4 md:px-0 ">
                                <h4 className="text-lg font-bold pb-1 text-center md:text-left">Overview</h4>
                                <div className="w-full border mb-2 opacity-50"></div>
                                <p className="">{overview}</p>
                            </div>
                        )}

                        <div className="p-4 pb-8 md:pl-0 text-center md:text-left grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                            {directors.map((name, i) => {
                                const director = crew[name]
                                return (
                                    <div key={i}>
                                        <h4 className="text-lg font-semibold">{name}</h4>
                                        <h5 className="text-sm">{director.jobs.join(', ')}</h5>
                                    </div>
                                )
                            })}

                            { Object.values(crew).filter(person => !person.jobs.find(job => job === 'Director')).map(({id, name, jobs}) => (
                                <div key={id}>
                                    <h4 className="text-lg font-semibold">{name}</h4>
                                    <h5 className="text-sm">{jobs.join(', ')}</h5>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div id="cast" className="p-4">
                    <h3 className="text-4xl font-bold mb-6">Cast</h3>
                    <div className="flex overflow-x-auto gap-4 pb-5 scrollbar-thin scrollbar-thumb-blue-700 scrollbar-track-blue-300 hover:scrollbar-thumb-blue-900">
                        { cast.length > 0 ? (
                            cast.map(({id, name, character, image}) => (
                                <div key={id} className="relative xl:w-48 bg-blue-50 rounded-md text-blue-800 flex flex-col">
                                    <div className="bg-blue-100 relative w-48 xl:w-full h-56 xl:h-56 rounded-t-md border-b-2">
                                        <Image className="rounded-t-md" src={image} alt={name} layout="fill" />
                                    </div>
                                    <div className="p-4">
                                        <h4 className="text-xl font-semibold">{name}</h4>
                                        <h5>{character}</h5>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <h3 className="text-xl">Cast is not available</h3>
                        )}
                    </div>
                </div>

                <div id="recommendations" className="p-4">
                    <h3 className="text-4xl font-bold mb-6">Recommendations</h3>
                    <div className="flex overflow-x-auto gap-4 pb-5 scrollbar-thin scrollbar-thumb-blue-700 scrollbar-track-blue-300 hover:scrollbar-thumb-blue-900">
                        { recommendations.length > 0 ? (
                            recommendations.map(({id, title, backdrop}) => (
                            <div key={id} onClick={() => push(`/film/${id}`)} className="cursor-pointer relative bg-blue-50 rounded-md text-blue-800 flex flex-col">
                                <div className="bg-blue-100 relative w-56 h-40 xl:h-28 rounded-t-md border-b-2">
                                    <Image className="rounded-t-md" alt={title} src={backdrop} layout="fill" />
                                </div>
                                <div className="p-4">
                                    <h4 className="text-lg font-semibold">{title}</h4>
                                </div>
                            </div>
                            ))) : (
                                <h3 className="text-xl">No Recommendations Available</h3>
                        )}
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export async function getServerSideProps({params: {id}}) {
    const film = await fetchFilmById(id)

    if (!film) {
        return {
            notFound: true
        }
    }

    return {
        props: {
            film
        }
    }
}