export { formatDate };
export { photoCount };
export { replaceMention };

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

function replaceMention(list) {
  console.log("in replace Meition:" + list);
  list.forEach(data => {
    const mentions = data.entities.user_mentions;
    if (mentions.length === 0) {
      return;
    }
    console.log("mentions の数：" + mentions.length);
    mentions.forEach(m => {
      console.log("mention:" + m.screen_name);
      data.text = data.text.replace(
        "@" + m.screen_name,
        "<a href=\"#\" @click.stop=\"$emit('user','" +
          m.screen_name +
          '\', $event);" onclick="return false;">@' +
          m.screen_name +
          "</a>"
      );
    });
  });
  return list;
}
