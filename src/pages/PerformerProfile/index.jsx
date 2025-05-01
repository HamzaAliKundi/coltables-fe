import PerformerProfile from '../../components/PerformerProfile/PerformerProfile';
import Footer from '../Footer';

const PerformerProfilePage = () => {
  return (
    <div  className="min-h-screen w-full"
    style={{
      background: "radial-gradient(ellipse at center, #5E063E 0%, #5E063E 30%, #030200 70%)",
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
    }}>
      <PerformerProfile />
      <Footer />
    </div>
  );
}

export default PerformerProfilePage;
