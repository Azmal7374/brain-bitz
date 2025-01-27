/* eslint-disable prettier/prettier */

import Banner from "@/components/Home/Banner/Banner";
import HowItWorks from "@/components/Home/HowItWokrs/HowItWorks";
import PopularGames from "@/components/Home/PopularGames/PopularGames";




const HomePage = () => {
  return (
    <div>
     <Banner/>
     <PopularGames/>
     <HowItWorks/>
    </div>
  );
};

export default HomePage;
