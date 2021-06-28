import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/router'

export default function Header() {
    const { pathname } = useRouter()

    return (
        <header className="relative z-50 bg-blue-600 text-blue-50 font-medium">
            <div className="md:container mx-auto p-4 flex justify-between">
                <Link href="/">
                    <a className="flex gap-2"><Image alt="site-logo" src="/images/icon.png" width={20} height={20} /> My 100 Films</a>
                </Link>
                <nav className="flex gap-4">
                    <Link href="/">
                        <a className={`${pathname === '/' ? 'underline' : ''}`}>Home</a>
                    </Link>
                    <Link href="/about">
                        <a className={`${pathname === '/about' ? 'underline' : ''}`}>About</a>
                    </Link>
                </nav>
            </div>
        </header>
    )
}
