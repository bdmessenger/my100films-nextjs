import Layout from '../components/Layout'
import { AiOutlineWarning } from 'react-icons/ai'

export default function NotFoundPage() {
    return (
        <Layout title="Page Not Found">
            <div className="flex flex-col items-center text-center justify-center text-4xl md:text-7xl w-full">
                <AiOutlineWarning className="text-6xl md:text-9xl"/>
                <div>
                    <h2>Whoops...</h2>
                    <h3>Page Not Found</h3>
                </div>
            </div>
        </Layout>
    )
}
