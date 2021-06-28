import Layout from '../../components/Layout'
import FilmListGrid from '../../components/FilmListGrid'
import { fetchMoviesByListId } from '../../utils'

export default function ListPage({ creator, films }) {
    return (
        <Layout>
            <div className="mb-5 text-center text-3xl md:text-5xl">
                <h2 className="text-xl md:text-2xl text-blue-50 text-opacity-70">{creator}'s list:</h2>
                <h3 className="">{films.length} Films</h3>
            </div>
            <FilmListGrid films={films} />
        </Layout>
    )
}

export async function getServerSideProps({params: {id}}) {
    console.log('Building list ID:', id)
    const {creator, films } = await fetchMoviesByListId(id)

    if (!films) {
        return {
            notFound: true
        }
    }

    return {
        props: {
            creator,
            films
        }
    }
}