import type { Meta } from '@storybook/react';
import { UsersContainer } from './users-container';

const Story: Meta<typeof UsersContainer> = {
  component: UsersContainer,
  title: 'UsersContainer',
};
export default Story;

export const Primary = {
  args: {},
};
