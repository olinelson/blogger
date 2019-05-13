import ReactOnRails from "react-on-rails";

import Posts from "../bundles/components/Posts";
import PostShow from "../bundles/components/PostShow";
import UserShow from "../bundles/components/UserShow";
import NavBar from "../bundles/components/NavBar";

import "semantic-ui-css/semantic.min.css";

// This is how react_on_rails can see the HelloWorld in the browser.
ReactOnRails.register({
  Posts,
  PostShow,
  UserShow,
  NavBar
});
