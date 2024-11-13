export function remove(fileList: FileList | null, fileName: string) {
  const arr = Array.from(fileList || [])
  const dt = new DataTransfer()
  arr.forEach((file) => {
    if (file.name === fileName) return
    dt.items.add(file)
  })
  return dt.files
}
