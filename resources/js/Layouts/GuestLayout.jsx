import ApplicationLogo from "@/Components/ApplicationLogo";
import { Link } from "@inertiajs/react";

export default function Guest({ children }) {
    return (
        <div className="min-h-screen flex flex-col sm:justify-center items-center pt-6 sm:pt-0 bg-meme_black">
            <div>
                <Link href="/" className="text-white text-4xl text-bold">
                    Meme Planet
                </Link>
            </div>

            <div className="w-full sm:max-w-md mt-6 px-6 py-4 bg-meme_black shadow-md overflow-hidden sm:rounded-lg">
                {children}
            </div>
        </div>
    );
}
