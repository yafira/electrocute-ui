import type { Meta, StoryObj } from '@storybook/react'
import { Field, controlStyle } from './Field'

const meta: Meta<typeof Field> = {
  title: 'Components/Field',
  component: Field,
  tags: ['autodocs'],
}
export default meta
type Story = StoryObj<typeof Field>

// Field is a render-prop shell — most consumers reach for Input/Textarea/
// Select/etc. instead (see Components/Input), which already wrap it. This
// story demos the shell directly, wiring a bare <input> by hand.
export const Default: Story = {
  render: () => (
    <Field label="Email" hint="We won't share this.">
      {(aria) => <input {...aria} style={controlStyle()} />}
    </Field>
  ),
}

export const WithError: Story = {
  render: () => (
    <Field label="Email" error="Enter a valid email address.">
      {(aria) => <input {...aria} style={controlStyle(true)} />}
    </Field>
  ),
}

export const Required: Story = {
  render: () => (
    <Field label="Full name" required>
      {(aria) => <input {...aria} style={controlStyle()} />}
    </Field>
  ),
}
