import { BentoBox } from "../elements/box";
import type { Place } from "@prisma/client";
import { Badge } from "../ui/badge";
import { MapPin, Check } from "lucide-react";

const PlaceTile = ({ place  } : { place : Place}) => {
  return (
    <BentoBox
      key={place.id}
      className="group overflow-hidden transition-all duration-300 shadow-none hover:shadow-md"
    >
      <div className="">
        <div className="flex items-start justify-between">
          <div className="px-4 py-2">
            <div className="text-lg font-medium">{place.name}</div>
            {place.address && (
              <div className="flex items-center mt-1/2 text-sm">
                <MapPin className="mr-1 h-3.5 w-3.5" />
                {place.address}
              </div>
            )}
          </div>
          {place.verified && (
            <Badge variant="outline" className="flex items-center gap-1 text-xs p-4">
              <Check className="h-3 w-3" />
            </Badge>
          )}
        </div>
      </div>
      <div className="aspect-[4/3] relative overflow-hidden rounded-md p-0">
        {/* {place.posts.length > 0 && (
          <div className="absolute left-3 top-3 z-10">
            <Badge className="bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white">
              <Calendar className="mr-1 h-3.5 w-3.5" />
              {place.posts.length} Post{place.posts.length > 1 ? "s" : ""}
            </Badge>
          </div>
        )} */}
        {/* <div className="absolute right-3 top-3 z-10 flex gap-1">
          {place.categories?.map((category) => {
            const { icon: Icon, color } = categoryIcons[category] || {};
            return (
              <div
                key={category}
                className={`flex h-7 w-7 items-center justify-center rounded-full ${color}`}
              >
                <Icon className="h-3.5 w-3.5" />
              </div>
            );
          })} */}
        <img
          src={place.picture ?? "/placeholder.svg"}
          alt={`${place.name} location`}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        </div>
        <p className="text-sm text-gray-700 dark:text-gray-300 line-clamp-3 mb-4 mt-2">
                {place.description === "" ? "No description provided." : place.description}
              </p>

        {/* {place.rating && (
          <div className="absolute bottom-3 right-3 flex items-center gap-1 rounded-full bg-white/90 px-2 py-1 text-xs font-medium text-gray-700 backdrop-blur-sm">
            <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
            {place.rating}
          </div>
        )} */}
    </BentoBox>
  );
};

// PlaceTile.propTypes = {
//   place: PropTypes.shape({
//     id: PropTypes.string.isRequired,
//     name: PropTypes.string.isRequired,
//     picture: PropTypes.string,
//     address: PropTypes.string,
//     group: PropTypes.bool,
//     posts: PropTypes.arrayOf(PropTypes.object),
//     categories: PropTypes.arrayOf(PropTypes.string),
//     rating: PropTypes.number,
//   }).isRequired,
//   openDetails: PropTypes.func.isRequired,
//   categoryIcons: PropTypes.objectOf(
//     PropTypes.shape({
//       icon: PropTypes.elementType.isRequired,
//       color: PropTypes.string.isRequired,
//     })
//   ).isRequired,
// };

export default PlaceTile;
