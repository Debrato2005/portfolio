import { Tabs } from '@base-ui/react/tabs';
import { ContributionSection } from './ContributionSection';
import { EngineeringTimeline } from './EngineeringTimeline';
/** M3 primary tabs whose pill indicator springs between activity views. */
export function GitHubTabs() {
  return (
    <Tabs.Root className="github-tabs" defaultValue="contributions">
      <Tabs.List className="tab-list" aria-label="GitHub views">
        <Tabs.Tab className="tab ripple" value="contributions">
          Contributions
        </Tabs.Tab>
        <Tabs.Tab className="tab ripple" value="timeline">
          Project timeline
        </Tabs.Tab>
        <Tabs.Indicator className="tab-indicator" />
      </Tabs.List>
      <Tabs.Panel className="tab-panel" value="contributions" keepMounted>
        <ContributionSection />
      </Tabs.Panel>
      <Tabs.Panel className="tab-panel" value="timeline" keepMounted>
        <EngineeringTimeline />
      </Tabs.Panel>
    </Tabs.Root>
  );
}
