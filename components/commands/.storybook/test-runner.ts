import { configureToMatchImageSnapshot } from 'jest-image-snapshot';

export function setup() {
	const toMatchImageSnapshot = configureToMatchImageSnapshot({
		// ssim config
		// comparisonMethod: 'ssim',

		// pixel config
		comparisonMethod: 'pixelmatch',
		blur: 1,
		customDiffConfig: { threshold: 0.05 },

		failureThresholdType: 'percent',
		customSnapshotsDir: `${process.cwd()}/__snapshots__/${process.platform}`,
		noColors: true,
	});
	expect.extend({ toMatchImageSnapshot });
}
export async function postRender(page, context) {
	if (!/-skip-snap$/.test(context.id)) {
		const image = await page.screenshot();
		expect(image).toMatchImageSnapshot({
			customSnapshotsDir: `${process.cwd()}/__snapshots__/${process.platform}`,
			customSnapshotIdentifier: context.id,
		});
	}
}
