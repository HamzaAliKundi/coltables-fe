import Advertisment from '../../common/Ad/Advertisment';
import Banner from '../../components/venues/Banner';
import VenuesList from '../../components/venues/VenuesList';
import Footer from '../Footer';

const Venues = ({ searchQuery }) => {
  return (
    <>
      <div className='bg-black'>
        <Banner />
      </div>
      <div
        className="min-h-screen w-full"
        style={{
          background: "radial-gradient(ellipse at center, #5E063E 0%, #5E063E 30%, #030200 70%)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <VenuesList isVenue={true} searchQuery={searchQuery} />
        <Advertisment />
        <Footer />
      </div>
    </>
  );
}

export default Venues;
