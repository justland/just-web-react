import { toMatchImageSnapshot } from 'jest-image-snapshot'
import isCI from 'is-ci'

export function setup() {
	expect.extend({ toMatchImageSnapshot })
}
export async function postRender(page, context) {
	if (isCI) return
	if (!/-skip-snap$/.test(context.id)) {
		const image = await page.screenshot()
		expect(image).toMatchImageSnapshot({
			comparisonMethod: 'ssim',
			failureThreshold: 0.01,
			failureThresholdType: 'percent',
			customSnapshotsDir: `${process.cwd()}/__snapshots__/${process.platform}`,
			customSnapshotIdentifier: context.id
		})
	}
}
