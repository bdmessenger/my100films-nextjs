import Layout from '../components/Layout'
import FilmListGrid from '../components/FilmListGrid'
import { fetchMoviesByListId } from '../utils'

export default function HomePage({creator, films}) {
  return (
    <Layout>
      <div className="mb-5 text-center text-3xl md:text-5xl">
        <h2>My {films.length} Films List</h2>
        <h3 className="text-xl md:text-2xl text-blue-50 text-opacity-70">Created by: {creator}</h3>
      </div>
      <FilmListGrid films={films} />
    </Layout>
  )
}

export async function getStaticProps() {
  const {creator, films } = await fetchMoviesByListId(process.env.MY_LIST_ID)

  return {
    props: {
      creator,
      films
    }
  }
}
