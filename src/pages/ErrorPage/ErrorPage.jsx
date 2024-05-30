import { Link } from 'react-router-dom'; 
import css from './ErrorPage.module.css'

export default function ErrorPage(){
    return(<div className={css.container}>Oops, this page is not found! Please go to <Link to="/"><span className={css.link}>home page!</span></Link></div>)
}