import { defineCliConfig } from 'sanity/cli';

export default defineCliConfig({
  api: {
    projectId: process.env.SANITY_STUDIO_PROJECT_ID || 'your-project-id',
    dataset: process.env.SANITY_STUDIO_DATASET || 'production',
  },
  autoUpdates: true,
  deployment: {
    appId: 'ahhvopm19s3o2vx2k4ep2j4b',
  },
});
