// YourComponent.stories.ts|tsx

import React from 'react';

import { ComponentStory, ComponentMeta } from '@storybook/react';

import { MyInput } from './MyInput';

//👇 This default export determines where your story goes in the story list
export default {
  title: 'MyInputs',
  component: MyInput,

}as ComponentMeta<typeof MyInput>

//👇 We create a “template” of how args map to rendering
const Template: ComponentStory<typeof MyInput> = (args) => <MyInput {...args} />;

export const SimpleInput = Template.bind({});

SimpleInput.args = {
    value: 'Jack',
    size:'5rem'
};