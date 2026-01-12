import { type RouteConfig, layout, route, index } from '@react-router/dev/routes'

export default [
  route('login', 'routes/login.tsx'),
  route('register', 'routes/register.tsx'),
  layout('routes/_app.tsx', [
    index('routes/_app.home.tsx'),
    route('matrix', 'routes/_app.matrix.tsx'),
    route('search', 'routes/_app.search.tsx'),
    route('stats', 'routes/_app.stats.tsx'),
  ]),
] satisfies RouteConfig
