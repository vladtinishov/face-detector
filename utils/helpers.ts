export function sortByField(arr, field, direction: 'desc' | 'asc') {
  return arr.sort(function (a, b) {
    const modifier = direction === 'desc' ? -1 : 1;
    if (a[field] > b[field]) {
      return modifier;
    }
    if (a[field] < b[field]) {
      return -modifier;
    }
    return 0;
  });
}
