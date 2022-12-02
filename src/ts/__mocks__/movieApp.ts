import { IMovie } from "../models/Movie";

export function handleSubmit() {
  let container: HTMLDivElement = document.getElementById(
    "movie-container"
  ) as HTMLDivElement;
  container.innerHTML = "";

  try {
    let movies: IMovie[] = [];

    if (movies.length > 0) {
      exports.createHtml(movies, container);
    } else {
      exports.displayNoResult(container);
    }
  } catch {
    exports.displayNoResult(container);
  }
}
