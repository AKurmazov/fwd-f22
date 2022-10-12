import { publish } from 'gh-pages';

publish(
    'build', // path to public directory
    {
        branch: 'lab5',
        repo: 'https://github.com/AKurmazov/fwd-f22',
        user: {
            name: 'Alexander Kurmazov',
            email: 'akurmazov2001@gmail.com'
        },
        dotfiles: true
    },
    () => {
        console.log('Deploy Complete!');
    }
);
