import { justTestApp } from '@just-web/app/testing';
import { browserKeyboardGizmo } from '@just-web/browser-keyboard';
import { type CommandsGizmo, type CommandsGizmoOptions, commandsGizmoFn } from '@just-web/commands';
import { type KeyboardGizmoOptions, keyboardGizmoFn } from '@just-web/keyboard';
import { isMac, type OSGizmo } from '@just-web/os';
import { type OSTestGizmoOptions, osTestGizmoFn } from '@just-web/os/testing';
import { JustAppProvider, reactGizmo, useJustAppContext } from '@just-web/react';
import type { Meta, StoryObj } from '@storybook/react';
import Mousetrap from 'mousetrap';
import React from 'react';
import { CommandPalette, reactCommandsGizmo } from '../index.js';

type Story = StoryObj<typeof CommandPalette>;

const shortcut = isMac() ? 'cmd+k' : 'ctrl+k';

const meta: Meta<typeof CommandPalette> = {
	decorators: [
		(Story, { loaded: { app } }) => (
			<JustAppProvider value={app}>
				<Story />
			</JustAppProvider>
		),
	],
	component: ({ ...args }) => {
		const app = useJustAppContext<CommandsGizmo & OSGizmo>();
		const shortcut = app.os.isMac() ? 'cmd+k' : 'ctrl+k';
		return (
			<>
				<div>
					<code>{shortcut}</code> to show the command palette
				</div>
				<button
					onClick={() => {
						app.commands.showCommandPalette();
					}}
					type="button"
				>
					Open Command Palette
				</button>
				<CommandPalette {...args} />
			</>
		);
	},
};
export default meta;

const simpleCmd = { id: 'core.simpleCommand' };
const keyedCmd = {
	id: 'core.keyedCommand',
	name: 'Command with key',
	key: 'ctrl+k',
};
const macCmd = {
	id: 'core.macCommand',
	name: 'Command with mac key override',
	key: 'ctrl+m',
	mac: 'cmd+m',
};
const macOnlyCmd = {
	id: 'core.macOnlyCommand',
	name: 'Command with only mac key',
	mac: 'cmd+o',
};

async function setupApp(
	options?: { keyboard?: KeyboardGizmoOptions } & { commands?: CommandsGizmoOptions } & {
		os?: OSTestGizmoOptions;
	}
) {
	const app = await justTestApp({ name: 'storybook' })
		.with(keyboardGizmoFn(options?.keyboard))
		.with(commandsGizmoFn(options?.commands))
		.with(osTestGizmoFn(options?.os))
		.with(browserKeyboardGizmo)
		.with(reactGizmo)
		.with(reactCommandsGizmo)
		.create();
	return { app };
}

export const NoCommand: Story = {
	loaders: [async (_) => setupApp()],
	play: async (_) => void Mousetrap.trigger(shortcut),
};

export const OneCommand: Story = {
	loaders: [
		async (_) =>
			setupApp({
				commands: {
					contributions: [simpleCmd],
					handlers: {
						[simpleCmd.id]: () => alert(simpleCmd.id),
					},
				},
			}),
	],
	play: async (_) => void Mousetrap.trigger(shortcut),
};

export const WithKey: Story = {
	loaders: [
		async (_) =>
			setupApp({
				commands: {
					contributions: [keyedCmd],
					handlers: {
						[keyedCmd.id]: () => alert(keyedCmd.id),
					},
				},
				keyboard: {
					keyBindingContributions: [keyedCmd],
				},
			}) as any,
	],
	play: async (_) => void Mousetrap.trigger(shortcut),
};

export const OverrideMacCommandInMac: Story = {
	loaders: [
		async (_) =>
			setupApp({
				commands: {
					contributions: [simpleCmd, keyedCmd, macCmd, macOnlyCmd],
					handlers: {
						[simpleCmd.id]: () => alert(simpleCmd.id),
						[keyedCmd.id]: () => alert(keyedCmd.id),
						[macCmd.id]: () => alert(macCmd.id),
						[macOnlyCmd.id]: () => alert(macOnlyCmd.id),
					},
				},
				keyboard: {
					keyBindingContributions: [keyedCmd, macCmd, macOnlyCmd],
				},
				os: {
					isMac: () => true,
				},
			}),
	],
	play: async (_) => void Mousetrap.trigger('command+k'),
};

export const OverrideMacCommandInWindow: Story = {
	loaders: [
		async (_) =>
			setupApp({
				commands: {
					contributions: [simpleCmd, keyedCmd, macCmd, macOnlyCmd],
					handlers: {
						[simpleCmd.id]: () => alert(simpleCmd.id),
						[keyedCmd.id]: () => alert(keyedCmd.id),
						[macCmd.id]: () => alert(macCmd.id),
						[macOnlyCmd.id]: () => alert(macOnlyCmd.id),
					},
				},
				keyboard: {
					keyBindingContributions: [keyedCmd, macCmd, macOnlyCmd],
				},
				os: {
					isMac: () => false,
				},
			}),
	],
	play: async (_) => void Mousetrap.trigger('ctrl+k'),
};
