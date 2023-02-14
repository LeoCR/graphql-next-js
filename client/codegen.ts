
import type { CodegenConfig } from '@graphql-codegen/cli';
import dotenv from 'dotenv'

dotenv.config()

const config: CodegenConfig = {
  overwrite: true,
  schema: `${process.env.NEXT_PUBLIC_SERVICE_URL}/graphql`,
  documents: ['service/queries.graphql'],
  generates: {
    './service/graphql.ts': {
      plugins: [
        'typescript',
        'typescript-operations',
        'typescript-document-nodes',
      ],
    },
  },
}

export default config;
