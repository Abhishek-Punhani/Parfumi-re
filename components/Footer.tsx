import Link from "next/link";

const Footer = () => {
    return (
        <footer className="bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200 py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div>
                        <h3 className="text-2xl font-bold mb-4">Parfumière</h3>
                        <p className="text-gray-600 dark:text-gray-400">
                            Your destination for luxury fragrances and perfumes from around the world.
                        </p>
                    </div>
                    <div>
                        <h4 className="font-semibold mb-4">Quick Links</h4>
                        <ul className="space-y-2">
                            <li>
                                <Link
                                    href="/shop"
                                    className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                                >
                                    Shop
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/collections"
                                    className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                                >
                                    Collections
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/about"
                                    className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                                >
                                    About Us
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/contact"
                                    className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                                >
                                    Contact
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-semibold mb-4">Customer Service</h4>
                        <ul className="space-y-2">
                            <li>
                                <Link
                                    href="/shipping"
                                    className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                                >
                                    Shipping Info
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/returns"
                                    className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                                >
                                    Returns
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/faq"
                                    className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                                >
                                    FAQ
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/support"
                                    className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                                >
                                    Support
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-semibold mb-4">Connect</h4>
                        <ul className="space-y-2">
                            <li>
                                <a
                                    href="#"
                                    className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                                >
                                    Instagram
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                                >
                                    Facebook
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                                >
                                    Twitter
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                                >
                                    YouTube
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="border-t border-gray-200 dark:border-gray-700 mt-8 pt-8 text-center">
                    <p>&copy; 2024 Parfumière. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;