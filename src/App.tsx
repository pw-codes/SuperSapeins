import {Link,Route,Routes} from 'react-router-dom'
import Shell from './components/Shell'
import {Toasts} from './components/ui'
import {Landing,About,Terms,Privacy} from './pages/Public'
import {Login,Signup,Forgot,Onboarding} from './pages/Auth'
import Discover from './pages/Discover'
import Athlete from './pages/Athlete'
import {Market,Contract} from './pages/Market'
import {News,Article} from './pages/News'
import {Dashboard,Collection,Profile,Notifications,Settings} from './pages/Me'
export default function App(){return <><Routes>
<Route path="/" element={<Landing/>}/><Route path="/about" element={<About/>}/><Route path="/terms" element={<Terms/>}/><Route path="/privacy" element={<Privacy/>}/>
<Route path="/login" element={<Login/>}/><Route path="/signup" element={<Signup/>}/><Route path="/forgot-password" element={<Forgot/>}/><Route path="/onboarding" element={<Onboarding/>}/>
<Route path="/app" element={<Shell/>}><Route index element={<Dashboard/>}/><Route path="discover" element={<Discover/>}/><Route path="athletes/:id" element={<Athlete/>}/>
<Route path="market" element={<Market/>}/><Route path="market/:id" element={<Contract/>}/><Route path="news" element={<News/>}/><Route path="news/:id" element={<Article/>}/>
<Route path="watchlist" element={<Collection mode="watchlist"/>}/><Route path="following" element={<Collection mode="following"/>}/><Route path="saved" element={<Collection mode="saved"/>}/>
<Route path="profile" element={<Profile/>}/><Route path="notifications" element={<Notifications/>}/><Route path="settings" element={<Settings/>}/></Route>
<Route path="*" element={<div className="grid min-h-screen place-items-center text-center"><div><h1 className="text-4xl font-extrabold">Page not found</h1><Link to="/" className="mt-4 inline-block text-lime">Back to home</Link></div></div>}/>
</Routes><Toasts/></>}
