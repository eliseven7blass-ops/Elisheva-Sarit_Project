export function filterByIdTitle(items, searchId, searchTitle) {
  const idQuery = searchId.trim();
  const titleQuery = searchTitle.trim().toLowerCase();

  return items.filter((item) => {
    const matchId = idQuery
      ? String(item.id).includes(idQuery)
      : true;

    const matchTitle = titleQuery
      ? (item.title || "").toLowerCase().includes(titleQuery)
      : true;

    return matchId && matchTitle;
  });
}
