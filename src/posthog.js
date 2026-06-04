import posthog from 'posthog-js';
import ExecutionEnvironment from '@docusaurus/ExecutionEnvironment';

if (ExecutionEnvironment.canUseDOM) {
  posthog.init('phc_8ha6EeFmXTbC1wySAf2Y1SAeuNn36FuKk6fV2y5Scj3', {
    api_host: 'https://v.pipeops.info',
    person_profiles: 'identified_only',
    capture_pageview: false // we handle this manually for SPA routing below
  });
}

export default function clientModule() {
  return {
    onRouteUpdate({location}) {
      if (ExecutionEnvironment.canUseDOM) {
        posthog.capture('$pageview');
      }
    },
  };
}
