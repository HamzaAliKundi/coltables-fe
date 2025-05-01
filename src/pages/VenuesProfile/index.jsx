import VenuesProfile from '../../components/VenuesProfile/VenuesProfile';
import Footer from '../Footer';

const VenueProfilePage = () => {
  return (
    <div  className="min-h-screen w-full"
    style={{
      background: "radial-gradient(ellipse at center, #5E063E 0%, #5E063E 30%, #030200 70%)",
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
    }}>
      <VenuesProfile />
      <Footer />
    </div>
  );
}

export default VenueProfilePage;
