import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Menu, Search, ShoppingBag, User, Sparkles } from "lucide-react";
import { useSearch } from "@/contexts/useSearch";
import { useCart } from "@/contexts/useCart";
import { useRouter } from "next/router";
import Link from "next/link";
import { ModeToggle } from "./toggleTheme";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [searchOpen, setSearchOpen] = useState(false);
    const { searchTerm, setSearchTerm, searchResults, isSearching } = useSearch();
    const { getTotalItems } = useCart();
    const router = useRouter();

    const menuItems = [
        { name: "Home", href: "/" },
        { name: "Shop", href: "/shop" },
        { name: "Collections", href: "/collections" },
        { name: "About", href: "/about" },
    ];

    const handleSearchSelect = (productId: string) => {
        router.push(`/product/${productId}`);
        setSearchOpen(false);
        setSearchTerm("");
    };

    return (
        <nav className="sticky top-0 z-50 bg-white dark:bg-gray-900 backdrop-blur-md border-b border-gray-200 dark:border-gray-700 shadow transition-colors">
            <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
                <div className="flex justify-between items-center h-20">
                    {/* Logo */}
                    <Link href="/" className="flex-shrink-0 group">
                        <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-rose-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                <Sparkles className="w-5 h-5 text-white" />
                            </div>
                            <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-rose-600 bg-clip-text text-transparent">
                                Parfumière
                            </h1>
                        </div>
                    </Link>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center space-x-6">
                        {menuItems.map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                className={`relative px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-purple-600 transition-colors duration-300 ${
                                    router.pathname === item.href ? "text-purple-600" : ""
                                }`}
                            >
                                {item.name}
                                <span
                                    className={`absolute bottom-0 left-0 h-0.5 w-0 bg-gradient-to-r from-purple-600 to-rose-600 transition-all duration-300 ${
                                        router.pathname === item.href ? "w-full" : "group-hover:w-full"
                                    }`}
                                ></span>
                            </Link>
                        ))}
                    </div>

                    {/* Action Icons */}
                    <div className="flex items-center space-x-3">
                        {/* Search */}
                        <Popover open={searchOpen} onOpenChange={setSearchOpen}>
                            <PopoverTrigger asChild>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="hidden sm:flex rounded-xl hover:bg-purple-50 dark:hover:bg-gray-800 transition-colors duration-300"
                                >
                                    <Search className="h-5 w-5" />
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-80 p-0" align="end">
                                <Command>
                                    <CommandInput
                                        placeholder="Search perfumes..."
                                        value={searchTerm}
                                        onValueChange={setSearchTerm}
                                        className="bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-md"
                                    />
                                    <CommandList>
                                        {isSearching ? (
                                            <div className="p-4 text-center text-sm text-gray-500 dark:text-gray-400">
                                                Searching...
                                            </div>
                                        ) : searchResults.length === 0 && searchTerm ? (
                                            <CommandEmpty>No perfumes found.</CommandEmpty>
                                        ) : (
                                            <CommandGroup>
                                                {searchResults.map((perfume) => (
                                                    <CommandItem
                                                        key={perfume.id}
                                                        onSelect={() => handleSearchSelect(perfume.id)}
                                                        className="flex items-center gap-3 p-3 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors rounded-md"
                                                    >
                                                        <img
                                                            src={perfume.image}
                                                            alt={perfume.name}
                                                            className="w-10 h-10 object-cover rounded-lg"
                                                        />
                                                        <div className="flex-1">
                                                            <div className="font-medium">{perfume.name}</div>
                                                            <div className="text-sm text-gray-500 dark:text-gray-400">
                                                                {perfume.brand} • ${perfume.price}
                                                            </div>
                                                        </div>
                                                    </CommandItem>
                                                ))}
                                            </CommandGroup>
                                        )}
                                    </CommandList>
                                </Command>
                            </PopoverContent>
                        </Popover>

                        <Link href="/profile">
                            <Button
                                variant="ghost"
                                size="icon"
                                className="hidden sm:flex rounded-xl hover:bg-purple-50 dark:hover:bg-gray-800 transition-colors duration-300"
                            >
                                <User className="h-5 w-5" />
                            </Button>
                        </Link>

                        {/* Cart */}
                        <Link href="/cart">
                            <Button
                                variant="ghost"
                                size="icon"
                                className="hidden sm:flex relative rounded-xl hover:bg-purple-50 dark:hover:bg-gray-800 transition-colors duration-300 group"
                            >
                                <ShoppingBag className="h-5 w-5" />
                                {getTotalItems() > 0 && (
                                    <span className="absolute -top-1 -right-1 bg-gradient-to-r from-purple-600 to-rose-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-semibold transition-transform duration-300 group-hover:scale-110">
                                        {getTotalItems()}
                                    </span>
                                )}
                            </Button>
                        </Link>

                        {/* Mode Toggle */}
                        <div className="hidden sm:flex">
                            <ModeToggle />
                        </div>

                        {/* Mobile Menu Button */}
                        <Sheet open={isOpen} onOpenChange={setIsOpen}>
                            <SheetTrigger asChild>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="md:hidden rounded-xl hover:bg-purple-50 dark:hover:bg-gray-800 transition-colors duration-300"
                                >
                                    <Menu className="h-5 w-5" />
                                </Button>
                            </SheetTrigger>
                            <SheetContent
                                side="right"
                                className="bg-white dark:bg-gray-900 backdrop-blur-md p-6"
                            >
                                <div className="flex flex-col space-y-6">
                                    {/* Mobile Search */}
                                    <div className="relative">
                                        <Input
                                            placeholder="Search perfumes..."
                                            value={searchTerm}
                                            onChange={(e) => setSearchTerm(e.target.value)}
                                            className="pl-10 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-md"
                                        />
                                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                                    </div>

                                    {/* Navigation Links */}
                                    {menuItems.map((item) => (
                                        <Link
                                            key={item.name}
                                            href={item.href}
                                            className={`text-lg font-medium text-gray-700 dark:text-gray-300 hover:text-purple-600 transition-colors duration-300 py-2 border-b border-gray-200 dark:border-gray-700 ${
                                                router.pathname === item.href
                                                    ? "text-purple-600 border-purple-600"
                                                    : ""
                                            }`}
                                            onClick={() => setIsOpen(false)}
                                        >
                                            {item.name}
                                        </Link>
                                    ))}
                                    <Link
                                        href="/profile"
                                        className="text-lg font-medium text-gray-700 dark:text-gray-300 hover:text-purple-600 transition-colors duration-300 py-2 border-b border-gray-200 dark:border-gray-700"
                                        onClick={() => setIsOpen(false)}
                                    >
                                        Profile
                                    </Link>
                                    <Link
                                        href="/cart"
                                        className="flex items-center justify-between text-lg font-medium text-gray-700 dark:text-gray-300 hover:text-purple-600 transition-colors duration-300 py-2 border-b border-gray-200 dark:border-gray-700"
                                        onClick={() => setIsOpen(false)}
                                    >
                                        Cart
                                        {getTotalItems() > 0 && (
                                            <span className="bg-purple-600 text-white text-sm rounded-full h-6 w-6 flex items-center justify-center">
                                                {getTotalItems()}
                                            </span>
                                        )}
                                    </Link>
                                    {/* Mode Toggle */}
                                    <div>
                                        <ModeToggle />
                                    </div>
                                </div>
                            </SheetContent>
                        </Sheet>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
