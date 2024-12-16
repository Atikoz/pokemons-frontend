import AuthPage from '../pages/AuthPage'
import HomePage from '../pages/HomePage'
import BattleListPage from '../pages/BattleListPage'
import BattlePage from '../pages/BattlePage'

export const privateRoutes = [
  { path: '/home', component: <HomePage /> },
  { path: '/battleList', component: <BattleListPage /> },
  { path: '/battlePage', component: <BattlePage /> },
]

export const publikRoutes = [
  { path: '/', component: <AuthPage /> } ,
] 