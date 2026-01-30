import type { Preview } from '@storybook/react';

const preview: Preview = {
    parameters: {
        options: {
            storySort: {
                order: ['Introduction', 'Configuration'],
            },
        },
    },
};

export default preview;