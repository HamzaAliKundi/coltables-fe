import PerformerProfile from '../../components/PerformerProfile/PerformerProfile';
import Footer from '../Footer';

const PerformerProfilePage = () => {
  return (
    <div style={{
      backgroundImage: 'url(/performer-profile/bg.svg)',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat'
    }}>
      <PerformerProfile />
      <Footer />
    </div>
  );
}

export default PerformerProfilePage;
