import { getStoryContext } from '@storybook/test-runner';
import isCI from 'is-ci';
import { toMatchImageSnapshot } from 'jest-image-snapshot';

export function setup() {
	expect.extend({ toMatchImageSnapshot });
}
export async function postRender(page, context) {
	if (isCI) return;
	const storyContext = await getStoryContext(page, context);
	if (storyContext.tags.indexOf('skip-snapshot') === -1) {
		const image = await page.screenshot();
		expect(image).toMatchImageSnapshot({
			comparisonMethod: 'ssim',
			failureThreshold: 0.01,
			failureThresholdType: 'percent',
			customSnapshotsDir: `${process.cwd()}/__snapshots__/${process.platform}`,
			customSnapshotIdentifier: context.id,
		});
	}
}
