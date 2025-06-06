import { useEffect } from "react";
import { useRouter } from "next/router";

function NotFound() {
    const router = useRouter();
    useEffect(() => {
        console.error(
            "404 Error: User attempted to access non-existent route:",
            router.pathname
        );
    }, [router.pathname]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
            <div className="text-center">
                <h1 className="text-4xl font-bold mb-4 text-gray-800 dark:text-white">404</h1>
                <p className="text-xl mb-4 text-gray-600 dark:text-gray-400">
                    Oops! Page not found
                </p>
                <a
                    href="/"
                    className="text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-600 underline"
                >
                    Return to Home
                </a>
            </div>
        </div>
    );
}

export default NotFound;
