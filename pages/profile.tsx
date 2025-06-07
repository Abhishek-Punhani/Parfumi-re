import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  User,
  Heart,
  ShoppingBag,
  Settings,
  Star,
  Package,
  MapPin,
  CreditCard,
} from "lucide-react";
import { UserProfile } from "@/types/user";
import axios from "axios";

const Profile = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);

  const tabs = [
    { id: "overview", label: "Overview", icon: User },
    { id: "orders", label: "My Orders", icon: Package },
    { id: "wishlist", label: "Wishlist", icon: Heart },
    { id: "addresses", label: "Addresses", icon: MapPin },
    { id: "payment", label: "Payment Methods", icon: CreditCard },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  useEffect(() => {
    axios
      .post("/api/auth/profile")
      .then((response) => {
        setUserProfile(response.data as UserProfile);
      })
      .catch((error) => {
        console.error("Failed to load user profile", error);
      });
  }, []);

  const renderTabContent = () => {
    if (!userProfile) {
      return <p>Loading...</p>;
    }

    switch (activeTab) {
      case "overview":
        return (
          <div className="space-y-8">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {[
                {
                  label: "Total Orders",
                  value: userProfile.totalOrders,
                  icon: ShoppingBag,
                  color: "purple",
                },
                {
                  label: "Wishlist Items",
                  value: (userProfile.wishlist || []).length,
                  icon: Heart,
                  color: "rose",
                },
                {
                  label: "Total Spent",
                  value: userProfile.totalSpent,
                  icon: CreditCard,
                  color: "blue",
                },
                {
                  label: "Reviews Written",
                  value: (userProfile.reviewsWritten || []).length,
                  icon: Star,
                  color: "yellow",
                },
              ].map((stat) => (
                <Card
                  key={stat.label}
                  className="transition-shadow hover:shadow-lg bg-white dark:bg-gray-800"
                >
                  <CardContent className="p-6 text-center">
                    <div
                      className={`inline-flex items-center justify-center w-12 h-12 bg-${stat.color}-100 dark:bg-${stat.color}-900 rounded-lg mb-3`}
                    >
                      <stat.icon
                        className={`w-6 h-6 text-${stat.color}-600 dark:text-${stat.color}-300`}
                      />
                    </div>
                    <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                      {stat.value}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      {stat.label}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Recent Orders */}
            <Card className="bg-white dark:bg-gray-800">
              <CardHeader>
                <CardTitle className="text-gray-900 dark:text-gray-100">
                  Recent Orders
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {(userProfile.orders || []).slice(0, 3).map((order) => (
                    <div
                      key={order._id}
                      className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors border-gray-200 dark:border-gray-700"
                    >
                      <div>
                        <div className="font-semibold text-gray-900 dark:text-gray-100">
                          {order._id}
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                          {order.products.join(", ")}
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-300">
                          {new Date(order.date).toLocaleDateString()}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold text-gray-900 dark:text-gray-100">
                          ${order.total}
                        </div>
                        <span
                          className={`px-2 py-1 text-xs rounded-full 
                                                    ${
                                                      order.status ===
                                                      "Delivered"
                                                        ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                                                        : order.status ===
                                                          "Processing"
                                                        ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                                                        : "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200"
                                                    }`}
                        >
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
              <CardTitle className="text-gray-900 dark:text-gray-100">
                Order History
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {(userProfile.orders || []).map((order) => (
                  <div
                    key={order._id}
                    className="border rounded-lg p-6 hover:shadow-md transition-shadow border-gray-200 dark:border-gray-700"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-100">
                          {order._id}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400">
                          Ordered on {new Date(order.date).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="text-right">
                        <div className="text-xl font-bold text-gray-900 dark:text-gray-100">
                          ${order.total}
                        </div>
                        <span
                          className={`px-3 py-1 text-sm rounded-full 
                                                    ${
                                                      order.status ===
                                                      "Delivered"
                                                        ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                                                        : order.status ===
                                                          "Processing"
                                                        ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                                                        : "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200"
                                                    }`}
                        >
                          {order.status}
                        </span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      {order.products.map((prodId, index) => (
                        <div
                          key={index}
                          className="text-gray-700 dark:text-gray-300"
                        >
                          • {prodId}
                        </div>
                      ))}
                    </div>
                    <div className="mt-4 flex gap-2">
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                      {order.status === "Delivered" && (
                        <Button variant="outline" size="sm">
                          Write Review
                        </Button>
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
              <CardTitle className="text-gray-900 dark:text-gray-100">
                My Wishlist
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {(userProfile.wishlist || []).map((item) => (
                  <div
                    key={item.id}
                    className="border rounded-lg p-4 hover:shadow-lg transition-shadow border-gray-200 dark:border-gray-700"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-48 object-cover rounded-lg mb-4"
                    />
                    <h3 className="font-semibold text-gray-900 dark:text-gray-100">
                      {item.name}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                      {item.brand}
                    </p>
                    <p className="text-lg font-bold mt-2 text-gray-900 dark:text-gray-100">
                      ${item.price}
                    </p>
                    <div className="mt-4 flex gap-2">
                      <Button size="sm" className="flex-1">
                        Add to Cart
                      </Button>
                      <Button variant="outline" size="sm">
                        Remove
                      </Button>
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
            <CardHeader className="flex items-center justify-between">
              <CardTitle className="text-gray-900 dark:text-gray-100">
                Saved Addresses
              </CardTitle>
              <Button>Add New Address</Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {(userProfile.addresses || []).map((address) => (
                  <div
                    key={address.id}
                    className="border rounded-lg p-6 hover:shadow-md transition-shadow border-gray-200 dark:border-gray-700"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-gray-900 dark:text-gray-100">
                          {address.type}
                        </h3>
                        {address.isDefault && (
                          <span className="px-2 py-1 text-xs bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 rounded-full">
                            Default
                          </span>
                        )}
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          Edit
                        </Button>
                        <Button variant="outline" size="sm">
                          Delete
                        </Button>
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
            <CardHeader className="flex items-center justify-between">
              <CardTitle className="text-gray-900 dark:text-gray-100">
                Payment Methods
              </CardTitle>
              <Button>Add New Card</Button>
            </CardHeader>
            <CardContent>
              {/* Dynamic payment methods can be rendered here */}
              <p>Payment methods data goes here.</p>
            </CardContent>
          </Card>
        );

      case "settings":
        return (
          <Card className="bg-white dark:bg-gray-800">
            <CardHeader>
              <CardTitle className="text-gray-900 dark:text-gray-100">
                Account Settings
              </CardTitle>
            </CardHeader>
            <CardContent>
              {/* Build settings UI dynamically */}
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    defaultValue={userProfile.email}
                    className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    defaultValue={userProfile.name}
                    className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Phone
                  </label>
                  <input
                    type="tel"
                    placeholder="Enter phone number"
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
          <div className="flex items-center gap-6">
            <div className="w-20 h-20 bg-gradient-to-br from-purple-600 to-rose-600 rounded-full flex items-center justify-center shadow-lg">
              <User className="w-10 h-10 text-white" />
            </div>
            <div>
              <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-gray-100">
                Welcome back, {userProfile?.name || "User"}!
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-400">
                Manage your account and preferences
              </p>
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
                                                    ${
                                                      activeTab === tab.id
                                                        ? "bg-gradient-to-r from-purple-600 to-rose-600 text-white shadow-lg"
                                                        : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                                                    }`}
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
            <div className="flex-1">{renderTabContent()}</div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Profile;
