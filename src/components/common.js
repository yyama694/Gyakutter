export { formatDate };
export { photoCount };
export { replaceMention };
export { replaceUrl };
export { replaceExtraUrl };
import getOg from "../api/HttpClient";

function formatDate(dateStr) {
  const date = new Date(Date.parse(dateStr));
  let format = "yyyy年MM月dd日 HH:mm:ss";
  format = format.replace(/yyyy/g, date.getFullYear());
  format = format.replace(/MM/g, ("0" + (date.getMonth() + 1)).slice(-2));
  format = format.replace(/dd/g, ("0" + date.getDate()).slice(-2));
  format = format.replace(/HH/g, ("0" + date.getHours()).slice(-2));
  format = format.replace(/mm/g, ("0" + date.getMinutes()).slice(-2));
  format = format.replace(/ss/g, ("0" + date.getSeconds()).slice(-2));
  return format;
}

function photoCount(data) {
  if (!data.extended_entities) {
    return 0;
  }
  if (!data.extended_entities.media) {
    return 0;
  }
  const medias = data.extended_entities.media;
  return medias.filter(d => d.type === "photo").length;
}

// ツイート中の余計なURLを削除
function replaceExtraUrl(list) {
  list.forEach(data => {
    // メディアのURL
    if (data.extended_entities && data.extended_entities.media[0]) {
      data.text = data.text.replace(data.extended_entities.media[0].url, "");
    }
    if (
      data.retweeted_status &&
      data.retweeted_status.extended_entities &&
      data.retweeted_status.extended_entities.media[0]
    ) {
      data.retweeted_status.text = data.retweeted_status.text.replace(
        data.retweeted_status.extended_entities.media[0].url,
        ""
      );
    }
    if (
      data.quoted_status &&
      data.quoted_status.extended_entities &&
      data.quoted_status.extended_entities.media[0]
    ) {
      data.quoted_status.text = data.quoted_status.text.replace(
        data.quoted_status.extended_entities.media[0].url,
        ""
      );
    }

    // 引用リツイートのURL
    if (
      data.quoted_status &&
      data.entities.urls[0] &&
      data.entities.urls[0].url
    ) {
      data.text = data.text.replace(data.entities.urls[0].url, "");
    }
  });
  return list;
}
function replaceMention(list) {
  list.forEach(data => {
    const mentions = data.entities.user_mentions;
    if (mentions.length) {
      mentions.forEach(m => {
        data.text = data.text.replace(
          "@" + m.screen_name,
          "<a href=\"#\" @click.stop=\"$emit('user','" +
            m.screen_name +
            '\', $event);" onclick="return false;">@' +
            m.screen_name +
            "</a>"
        );
      });
    }
    const QuoteMentions =
      data.quoted_status &&
      data.quoted_status.entities &&
      data.quoted_status.entities.user_mentions;

    if (QuoteMentions && QuoteMentions.length) {
      QuoteMentions.forEach(m => {
        data.quoted_status.text = data.quoted_status.text.replace(
          "@" + m.screen_name,
          "<a href=\"#\" @click.stop=\"$emit('user','" +
            m.screen_name +
            '\', $event);" onclick="return false;">@' +
            m.screen_name +
            "</a>"
        );
      });
    }

    const retweetMentions =
      data.retweeted_status &&
      data.retweeted_status.entities &&
      data.retweeted_status.entities.user_mentions;
    if (retweetMentions && retweetMentions.length) {
      retweetMentions.forEach(m => {
        data.retweeted_status.text = data.retweeted_status.text.replace(
          "@" + m.screen_name,
          "<a href=\"#\" @click.stop=\"$emit('user','" +
            m.screen_name +
            '\', $event);" onclick="return false;">@' +
            m.screen_name +
            "</a>"
        );
      });
    }
  });
  return list;
}

function replaceUrl(list, vm) {
  console.log(vm);
  list.forEach(data => {
    data.text = data.text.replace(/\n/g, "<br />");
    const urls = data.entities.urls.reverse();
    let acquired = false;
    if (urls.length) {
      urls.forEach(u => {
        // expanded_urlが「https://twitter.com」で始まり、文字列IDで終わる場合、
        // 同じメッセージを表示してしまうので飛ばす。
        if (
          u.expanded_url.startsWith("https://twitter.com") &&
          u.expanded_url.endsWith(data.id_str)
        ) {
          return;
        }
        if (!acquired) {
          getOg(u.expanded_url).then(d => {
            if (d.og_image && d.og_title && d.og_description) {
              vm.$set(data, "og", d);
            }
          });
          acquired = true;
        }
        data.text = data.text.replace(
          u.url,
          '<a href="' + u.url + '" target="_brank">' + u.display_url + "</a>"
        );
      });
    }
    const quoteUrls =
      data.quoted_status &&
      data.quoted_status.entities &&
      data.quoted_status.entities.urls.reverse();

    if (quoteUrls && quoteUrls.length) {
      data.quoted_status.text = data.quoted_status.text.replace(
        /\n/g,
        "<br />"
      );
      acquired = false;
      quoteUrls.forEach(u => {
        // expanded_urlが「https://twitter.com」で始まり、文字列IDで終わる場合、
        // 同じメッセージを表示してしまうので飛ばす。
        if (
          u.expanded_url.startsWith("https://twitter.com") &&
          u.expanded_url.endsWith(data.quoted_status_id_str)
        ) {
          return;
        }

        if (!acquired) {
          getOg(u.expanded_url).then(d => {
            if (d.og_image && d.og_title && d.og_description) {
              vm.$set(data.quoted_status, "og", d);
            }
          });
          acquired = true;
        }
        data.quoted_status.text = data.quoted_status.text.replace(
          u.url,
          '<a href="' + u.url + '" target="_brank">' + u.display_url + "</a>"
        );
      });
    }
    const retweetUrls =
      data.retweeted_status &&
      data.retweeted_status.entities &&
      data.retweeted_status.entities.urls.reverse();

    if (retweetUrls && retweetUrls.length) {
      data.retweeted_status.text = data.retweeted_status.text.replace(
        /\n/g,
        "<br />"
      );
      acquired = false;
      retweetUrls.forEach(u => {
        // expanded_urlが「https://twitter.com」で始まり、文字列IDで終わる場合、
        // 同じメッセージを表示してしまうので飛ばす。
        if (
          u.expanded_url.startsWith("https://twitter.com") &&
          u.expanded_url.endsWith(data.retweeted_status.id_str)
        ) {
          return;
        }

        if (!acquired) {
          getOg(u.expanded_url).then(d => {
            if (d.og_image && d.og_title && d.og_description) {
              vm.$set(data.retweeted_status, "og", d);
            }
          });
          acquired = true;
        }
        data.retweeted_status.text = data.retweeted_status.text.replace(
          u.url,
          '<a href="' + u.url + '" target="_brank">' + u.display_url + "</a>"
        );
      });
    }
  });
  return list;
}
