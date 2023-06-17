import { useDispatch } from "react-redux";
import {
  setFilterSortBy,
  setFilterClimbType,
  setFilterStatus,
} from "../../redux/actions";

const filterLists = () => {
  const dispatch = useDispatch();
  const sortBy = [
    {
      id: 1,
      title: "Most Popular",
      filter: "popular",
      onPress: () => dispatch(setFilterSortBy("popular")),
    },
    {
      id: 2,
      title: "Liked",
      filter: "liked",
      onPress: () => dispatch(setFilterSortBy("liked")),
    },
    {
      id: 3,
      title: "Bookmarked",
      filter: "bookmarked",
      onPress: () => dispatch(setFilterSortBy("bookmarked")),
    },
    {
      id: 4,
      title: "Most Recent",
      filter: "recent",
      onPress: () => dispatch(setFilterSortBy("recent")),
    },
  ];
  const climbType = [
    {
      id: 1,
      title: "Boulder",
      filter: "boulder",
      onPress: () => dispatch(setFilterClimbType("boulder")),
    },
    {
      id: 2,
      title: "Route",
      filter: "route",
      onPress: () => dispatch(setFilterClimbType("route")),
    },
  ];
  const status = [
    {
      id: 1,
      title: "All",
      filter: "all",
      onPress: () => dispatch(setFilterStatus("all")),
    },
    {
      id: 2,
      title: "Established",
      filter: "established",
      onPress: () => dispatch(setFilterStatus("established")),
    },
    {
      id: 3,
      title: "Open Projects",
      filter: "projects",
      onPress: () => dispatch(setFilterStatus("projects")),
    },
    {
      id: 4,
      title: "My Drafts",
      filter: "drafts",
      onPress: () => dispatch(setFilterStatus("drafts")),
    },
  ];

  return { sortBy, climbType, status }; // return the arrays as an object
};

export default filterLists;
