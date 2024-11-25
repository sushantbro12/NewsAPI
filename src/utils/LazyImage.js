import { useInView } from "react-intersection-observer";

export const LazyImage = ({ src, alt, fallback }) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    rootMargin: "500px",
  });

  return (
    <div ref={ref} className="w-full h-96 mb-4 rounded-lg overflow-hidden">
      {inView ? (
        <img
          src={src || fallback}
          alt={alt}
          className="w-full h-96 object-cover"
          onError={(e) => {
            e.target.src = fallback;
          }}
        />
      ) : (
        <div className="w-full h-96 bg-gray-300 animate-pulse"></div> //placeholder
      )}
    </div>
  );
};
