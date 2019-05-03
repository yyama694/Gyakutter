export { formatDate };
export { photoCount };

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

  console.log(medias.filter(d => d.type === "photo").length);
  return medias.filter(d => d.type === "photo").length;
}
