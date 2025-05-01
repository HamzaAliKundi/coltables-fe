import Advertisment from '../../common/Ad/Advertisment';
import Banner from '../../common/Banner/Banner';
import Performer from '../../components/Performer/Performer';
import Footer from '../Footer';
const Performers = ({ searchQuery }) => {
  return (
    <div  className="min-h-screen w-full"
    style={{
      background: "radial-gradient(ellipse at center, #5E063E 0%, #5E063E 30%, #030200 70%)",
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
    }}>
      <Banner />
      <Performer isPerformer={true} searchQuery={searchQuery} />
      <Advertisment />
      <Footer />
    </div>
  );
}

export default Performers
