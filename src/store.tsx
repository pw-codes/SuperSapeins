import {createContext,useContext,useEffect,useState,ReactNode} from 'react'
export type Tx={id:string;t:'BUY'|'SELL';cid:string;units:number;price:number;at:string}
const D={follow:['a1','a2'],watch:['a3'],marks:[] as string[],recent:[] as string[],cash:10000,pos:{} as Record<string,number>,tx:[] as Tx[],collapsed:false,name:'Alex Morgan',bio:'Sports fan exploring emerging talent.',photo:'',sports:['Football','Tennis'],density:'comfortable',readN:[] as string[],prefs:{email:true,push:true,digest:false},pub:true}
export type S=typeof D
type K='follow'|'watch'|'marks'
const C=createContext<any>(null)
export const useStore=():{s:S;set:(p:Partial<S>)=>void;toggle:(k:K,id:string)=>void;toast:(m:string,err?:boolean)=>void;toasts:{id:number;m:string;err?:boolean}[]}=>useContext(C)
export function StoreProvider({children}:{children:ReactNode}){
const[s,setS]=useState<S>(()=>{try{return{...D,...JSON.parse(localStorage.getItem('athletix')||'{}')}}catch{return D}})
const[toasts,setT]=useState<any[]>([])
useEffect(()=>{try{localStorage.setItem('athletix',JSON.stringify(s))}catch{}},[s])
const set=(p:Partial<S>)=>setS(x=>({...x,...p}))
const toggle=(k:K,id:string)=>setS(x=>({...x,[k]:x[k].includes(id)?x[k].filter(i=>i!==id):[...x[k],id]}))
const toast=(m:string,err?:boolean)=>{const id=Date.now()+Math.random();setT(t=>[...t,{id,m,err}]);setTimeout(()=>setT(t=>t.filter(i=>i.id!==id)),3000)}
return <C.Provider value={{s,set,toggle,toast,toasts}}>{children}</C.Provider>}
