import axios from 'axios';
import { get } from 'lodash';
import { CreditFetchedData } from '../../app/store'

export const fetchCreditData = async (personId: string): Promise<CreditFetchedData> => {
  let creditData: Partial<CreditFetchedData> = {};

  await axios.get(`/api/person/${personId}`)
    .then((response) => {
      const affordabilityId = get(response, 'data.affordability_id');
      const name = get(response, 'data.name');
      const lastName = get(response, 'data.last_name');

      if (!affordabilityId || !name || !lastName) {
        throw new Error('Invalid person data');
      }

      creditData = {
        ...creditData,
        person: {
          name,
          lastName,
        },
      };

      return axios.get(`/api/affordability/${affordabilityId}`);
    })
    .then((response) => {
      const exposureId = get(response, 'data.affordability_min.exposure_id');
      const min = get(response, 'data.affordability_min.value');
      const max = get(response, 'data.affordability_max.value');

      if (!exposureId || !min || !max) {
        throw new Error('Invalid exposure data');
      }

      creditData = {
        ...creditData,
        affordability: {
          min,
          max,
        },
      };

      return axios.get(`/api/exposure/${exposureId}`);
    })
    .then((response) => {
      const id = get(response, 'data.id');
      const values = get(response, 'data.values');

      if (!id || !values) {
        throw new Error('Invalid exposure data');
      }

      creditData = {
        ...creditData,
        exposure: {
          id,
          values,
        },
      };
    })

    return creditData as CreditFetchedData;
};

export const calculateValue = (fetchedData: CreditFetchedData): string => {
  const {
    affordability: { min },
    exposure: { values },
  } = fetchedData;

  return (min * values.reduce((total, value) => total + value, 0)).toFixed(2);
};
