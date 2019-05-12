import ReactOnRails from "react-on-rails";

import Posts from "../bundles/components/Posts";
import NewPost from "../bundles/components/NewPost";
import PostShow from "../bundles/components/PostShow";

// This is how react_on_rails can see the HelloWorld in the browser.
ReactOnRails.register({
  Posts,
  NewPost,
  PostShow
});
