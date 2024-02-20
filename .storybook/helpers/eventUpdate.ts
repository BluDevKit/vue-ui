import type { Channel } from '@storybook/channels'
import { UPDATE_STORY_ARGS } from '@storybook/core-events'
import type { Decorator } from '@storybook/vue3'
import { h } from 'vue'

export function updateModelValue(): Decorator {
    return (story, ctx) => {
        return {
            components: { story },
            setup() {
                const updateArgs = (value: unknown) => {
                    const channel = (window as any).__STORYBOOK_ADDONS_CHANNEL__ as Channel
                    channel.emit(UPDATE_STORY_ARGS, {
                        storyId: ctx.id,
                        updatedArgs: {
                            modelValue: value,
                        },
                    })
                }

                return {
                    updateArgs,
                }
            },
            render() {
                return h(story(), {
                    'onUpdate:modelValue': (e: any) => this.updateArgs(e),
                })
            },
        }
    }
}