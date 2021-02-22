export interface RoutesProps {
    [key: string]: RouteValueProps
}

export interface RouteValueProps {
    path: string
    title: string
}

export const ROUTES: RoutesProps = {
    HOME: {
        path: '/',
        title: 'Главная',
    },
    SIGNIN: {
        path: '/signin',
        title: 'Вход',
    },
    SIGNUP: {
        path: '/signup',
        title: 'Регистрация',
    },
    PROFILE: {
        path: '/profile',
        title: 'Профиль',
    },
    FORUM: {
        path: '/forum',
        title: 'Форум',
    },
    FORUM_TOPIC: {
        path: '/forum/topic',
        title: 'Форум: тема',
    },
    GAME: {
        path: '/game',
        title: 'Игра',
    },
    GAME_START: {
        path: '/game-start',
        title: 'Начать игру',
    },
    GAME_OVER: {
        path: '/game-over',
        title: 'Игра окончена',
    },
    LEADERBOARD: {
        path: '/leaderboard',
        title: 'Таблица лидеров',
    },
};
