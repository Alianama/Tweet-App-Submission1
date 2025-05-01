export const timeAgo = (date) => {
  const now = new Date();
  const then = new Date(date);
  const diff = now - then;
  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const months = Math.floor(days / 30);
  const years = Math.floor(months / 12);

  if (years > 1) {
    return `${years} tahun yang lalu`;
  } else if (months > 1) {
    return `${months} bulan yang lalu`;
  } else if (days > 1) {
    return `${days} hari yang lalu`;
  } else if (hours > 1) {
    return `${hours} jam yang lalu`;
  } else if (minutes > 1) {
    return `${minutes} menit yang lalu`;
  } else {
    return `${seconds} detik yang lalu`;
  }
};