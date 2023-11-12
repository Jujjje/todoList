import ContentLoader from "react-content-loader";

const ItemSkeleton = () => (
  <ContentLoader
    speed={2}
    width={820}
    height={80}
    viewBox="0 0 820 80"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
  >
    <circle cx="40" cy="40" r="40" />
    <rect x="106" y="1" rx="10" ry="10" width="280" height="27" />
    <rect x="107" y="41" rx="10" ry="10" width="280" height="27" />
    <circle cx="594" cy="32" r="16" />
    <circle cx="695" cy="134" r="90" />
    <circle cx="503" cy="32" r="16" />
    <circle cx="457" cy="32" r="16" />
    <circle cx="410" cy="32" r="16" />
  </ContentLoader>
);

export default ItemSkeleton;
