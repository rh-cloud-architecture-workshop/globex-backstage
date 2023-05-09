import { CatalogClient } from '@backstage/catalog-client';
import { createRouter } from '@backstage/plugin-scaffolder-backend';
import { createBuiltinActions } from '@backstage/plugin-scaffolder-backend';
import { ScmIntegrations } from '@backstage/integration';
import { createHttpBackstageAction } from '@roadiehq/scaffolder-backend-module-http-request'
import { createArgoCdResources } from '@roadiehq/scaffolder-backend-argocd'
import {
        createZipAction,
        createSleepAction,
        createWriteFileAction,
        createAppendFileAction,
        createMergeJSONAction,
        createMergeAction,
        createParseFileAction,
        createSerializeYamlAction,
        createSerializeJsonAction,
        createJSONataAction,
        createYamlJSONataTransformAction,
        createJsonJSONataTransformAction,
                                          } from '@roadiehq/scaffolder-backend-module-utils';

import { Router } from 'express';
import type { PluginEnvironment } from '../types';

export default async function createPlugin(
  env: PluginEnvironment,
): Promise<Router> {
  const catalogClient = new CatalogClient({ discoveryApi: env.discovery });
  const integrations = ScmIntegrations.fromConfig(env.config);
  const discovery = env.discovery;
  const builtInActions = createBuiltinActions({
    integrations,
    catalogClient,
    config: env.config,
    reader: env.reader,
  });
  
  const actions = [...builtInActions, 
    createHttpBackstageAction( { discovery } ),
    createArgoCdResources( env.config, env.logger ),
    createZipAction(),
    createSleepAction(),
    createWriteFileAction(),
    createAppendFileAction(),
    createMergeJSONAction({}),
    createMergeAction(),
    createParseFileAction(),
    createSerializeYamlAction(),
    createSerializeJsonAction(),
    createJSONataAction(),
    createYamlJSONataTransformAction(),
    createJsonJSONataTransformAction()];
  

  return await createRouter({
    actions,
    logger: env.logger,
    config: env.config,
    database: env.database,
    reader: env.reader,
    catalogClient,
    identity: env.identity,
  });
}
