import ReactOnRails from "react-on-rails";

import Posts from "../bundles/components/Posts";
import NewPost from "../bundles/components/NewPost";
import PostView from "../bundles/components/PostView";
import PostEdit from "../bundles/components/PostView";

// This is how react_on_rails can see the HelloWorld in the browser.
ReactOnRails.register({
  Posts,
  NewPost,
  PostView,
  PostEdit
});
