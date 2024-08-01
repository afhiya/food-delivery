// components/Banner.js
const Banner = () => {
    return (
        <div className="bg-green-600 text-white py-20 relative overflow-hidden">
            <div className="container mx-auto px-6 text-center">
                <h1 className="text-4xl md:text-6xl font-bold mb-4">
                    Benefits of Shopping at ZuttoFood
                </h1>
                <p className="text-lg md:text-2xl mb-8">
                    Enjoy various benefits of shopping at ZuttoFood, from
                    quality products to the best service.
                </p>
                <button className="bg-white text-green-600 font-semibold py-2 px-4 rounded hover:bg-gray-200 transition duration-300">
                    View More
                </button>
            </div>
        </div>
    );
};

export default Banner;
