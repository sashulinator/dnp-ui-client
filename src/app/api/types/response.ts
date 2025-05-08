export interface Response<T> {
  // Делаем так на случай если нужно будет расширять тип
  // Например может понадобиться headers
  data: T
}
