import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';

import { H1, Loading, Section } from '../components';

const GET_PLANT = gql`
  query GetPlant($name: String!) {
    getPlant(name: $name) {
      name
      otherNames
      description
      plantSeason
      harvestSeason
      pruneSeason
      tips
    }
  }
`;

interface Props {
  match: any;
}

export const PlantDetails: React.FunctionComponent<Props> = (props: Props) => {
  const { data, loading, error } = useQuery(GET_PLANT, {
    variables: { name: props.match.params.plantname },
  });

  return (
    <>
      {loading ? (
        <Loading />
      ) : error ? (
        <p>ERROR</p>
      ) : (
        <>
          <Section>
            <H1>{data.getPlant.name}</H1>
          </Section>
          <Section>
            <h3>Other Names:</h3>
            <p>
              {data.getPlant.otherNames == null
                ? 'No data yet'
                : data.getPlant.otherNames}
            </p>
            <h3>Description:</h3>
            <p>
              {data.getPlant.description == null
                ? 'No data yet'
                : data.getPlant.description}
            </p>
            <h3>Plant Season:</h3>
            <p>
              {data.getPlant.plantSeason == null
                ? 'No data yet'
                : data.getPlant.plantSeason}
            </p>
            <h3>Harvest Season:</h3>
            <p>
              {data.getPlant.harvestSeason == null
                ? 'No data yet'
                : data.getPlant.harvestSeason}
            </p>
            <h3>Prune Season:</h3>
            <p>
              {data.getPlant.pruneSeason == null
                ? 'No data yet'
                : data.getPlant.pruneSeason}
            </p>
            <h3>Tips:</h3>
            <p>
              {data.getPlant.tips == null ? 'No data yet' : data.getPlant.tips}
            </p>
          </Section>
        </>
      )}
    </>
  );
};