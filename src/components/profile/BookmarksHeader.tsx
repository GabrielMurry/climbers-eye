import React from "react";
import Header from "../common/header/Header";
import BackIcon from "../common/header/BackIcon";

const BookmarksHeader = () => {
  return <Header leftIcon={<BackIcon />} centerText="Bookmarks" />;
};

export default BookmarksHeader;
