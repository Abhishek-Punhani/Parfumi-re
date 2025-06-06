import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { User, Heart, ShoppingBag, Settings, Star, Package, MapPin, CreditCard } from "lucide-react";

const Profile = () => {
    const [activeTab, setActiveTab] = useState("overview");

    const tabs = [
        { id: "overview", label: "Overview", icon: User },
        { id: "orders", label: "My Orders", icon: Package },
        { id: "wishlist", label: "Wishlist", icon: Heart },
        { id: "addresses", label: "Addresses", icon: MapPin },
        { id: "payment", label: "Payment Methods", icon: CreditCard },
        { id: "settings", label: "Settings", icon: Settings }
    ];

    const recentOrders = [
        {
            id: "ORD-001",
            date: "2024-05-28",
            total: 158.50,
            status: "Delivered",
            items: ["Chanel No. 5", "Tom Ford Black Orchid"]
        },
        {
            id: "ORD-002",
            date: "2024-05-15",
            total: 89.99,
            status: "Delivered",
            items: ["Dior Sauvage"]
        },
        {
            id: "ORD-003",
            date: "2024-05-01",
            total: 245.00,
            status: "Processing",
            items: ["Creed Aventus", "Maison Margiela Replica"]
        }
    ];

    const wishlistItems = [
        {
            id: 1,
            name: "Tom Ford Oud Wood",
            brand: "Tom Ford",
            price: 350.00,
            image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=200&h=200&fit=crop"
        },
        {
            id: 2,
            name: "Byredo Gypsy Water",
            brand: "Byredo",
            price: 180.00,
            image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=200&h=200&fit=crop"
        }
    ];

    const addresses = [
        {
            id: 1,
            type: "Home",
            name: "John Doe",
            address: "123 Main Street, Apt 4B",
            city: "New York, NY 10001",
            isDefault: true
        },
        {
            id: 2,
            type: "Work",
            name: "John Doe",
            address: "456 Business Ave, Suite 100",
            city: "New York, NY 10002",
            isDefault: false
        }
    ];

    const renderTabContent = () => {
        switch (activeTab) {
            case "overview":
                return (
                    <div className="space-y-8">
                        {/* Stats Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                            {[
                                { label: "Total Orders", value: "12", icon: ShoppingBag, color: "purple" },
                                { label: "Wishlist Items", value: "8", icon: Heart, color: "rose" },
                                { label: "Total Spent", value: "$1,250", icon: CreditCard, color: "blue" },
                                { label: "Reviews Written", value: "15", icon: Star, color: "yellow" }
                            ].map((stat) => (
                                <Card key={stat.label} className="transition-shadow hover:shadow-lg bg-white dark:bg-gray-800">
                                    <CardContent className="p-6 text-center">
                                        <div className={`inline-flex items-center justify-center w-12 h-12 bg-${stat.color}-100 dark:bg-${stat.color}-900 rounded-lg mb-3`}>
                                            <stat.icon className={`w-6 h-6 text-${stat.color}-600 dark:text-${stat.color}-300`} />
                                        </div>
                                        <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">{stat.value}</div>
                                        <div className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>

                        {/* Recent Orders */}
                        <Card className="bg-white dark:bg-gray-800">
                            <CardHeader>
                                <CardTitle className="text-gray-900 dark:text-gray-100">Recent Orders</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    {recentOrders.slice(0, 3).map((order) => (
                                        <div key={order.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors border-gray-200 dark:border-gray-700">
                                            <div>
                                                <div className="font-semibold text-gray-900 dark:text-gray-100">{order.id}</div>
                                                <div className="text-sm text-gray-600 dark:text-gray-400">{order.items.join(", ")}</div>
                                                <div className="text-sm text-gray-500 dark:text-gray-300">{order.date}</div>
                                            </div>
                                            <div className="text-right">
                                                <div className="font-semibold text-gray-900 dark:text-gray-100">${order.total}</div>
                                                <span className={`px-2 py-1 text-xs rounded-full 
                                                    ${order.status === "Delivered" ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200" :
                                                        order.status === "Processing" ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200" :
                                                        "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200"}`}>
                                                    {order.status}
                                                </span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                );

            case "orders":
                return (
                    <Card className="bg-white dark:bg-gray-800">
                        <CardHeader>
                            <CardTitle className="text-gray-900 dark:text-gray-100">Order History</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {recentOrders.map((order) => (
                                    <div key={order.id} className="border rounded-lg p-6 hover:shadow-md transition-shadow border-gray-200 dark:border-gray-700">
                                        <div className="flex items-center justify-between mb-4">
                                            <div>
                                                <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-100">{order.id}</h3>
                                                <p className="text-gray-600 dark:text-gray-400">Ordered on {order.date}</p>
                                            </div>
                                            <div className="text-right">
                                                <div className="text-xl font-bold text-gray-900 dark:text-gray-100">${order.total}</div>
                                                <span className={`px-3 py-1 text-sm rounded-full 
                                                    ${order.status === "Delivered" ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200" :
                                                        order.status === "Processing" ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200" :
                                                        "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200"}`}>
                                                    {order.status}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            {order.items.map((item, index) => (
                                                <div key={index} className="text-gray-700 dark:text-gray-300">• {item}</div>
                                            ))}
                                        </div>
                                        <div className="mt-4 flex gap-2">
                                            <Button variant="outline" size="sm">View Details</Button>
                                            {order.status === "Delivered" && (
                                                <Button variant="outline" size="sm">Write Review</Button>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                );

            case "wishlist":
                return (
                    <Card className="bg-white dark:bg-gray-800">
                        <CardHeader>
                            <CardTitle className="text-gray-900 dark:text-gray-100">My Wishlist</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {wishlistItems.map((item) => (
                                    <div key={item.id} className="border rounded-lg p-4 hover:shadow-lg transition-shadow border-gray-200 dark:border-gray-700">
                                        <img src={item.image} alt={item.name} className="w-full h-48 object-cover rounded-lg mb-4" />
                                        <h3 className="font-semibold text-gray-900 dark:text-gray-100">{item.name}</h3>
                                        <p className="text-gray-600 dark:text-gray-400 text-sm">{item.brand}</p>
                                        <p className="text-lg font-bold mt-2 text-gray-900 dark:text-gray-100">${item.price}</p>
                                        <div className="mt-4 flex gap-2">
                                            <Button size="sm" className="flex-1">Add to Cart</Button>
                                            <Button variant="outline" size="sm">Remove</Button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                );

            case "addresses":
                return (
                    <Card className="bg-white dark:bg-gray-800">
                        <CardHeader className="flex flex-row items-center justify-between">
                            <CardTitle className="text-gray-900 dark:text-gray-100">Saved Addresses</CardTitle>
                            <Button>Add New Address</Button>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {addresses.map((address) => (
                                    <div key={address.id} className="border rounded-lg p-6 hover:shadow-md transition-shadow border-gray-200 dark:border-gray-700">
                                        <div className="flex items-center justify-between mb-2">
                                            <div className="flex items-center gap-2">
                                                <h3 className="font-semibold text-gray-900 dark:text-gray-100">{address.type}</h3>
                                                {address.isDefault && (
                                                    <span className="px-2 py-1 text-xs bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 rounded-full">Default</span>
                                                )}
                                            </div>
                                            <div className="flex gap-2">
                                                <Button variant="outline" size="sm">Edit</Button>
                                                <Button variant="outline" size="sm">Delete</Button>
                                            </div>
                                        </div>
                                        <div className="text-gray-700 dark:text-gray-300">
                                            <p>{address.name}</p>
                                            <p>{address.address}</p>
                                            <p>{address.city}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                );

            case "payment":
                return (
                    <Card className="bg-white dark:bg-gray-800">
                        <CardHeader className="flex flex-row items-center justify-between">
                            <CardTitle className="text-gray-900 dark:text-gray-100">Payment Methods</CardTitle>
                            <Button>Add New Card</Button>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                <div className="border rounded-lg p-6 hover:shadow-md transition-shadow border-gray-200 dark:border-gray-700">
                                    <div className="flex items-center justify-between mb-2">
                                        <div className="flex items-center gap-3">
                                            <div className="w-12 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded flex items-center justify-center">
                                                <span className="text-white text-xs font-bold">VISA</span>
                                            </div>
                                            <div>
                                                <p className="font-semibold text-gray-900 dark:text-gray-100">•••• •••• •••• 4242</p>
                                                <p className="text-sm text-gray-600 dark:text-gray-400">Expires 12/27</p>
                                            </div>
                                        </div>
                                        <div className="flex gap-2">
                                            <Button variant="outline" size="sm">Edit</Button>
                                            <Button variant="outline" size="sm">Remove</Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                );

            case "settings":
                return (
                    <Card className="bg-white dark:bg-gray-800">
                        <CardHeader>
                            <CardTitle className="text-gray-900 dark:text-gray-100">Account Settings</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Email</label>
                                    <input 
                                        type="email" 
                                        defaultValue="john.doe@example.com"
                                        className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Full Name</label>
                                    <input 
                                        type="text" 
                                        defaultValue="John Doe"
                                        className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Phone</label>
                                    <input 
                                        type="tel" 
                                        defaultValue="+1 (555) 123-4567"
                                        className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                                    />
                                </div>
                                <div className="pt-4">
                                    <Button className="bg-gradient-to-r from-purple-600 to-rose-600 hover:from-purple-700 hover:to-rose-700">
                                        Save Changes
                                    </Button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                );

            default:
                return null;
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            <Navbar />
            
            {/* Header */}
            <section className="pt-20 pb-8 bg-gradient-to-br from-purple-50 to-rose-50 dark:from-gray-800 dark:to-gray-700">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center gap-6 animate-fade-in">
                        <div className="w-20 h-20 bg-gradient-to-br from-purple-600 to-rose-600 rounded-full flex items-center justify-center shadow-lg">
                            <User className="w-10 h-10 text-white" />
                        </div>
                        <div>
                            <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-gray-100">Welcome back, John!</h1>
                            <p className="text-lg text-gray-600 dark:text-gray-400">Manage your account and preferences</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Main Content */}
            <section className="py-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col lg:flex-row gap-8">
                        {/* Sidebar */}
                        <div className="lg:w-64 flex-shrink-0">
                            <Card className="sticky top-8 bg-white dark:bg-gray-800">
                                <CardContent className="p-4">
                                    <nav className="space-y-1">
                                        {tabs.map((tab) => (
                                            <button
                                                key={tab.id}
                                                onClick={() => setActiveTab(tab.id)}
                                                className={`w-full flex items-center gap-3 px-4 py-3 text-left rounded-lg transition-colors 
                                                    ${activeTab === tab.id
                                                        ? "bg-gradient-to-r from-purple-600 to-rose-600 text-white shadow-lg"
                                                        : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"}`}
                                            >
                                                <tab.icon className="w-5 h-5" />
                                                {tab.label}
                                            </button>
                                        ))}
                                    </nav>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Content */}
                        <div className="flex-1 animate-fade-in">
                            {renderTabContent()}
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default Profile;
