import VenuesProfile from '../../components/VenuesProfile/VenuesProfile';
import Footer from '../Footer';

const VenueProfilePage = () => {
  return (
    <div style={{
      backgroundImage: 'url(/venue-profile/bg.svg)',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat'
    }}>
      <VenuesProfile />
      <Footer />
    </div>
  );
}

export default VenueProfilePage;
