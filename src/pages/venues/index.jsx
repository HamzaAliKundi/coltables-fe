import Advertisment from '../../common/Ad/Advertisment';
import Banner from '../../components/venues/Banner';
import VenuesList from '../../components/venues/VenuesList';
import Footer from '../Footer';
const Venues = () => {
  return (
    <>
      <Banner />
      <div
        style={{
          backgroundImage: "url(/venues/bg.svg)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <VenuesList isVenue={true} />
        <Advertisment />
        <Footer />
      </div>
    </>
  );
}

export default Venues
