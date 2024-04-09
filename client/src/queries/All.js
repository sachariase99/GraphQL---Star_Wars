import { gql } from 'graphql-request';

export const allFilms = gql`
  query AllFilms {
    allFilms {
      films {
        id
        created
        director
        edited
        producers
        releaseDate
        title
      }
    }
  }
`;

export const allPeople = gql`
query AllPeople {
  allPeople {
    people {
      id
      name
      height
      gender
      skinColor
      hairColor
      eyeColor
      filmConnection {
        films {
          id
          title
        }
      }
      homeworld {
        id
        name
        population
        terrains
      }
    }
  }
}
`;