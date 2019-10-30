// 擦除对象的属性
export function wipe (obj) {
  for (var p in obj) {
    if (obj.hasOwnProperty(p)) {
      delete obj[p]
    }
  }
}
