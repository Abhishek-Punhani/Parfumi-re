import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Award, Heart, Sparkles, Users, Globe, Star } from "lucide-react";

const About = () => {
    const stats = [
        { number: "50+", label: "Premium Brands", icon: Star },
        { number: "500+", label: "Unique Fragrances", icon: Sparkles },
        { number: "10k+", label: "Happy Customers", icon: Users },
        { number: "25+", label: "Countries Served", icon: Globe }
    ];

    const team = [
        {
            name: "Sarah Johnson",
            role: "Founder & Perfumer",
            image:
                "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=400&h=400&fit=crop&crop=face",
            description:
                "With 15 years in the fragrance industry, Sarah brings passion and expertise to every scent."
        },
        {
            name: "Michael Chen",
            role: "Head of Curation",
            image:
                "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=400&h=400&fit=crop&crop=face",
            description:
                "Michael's keen nose and global connections help us discover the world's finest fragrances."
        },
        {
            name: "Emma Rodriguez",
            role: "Customer Experience Lead",
            image:
                "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=400&fit=crop&crop=face",
            description:
                "Emma ensures every customer finds their perfect scent with personalized consultations."
        }
    ];

    return (
        <div className="min-h-screen bg-background dark:bg-gray-900 transition-colors duration-500">
            <Navbar />

            {/* Hero Section */}
            <section className="pt-20 pb-16 bg-gradient-to-br from-purple-50 via-rose-50 to-indigo-50 dark:from-gray-800 dark:via-gray-700 dark:to-gray-900 transition-colors duration-500">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center animate-fade-in">
                        <div className="inline-flex items-center px-4 py-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-full mb-6 shadow-lg">
                            <Heart className="w-4 h-4 text-purple-600 mr-2" />
                            <span className="text-sm font-semibold text-purple-700 dark:text-purple-300">
                                Our Story
                            </span>
                        </div>
                        <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 dark:text-gray-100 mb-6">
                            Crafting Memories
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-rose-600 block">
                                Through Fragrance
                            </span>
                        </h1>
                        <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
                            Since 2010, Parfumière has been dedicated to bringing you the world's most exquisite fragrances.
                            We believe that the right scent can transform moments into memories and express who you truly are.
                        </p>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-16 bg-white dark:bg-gray-800 transition-colors duration-500">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                        {stats.map((stat, index) => (
                            <div
                                key={stat.label}
                                className="text-center animate-fade-in"
                                style={{ animationDelay: `${index * 200}ms` }}
                            >
                                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-600 to-rose-600 rounded-2xl mb-4 shadow-lg">
                                    <stat.icon className="w-8 h-8 text-white" />
                                </div>
                                <div className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                                    {stat.number}
                                </div>
                                <div className="text-gray-600 dark:text-gray-400 font-medium">
                                    {stat.label}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Story Section */}
            <section className="py-20 bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-700 transition-colors duration-500">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <div className="animate-fade-in">
                            <div className="inline-flex items-center px-4 py-2 bg-purple-50 dark:bg-gray-700 rounded-full mb-6">
                                <Award className="w-4 h-4 text-purple-600 mr-2" />
                                <span className="text-sm font-semibold text-purple-700 dark:text-purple-300">
                                    Our Mission
                                </span>
                            </div>
                            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-6">
                                Passion for Perfect Scents
                            </h2>
                            <p className="text-lg text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                                Our journey began with a simple belief: everyone deserves to find their signature scent.
                                We partner with renowned perfumers and emerging artists worldwide to curate a collection
                                that spans from timeless classics to avant-garde creations.
                            </p>
                            <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
                                Every fragrance in our collection is carefully selected for its quality, uniqueness,
                                and ability to evoke emotion. We're not just selling perfumes; we're helping you
                                discover scents that become part of your story.
                            </p>
                            <Button className="bg-gradient-to-r from-purple-600 to-rose-600 hover:from-purple-700 hover:to-rose-700 shadow-lg">
                                Explore Our Collections
                            </Button>
                        </div>

                        <div className="relative animate-fade-in delay-300">
                            <div className="aspect-square rounded-3xl overflow-hidden shadow-2xl">
                                <img
                                    src="https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=600&h=600&fit=crop"
                                    alt="Perfume crafting process"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-gradient-to-br from-purple-400 to-rose-400 rounded-full blur-xl opacity-50"></div>
                            <div className="absolute -top-6 -right-6 w-24 h-24 bg-gradient-to-br from-indigo-400 to-purple-400 rounded-full blur-xl opacity-50"></div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Team Section */}
            <section className="py-20 bg-white dark:bg-gray-800 transition-colors duration-500">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16 animate-fade-in">
                        <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                            Meet Our Team
                        </h2>
                        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                            The passionate experts behind your perfect fragrance experience
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {team.map((member, index) => (
                            <div
                                key={member.name}
                                className="text-center group animate-fade-in"
                                style={{ animationDelay: `${index * 200}ms` }}
                            >
                                <div className="relative inline-block mb-6">
                                    <div className="w-32 h-32 mx-auto rounded-full overflow-hidden shadow-xl group-hover:shadow-2xl transition-all duration-300">
                                        <img
                                            src={member.image}
                                            alt={member.name}
                                            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                                        />
                                    </div>
                                    <div className="absolute inset-0 rounded-full bg-gradient-to-br from-purple-600/20 to-rose-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                </div>

                                <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                                    {member.name}
                                </h3>
                                <p className="text-purple-600 dark:text-purple-400 font-semibold mb-4">
                                    {member.role}
                                </p>
                                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                                    {member.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Values Section */}
            <section className="py-20 bg-gradient-to-br from-purple-50 to-rose-50 dark:from-gray-800 dark:to-gray-700 transition-colors duration-500">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16 animate-fade-in">
                        <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                            Our Values
                        </h2>
                        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                            The principles that guide everything we do
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            {
                                title: "Quality First",
                                description:
                                    "We source only the finest ingredients and work with master perfumers to ensure exceptional quality in every bottle.",
                                icon: Award
                            },
                            {
                                title: "Personal Connection",
                                description:
                                    "Every fragrance tells a story. We help you find scents that resonate with your personality and memories.",
                                icon: Heart
                            },
                            {
                                title: "Sustainable Beauty",
                                description:
                                    "We're committed to ethical sourcing and sustainable practices that respect both artisans and the environment.",
                                icon: Sparkles
                            }
                        ].map((value, index) => (
                            <div
                                key={value.title}
                                className="text-center p-8 bg-white dark:bg-gray-700 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 animate-fade-in"
                                style={{ animationDelay: `${index * 200}ms` }}
                            >
                                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-600 to-rose-600 rounded-2xl mb-6 shadow-lg">
                                    <value.icon className="w-8 h-8 text-white" />
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                                    {value.title}
                                </h3>
                                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                                    {value.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default About;
