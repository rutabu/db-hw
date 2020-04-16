import { Server } from 'miragejs';

export default function makeServer() {
  return new Server({
    routes() {
      this.namespace = 'api';

      this.get(
        '/person/:input',
        (_schema, request) => {
          const { params: { input } } = request;
          return {
            id: input,
            name: 'Tom',
            last_name: 'Tomson',
            affordability_id: 1,
          };
        },
      );

      this.get(
        '/affordability/:affordabilityId',
        () => ({
          affordability_max: { value: 5, exposure_id: 1 },
          affordability_min: { value: 1.3, exposure_id: 2 },
        }),
      );

      this.get(
        '/exposure/:exposureId',
        (_schema, request) => {
          const { params: { exposureId } } = request;

          return {
            id: exposureId,
            values: [3.4, 2, 0, -1],
          };
        },
        // delay to show fetching in progress
        { timing: 1000 },
      );
    },
  });
}
