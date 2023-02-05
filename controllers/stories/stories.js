import { load } from "cheerio";
import util from "../../utils/utils.js";

const getStories = async (req, res) => {
  try {
    const { data } = await util.serverRequest(
      "get",
      `https://techcrunch.com/category/security/`
    );
    const $ = load(data);
    const postTitles = [];

    // Get post title and links
    $(".post-block__title__link").each((_idx, el) => {
      let postTitle = $(el).text();
      postTitle = postTitle.replace(/[^a-zA-Z0-9 ]/g, "");
      postTitles.push({ id: _idx, postTitle, href: el.attribs.href });

      $(".post-block__content").each((_idy, desc) => {
        let description = $(desc)
          .text()
          .replace(/[^a-zA-Z0-9 ]/g, "");

        if (_idx === _idy) {
          postTitles.filter((post) => {
            post.id === _idy;
          });
          postTitles[_idy].description = description;
        }
      });
    });

    util.serverResponse(res, 200, true, postTitles);
  } catch (error) {
    util.serverResponse(res, 500, false, error);
  }
};

export default { getStories };
