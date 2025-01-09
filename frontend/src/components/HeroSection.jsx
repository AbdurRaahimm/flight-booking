import { ImageSlider } from './ImageSlider';
import SearchForm from './SearchForm';

export default function HeroSection() {

    return (       
        <>
       <section className="relative min-h-screen flex items-center justify-center ">
          <ImageSlider />
          <div className="container relative mx-auto px-4 py-0 z-20">
            <div className="text-center mb-16">
              <h1 className="text-5xl md:text-6xl font-bold mb-6 text-white drop-shadow-lg">
                Find Your Perfect Flight
              </h1>
              <p className="text-white text-xl mb-8 max-w-2xl mx-auto drop-shadow">
                Search through thousands of flights to find the best deals for your next adventure
              </p>
            </div>
            <SearchForm />
          </div>
        </section>
       
   </>
    )
}
