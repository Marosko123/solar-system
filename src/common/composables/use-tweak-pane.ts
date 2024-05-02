import { Pane } from 'tweakpane'
import * as EssentialsPlugin from '@tweakpane/plugin-essentials'

export function useTweakPane(): { pane: Pane; fpsGraph: any } {
    const pane = new Pane()
    pane.registerPlugin(EssentialsPlugin)
    const fpsGraph = pane.addBlade({
        view: 'fpsgraph',
        label: 'fpsgraph'
    })

    return { pane, fpsGraph }
}
