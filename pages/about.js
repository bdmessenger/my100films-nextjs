import Layout from '../components/Layout'
import Link from 'next/link'

export default function AboutPage() {
    return (
        <Layout title="About">
            <div className="flex flex-col gap-6">
                <h3 className="text-3xl md:text-5xl">Welcome to My 100 Films site!</h3>
                <p className="text-lg md:text-2xl max-w-4xl">
                    This web application that I've developed is showcasing my hundred films that are either my favorites or that I believe should be viewed by others. My web application is using <Link href="https://www.themoviedb.org/"><a className="underline">TMDB's</a></Link> Application Programming Interface (API) to fetch data that contains details about movies. I registered at TMDb's website to obtain the API key and create a list of films that are copy over to this site's home page. If you click on any of the film panels on the home page, the page will direct you to that film containing its release information. If you register and create a list at TMDb, you can display your list onto my site as long as you reference your list's id that's in the url address once you clicked on your list.
                </p>
                <Link href="https://developers.themoviedb.org/3/getting-started/introduction">
                    <a className="text-xl md:text-2xl underline">Learn more about TMDB's API</a>
                </Link>

                <div>
                    <h4 className="mb-2 text-3xl font-semibold">Endpoints:</h4>
                    <div className="grid grid-cols-2 max-w-lg p-4 items-center border bg-blue-600 gap-y-4">
                        <span className="bg-blue-800 w-max p-2 px-4">/film/:id</span>
                        <span>Insert id at the end of address to view the film's content.</span>
                        <span className="bg-blue-800 w-max p-2 px-4">/list/:id</span>
                        <span>Insert id at the end of address to view a user's list.</span>
                    </div>
                </div>
            </div>
        </Layout>
    )
}
