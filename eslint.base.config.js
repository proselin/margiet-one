const nx = require('@nx/eslint-plugin');

module.exports = [
  ...nx.configs['flat/base'],
  ...nx.configs['flat/typescript'],
  ...nx.configs['flat/javascript'],
  {
    ignores: ['**/dist'],
  },
  {
    files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx'],
    rules: {
      '@nx/enforce-module-boundaries': [
        'error',
        {
          enforceBuildableLibDependency: true,
          allow: ['^.*/eslint(\\.base)?\\.config\\.[cm]?js$'],
          depConstraints: [
            {
              sourceTag: 'type:shell',
              onlyDependOnLibsWithTags: ['type:shell', 'type:feature'],
            },
            {
              sourceTag: 'scope:shared',
              onlyDependOnLibsWithTags: ['scope:shared'],
            },
            {
              sourceTag: "type:feature",
              onlyDependOnLibsWithTags: ['type:feature', 'type:adapter'],
            },
            {
              sourceTag: "type:feature",
              onlyDependOnLibsWithTags: ['type:feature', 'type:adapter'],
            }
          ],
        },
      ],
    },
  },
];
