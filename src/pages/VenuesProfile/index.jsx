import VenuesProfile from '../../components/VenuesProfile/VenuesProfile';

const VenueProfilePage = () => {
  return (
    <div style={{
      backgroundImage: 'url(/venue-profile/bg.svg)',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat'
    }}>
      <VenuesProfile />
    </div>
  );
}

export default VenueProfilePage;
