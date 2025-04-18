import Advertisment from '../../common/Ad/Advertisment';
import Banner from '../../common/Banner/Banner';
import Performer from '../../components/Performer/Performer';
import Footer from '../Footer';
const Performers = () => {
  return (
    <div style={{
      backgroundImage: 'url(/performer/bg.svg)',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat'
    }}>
      <Banner />
      <Performer isPerformer={true} />
      <Advertisment />
      <Footer />
    </div>
  );
}

export default Performers
