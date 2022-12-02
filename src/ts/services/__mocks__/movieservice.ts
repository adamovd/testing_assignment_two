import { IMovie } from "../../models/Movie";

export const mockData: IMovie[] = [
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
    Title: "Matrix",
    imdbID: "tt0076759",
    Type: "movie",
    Poster: "img_source",
    Year: "1999",
  },
  {
    Title: "Leon",
    imdbID: "tt0076759",
    Type: "movie",
    Poster: "img_source",
    Year: "1995",
  },
];

export const getData = async (searchText: string): Promise<IMovie[]> => {
  return new Promise((resolve, reject) => {
    if (searchText.length > 0) {
      resolve(mockData);
    } else {
      reject();
    }
  });
};
