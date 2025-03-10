import { FastifyPluginAsync } from "fastify";

const claims: FastifyPluginAsync = async (fastify): Promise<void> => {
  fastify.get('/', async (request, reply) => {
    return {
      "claims": [],
      "query": request?.query,
    };
  });
}

export default claims;