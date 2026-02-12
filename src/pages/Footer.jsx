import { Link } from "react-router-dom";
// TEMPORARILY DISABLED FOR TESTING - Instagram API calls disabled
// import { useGetInstagramPostsQuery } from "../apis/instagram";

const Footer = ({ isHome }) => {
  // TEMPORARILY DISABLED FOR TESTING - Instagram API calls disabled
  // Configure React Query to:
  // - Refetch on mount (when component mounts)
  // - Don't refetch on window focus (to avoid unnecessary API calls)
  // - Treat data as never stale (rely on backend cache freshness)
  // const { data: instagramData, isLoading: isLoadingInstagram } = useGetInstagramPostsQuery(undefined, {
  //   refetchOnMount: true,
  //   refetchOnWindowFocus: false,
  //   refetchOnReconnect: false,
  //   staleTime: Infinity, // Data never becomes stale - rely on backend cache
  // });
  // const instagramPosts = instagramData?.posts || [];
  const instagramPosts = []; // Empty array - Instagram disabled for testing
  const isLoadingInstagram = false;

  // Helper function to get proxied image URL (use proxy by default)
  const getImageUrl = (imageUrl) => {
    if (!imageUrl) return null;
    const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5001/v1';
    // Use proxy by default to avoid CORS issues
    const proxyUrl = `${apiBaseUrl}/api/user/instagram/image?url=${encodeURIComponent(imageUrl)}`;
    console.log('Image proxy URL:', proxyUrl); // Debug log
    return proxyUrl;
  };
  return (
    <footer className="bg-[#1D1D1D] max-w-[1400px] mx-auto text-white py-10 px-8 md:px-20">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Logo & Address Section */}
        <div className="">
          <img
            src="/footer/footer-logo.png"
            alt="DragSpace Logo"
            width={309}
            height={70}
          />
          <div className="mt-6 md:mt-[90px] text-[15px] font-spaceGrotesk space-y-1">
            <p className="flex items-center gap-1 lg:whitespace-nowrap">
              <img src="/footer/location.png" />
              2000 West Loop S, Suite 2200 <br />
              Houston, TX 77027
            </p>
            <p className="flex items-center gap-2">
              <img src="/footer/email.png" />
              info@dragspace.com
            </p>
            <p className="flex items-center gap-2">
              <img src="/footer/phone.png" />1 (844) 713-DRAG (3724)
            </p>
          </div>
        </div>

        {/* Useful Links */}
        <div>
          <h3 className="text-xl font-bold">Useful Links</h3>
          <ul className="mt-4 space-y-2 text-[15px] font-spaceGrotesk">
            <li className="flex flex-col">
              <Link to="/" className="flex items-center gap-4 cursor-pointer text-[#878787]" onClick={() => window.scrollTo(0, 0)}>
                <img src="/footer/arrow.png" alt="arrow" /> Home
              </Link>
              <div className="w-[310px] border-b border-[#878787] mt-2"></div>
            </li>
            <li className="flex flex-col">
              <Link to="/performers" className="flex items-center gap-4 cursor-pointer text-[#878787]" onClick={() => window.scrollTo(0, 0)}>
                <img src="/footer/arrow.png" alt="arrow" /> Performers
              </Link>
              <div className="w-[310px] border-b border-[#878787] mt-2"></div>
            </li>
            <li className="flex flex-col">
              <Link to="/venues" className="flex items-center gap-4 cursor-pointer text-[#878787]" onClick={() => window.scrollTo(0, 0)}>
                <img src="/footer/arrow.png" alt="arrow" /> Venues
              </Link>
              <div className="w-[310px] border-b border-[#878787] mt-2"></div>
            </li>
            <li className="flex flex-col">
              <Link to="/events" className="flex items-center gap-4 cursor-pointer text-[#878787]" onClick={() => window.scrollTo(0, 0)}>
                <img src="/footer/arrow.png" alt="arrow" /> Events
              </Link>
              <div className="w-[310px] border-b border-[#878787] mt-2"></div>
            </li>
            {/* <li className="flex flex-col">
              <div className="flex items-center gap-4 cursor-pointer text-[#878787]">
                <img src="/footer/arrow.png" alt="arrow" /> FAQ's
              </div>
              <div className="w-[310px] border-b border-[#878787] mt-2"></div>
            </li> */}
          </ul>
        </div>

        {/* Instagram Grid Section */}
        <div>
          <h3 className="text-xl font-bold mb-4">Instagram</h3>
          {isLoadingInstagram ? (
            <div className="grid grid-cols-3 gap-1.5">
              {[...Array(6)].map((_, index) => (
                <div
                  key={index}
                  className="aspect-square bg-gray-700 rounded animate-pulse"
                />
              ))}
            </div>
          ) : instagramPosts.length > 0 ? (
            <div className="grid grid-cols-3 gap-1.5">
              {instagramPosts.slice(0, 6).map((post) => (
                <a
                  key={post.id}
                  href={post.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="aspect-square overflow-hidden rounded hover:opacity-80 transition-opacity cursor-pointer bg-gray-800"
                >
                  <img
                    src={getImageUrl(post.imageUrl || post.thumbnailUrl)}
                    alt={post.caption || "Instagram post"}
                    className="w-full h-full object-cover"
                    loading="lazy"
                    onError={(e) => {
                      console.error('Image failed to load:', e.target.src); // Debug log
                      // If proxy failed, try placeholder
                      e.target.src = "/footer/insta1.png";
                      e.target.onerror = null; // Prevent infinite loop
                    }}
                  />
                </a>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-3 gap-1.5">
              {[...Array(6)].map((_, index) => (
                <div
                  key={index}
                  className="aspect-square bg-gray-700 rounded flex items-center justify-center"
                >
                  <span className="text-gray-500 text-xs">No image</span>
                </div>
              ))}
            </div>
          )}
          <a
            href="https://www.instagram.com/officialdragspace"
            target="_blank"
            rel="noopener noreferrer"
            className="block mt-4 text-[#878787] hover:text-[#FF00A2] transition-colors text-sm"
          >
            Follow Our Instagram
          </a>
        </div>
      </div>
     
     {isHome && 
        <div className="mt-8 py-4">
          <div className="max-w-7xl mx-auto px-4 flex items-center justify-center gap-2">
            <span className="text-sm">DragSpace, LLC</span>
            <span className="text-sm">|</span>
            <Link to="/privacy" className="text-sm hover:text-[#FF00A2] underline" onClick={() => window.scrollTo(0, 0)}>Privacy Policy</Link>
            <span className="text-sm">|</span>
            <Link to="/terms" className="text-sm hover:text-[#FF00A2] underline" onClick={() => window.scrollTo(0, 0)}>Terms And Conditions</Link>
          </div>
        </div>
        }
      
    </footer>
  );
};

export default Footer;
