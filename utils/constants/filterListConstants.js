import { useDispatch, useSelector } from "react-redux";
import {
  setFilterSortBy,
  setFilterClimbType,
  setFilterActivity,
  setFilterStatus,
} from "../../redux/actions";

const filterLists = () => {
  const dispatch = useDispatch();
  const { filterActivity } = useSelector((state) => state.spraywallReducer);

  const activity = [
    {
      id: 1,
      title: "Liked",
      filter: "liked",
      onPress: () =>
        dispatch(
          setFilterActivity(filterActivity === "liked" ? null : "liked")
        ),
    },
    {
      id: 2,
      title: "Bookmarked",
      filter: "bookmarked",
      onPress: () =>
        dispatch(
          setFilterActivity(
            filterActivity === "bookmarked" ? null : "bookmarked"
          )
        ),
    },
    {
      id: 3,
      title: "Sent",
      filter: "sent",
      onPress: () =>
        dispatch(setFilterActivity(filterActivity === "sent" ? null : "sent")),
    },
  ];

  const sortBy = [
    {
      id: 1,
      title: "Grade",
      filter: "grade",
      onPress: () => dispatch(setFilterSortBy("grade")),
    },
    {
      id: 2,
      title: "Popular",
      filter: "popular",
      onPress: () => dispatch(setFilterSortBy("popular")),
    },
    {
      id: 3,
      title: "Newest",
      filter: "newest",
      onPress: () => dispatch(setFilterSortBy("newest")),
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

  return { activity, sortBy, climbType, status }; // return the arrays as an object
};

export default filterLists;
