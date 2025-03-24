import PerformerProfile from '../../components/PerformerProfile/PerformerProfile';

const PerformerProfilePage = () => {
  return (
    <div style={{
      backgroundImage: 'url(/performer-profile/bg.svg)',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat'
    }}>
      <PerformerProfile />
    </div>
  );
}

export default PerformerProfilePage;
