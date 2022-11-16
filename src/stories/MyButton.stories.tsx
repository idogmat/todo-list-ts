// YourComponent.stories.ts|tsx

import React from 'react';

import { ComponentStory, ComponentMeta } from '@storybook/react';

import { MyButton } from './MyButton';

//👇 This default export determines where your story goes in the story list
export default {
  title: 'MyButtons',
  component: MyButton,

}as ComponentMeta<typeof MyButton>

//👇 We create a “template” of how args map to rendering
const Template: ComponentStory<typeof MyButton> = (args) => <MyButton {...args} />;

export const ButtonsAdd = Template.bind({});

ButtonsAdd.args = {

    title: '+'
};
export const ButtonsRemove = Template.bind({});

ButtonsRemove.args = {
    title:'Remove'
};
export const ButtonsX = Template.bind({});

ButtonsX.args = {
    title:'X'
};
