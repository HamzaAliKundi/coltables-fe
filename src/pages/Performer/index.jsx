import Advertisment from '../../common/Ad/Advertisment';
import Banner from '../../common/Banner/Banner';
import Performer from '../../components/Performer/Performer';
const Performers = () => {
  return (
    <div style={{
      backgroundImage: 'url(/home/bg.png)',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat'
    }}>
      <Banner />
      <Performer />
      <Advertisment />
    </div>
  );
}

export default Performers
