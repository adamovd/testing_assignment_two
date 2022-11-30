import { IMovie } from "../../models/Movie";

export let mockData: IMovie[] = [
  {
    Title: "Matrix",
    imdbID: "tt0076759",
    Type: "movie",
    Poster: "img_source",
    Year: "1999",
  },
  {
    Title: "Matrix",
    imdbID: "tt0076759",
    Type: "movie",
    Poster: "img_source",
    Year: "1999",
  },
  {
    Title: "Avengers",
    imdbID: "tt0076759",
    Type: "movie",
    Poster: "img_source",
    Year: "2011",
  },
  {
    Title: "Leon",
    imdbID: "tt0076759",
    Type: "movie",
    Poster: "img_source",
    Year: "1995",
  },
];

export const getData = async (): Promise<IMovie[]> => {
  return new Promise((resolve) => {
    resolve(mockData);
  });
};
