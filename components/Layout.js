import Head from 'next/head'
import Header from './Header'
import { useRouter } from 'next/router'


const Layout = ({title, description, keywords, author, children}) => {
    const { pathname } = useRouter()

    return (
        <div className="relative bg-blue-500 min-h-screen text-blue-50">
            <Head>
                <title>{title}</title>
                <meta name="description" content={description} />
                <meta name="keywords" content={keywords} />
                <meta name="author" content={author} />
            </Head>
            
            <Header/>

            <main className={`relative ${pathname !== '/film/[id]' && 'container mx-auto p-4'}`}>
                {children}
            </main>
        </div>
    )
}

Layout.defaultProps = {
    title: 'My 100 Films',
    description: 'A website that shows off my favorite films out of a hundred.',
    keywords: 'my-100-films, movies, brant-messenger',
    author: 'Brant Messenger'
}

export default Layout