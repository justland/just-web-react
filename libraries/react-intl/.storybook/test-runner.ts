import { configureToMatchImageSnapshot } from 'jest-image-snapshot';

module.exports = {
	setup() {
		const toMatchImageSnapshot = configureToMatchImageSnapshot({
			comparisonMethod: 'ssim',
			failureThreshold: 0.01,
			failureThresholdType: 'percent',
			noColors: true,
		});
		expect.extend({ toMatchImageSnapshot });
	},
	async postRender(page, context) {
		if (!/-skip-snap$/.test(context.id)) {
			const image = await page.screenshot();
			expect(image).toMatchImageSnapshot({
				customSnapshotsDir: `${process.cwd()}/__snapshots__/${process.platform}`,
				customSnapshotIdentifier: context.id,
			});
		}
	},
};
